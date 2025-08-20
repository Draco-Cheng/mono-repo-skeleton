"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { API_PREFIX } from "./config";

// A more polished UI that fetches /api/ping from backend and displays the result
export default function Home() {
  const [pingResult, setPingResult] = useState<string>("Loading...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Call backend API via Next.js dev proxy (see next.config.ts)
    fetch(`${API_PREFIX}/ping`)
      .then((res) => res.json())
      .then((data) => {
        setPingResult(data.result || JSON.stringify(data));
        setLoading(false);
      })
      .catch((err) => {
        setPingResult("Error: " + err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <h1 className={styles.title}>Nx Monorepo Demo</h1>
        <p className={styles.subtitle}>
          This is a fullstack example using <b>Next.js</b> (frontend) and <b>FastAPI</b> (backend).
        </p>
        <div className={styles.apiResult}>
          {loading ? (
            <span style={{ color: "#94a3b8" }}>Loading backend...</span>
          ) : (
            <span>
              <b>Backend {API_PREFIX}/ping:</b> {pingResult}
            </span>
          )}
        </div>
        <button
          className={styles.button}
          onClick={() => {
            setLoading(true);
            fetch(`${API_PREFIX}/ping`)
              .then((res) => res.json())
              .then((data) => {
                setPingResult(data.result || JSON.stringify(data));
                setLoading(false);
              })
              .catch((err) => {
                setPingResult("Error: " + err.message);
                setLoading(false);
              });
          }}
        >
          Refresh
        </button>
      </div>
      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} Nx + Next.js + FastAPI Monorepo Example
      </footer>
    </div>
  );
}
