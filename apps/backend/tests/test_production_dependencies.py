"""What production installs must match what CI tests.

The image used to build with `pip install .` against `pyproject.toml` while CI
ran `uv sync` against `uv.lock` -- two independent resolutions of the same
requirements. They agree right up until an upstream package changes HOW it
declares a dependency, and then they disagree in silence, with only a deploy
to reveal it (confirmed on yi-ying-orchids, derived from this template: a
SQLAlchemy minor release moved `greenlet` behind a platform marker, `pip
install .` resolved without it, and the migration Job died at import in
production while CI stayed green).

The image now syncs the lock, which removes the second resolution entirely.
`TestImageInstallsFromTheLock` keeps it that way.

These read the Dockerfile and the declaration, not the installed environment:
asserting an import works would pass on any machine with the lock applied,
which is exactly the blind spot being covered.
"""

import re
import tomllib
from pathlib import Path

_BACKEND = Path(__file__).resolve().parent.parent
_PYPROJECT = _BACKEND / "pyproject.toml"
_DOCKERFILE = _BACKEND / "Dockerfile"
_LOCK = _BACKEND / "uv.lock"


def _dependencies() -> list[str]:
    data = tomllib.loads(_PYPROJECT.read_text(encoding="utf-8"))
    return data["project"]["dependencies"]


class TestImageInstallsFromTheLock:
    """The image and CI must install from the SAME resolution.

    `pip install .` re-resolves from `pyproject.toml`, which can differ from
    `uv.lock` -- the resolution CI and every developer actually use. These pin
    the fix at the level of the mechanism, not any one package that might
    expose it.
    """

    @staticmethod
    def _instructions() -> list[str]:
        """Dockerfile lines with comments stripped.

        Reading the raw text would match explanatory comments as readily as
        the commands -- a prose mention of a flag is not the flag being set.
        """
        out = []
        for line in _DOCKERFILE.read_text(encoding="utf-8").split("\n"):
            stripped = line.strip()
            if stripped and not stripped.startswith("#"):
                out.append(stripped)
        return out

    def test_dockerfile_syncs_the_lock(self):
        run_lines = [line for line in self._instructions() if line.startswith("RUN ")]
        assert any("uv sync --frozen" in line for line in run_lines), (
            "the image must install from uv.lock, the same resolution CI uses. "
            "`pip install .` re-resolves from pyproject.toml and can differ."
        )
        assert not any(re.search(r"pip install\b.*\s\.$", line) for line in run_lines), (
            "a second, independent resolve is back in the image"
        )

    def test_dockerfile_copies_the_lock(self):
        """`--frozen` is meaningless if the lock never reaches the build."""
        copies = [line for line in self._instructions() if line.startswith("COPY ")]
        assert any("uv.lock" in line for line in copies), "uv.lock is not COPYed into the image"

    def test_dockerfile_excludes_dev_dependencies(self):
        sync = [line for line in self._instructions() if "uv sync" in line]
        assert sync, "no uv sync instruction"
        assert all("--no-dev" in line for line in sync), (
            f"pytest and ruff would ship to production: {sync}"
        )

    def test_pinned_uv_can_read_this_lock_format(self):
        """An older uv refuses a newer lock. The pin must not fall behind the
        version that writes the file, or the build fails on a format it cannot
        parse -- a confusing failure far from its cause.
        """
        revision = re.search(r"(?m)^revision = (\d+)", _LOCK.read_text(encoding="utf-8"))
        assert revision, "uv.lock has no revision line"
        pinned = re.search(r"ghcr\.io/astral-sh/uv:(\d+)\.(\d+)\.(\d+)",
                           "\n".join(self._instructions()))
        assert pinned, "the uv image tag is not pinned to an exact version"
        major, minor = int(pinned.group(1)), int(pinned.group(2))
        if int(revision.group(1)) >= 2:
            assert (major, minor) >= (0, 7), (
                f"uv.lock is revision {revision.group(1)} (written by uv 0.7+), "
                f"but the image pins uv {major}.{minor}.x, which cannot read it"
            )


def test_every_declared_dependency_is_pinned_to_a_floor():
    """An unpinned dependency resolves to whatever is newest at build time, so
    the image can change behaviour with no commit. An unbounded requirement is
    how a minor upstream release reaches production unnoticed.
    """
    unpinned = [
        dep for dep in _dependencies()
        if not re.search(r"[<>=~]=?\s*\d", dep)
    ]
    assert not unpinned, f"no version floor on: {unpinned}"
