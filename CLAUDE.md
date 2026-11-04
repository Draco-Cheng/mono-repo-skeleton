# Claude Code Instructions

## MCP: ai-readme-manager
Before any code-related task, ALWAYS call `mcp__ai-readme-manager__get_context_for_file(projectRoot, path)` first.
If `get_context_for_file` reports empty or missing AI_README files, call `mcp__ai-readme-manager__init_ai_readme(projectRoot)` to initialize them.
If the user's request or your plan conflicts with AI_README conventions (including during planning), STOP and call `mcp__ai-readme-manager__update_ai_readme` to resolve the conflict before proceeding.
When establishing new conventions or making architectural decisions, call `mcp__ai-readme-manager__update_ai_readme` to record them.
Convention used in 2+ files AND non-obvious (AI'd get it wrong from code alone) → call `mcp__ai-readme-manager__update_ai_readme` to record it. Bulleted keywords, not prose; 1 "- " bullet = 1 fact (+why only if it stops reversion); fragments. Record only the fact AI can't see in code — not where it lives, what toggles it, or how it works (those → "See <file>."). A run-on chaining facts with ";"/"then" is a wall — break it into bullets, don't grow it.
NEVER edit AI_README.md files directly with Write/Edit/other file-editing tools — always use `mcp__ai-readme-manager__update_ai_readme`. Direct edits bypass validation, conflict detection, and quality scoring.
