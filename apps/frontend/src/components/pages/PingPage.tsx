"use client";

import React from "react";
import Card from "../organisms/Card";
import ApiResult from "../molecules/ApiResult";
import Button from "../atoms/Button";
import Footer from "../atoms/Footer";
import { usePingApi } from "../../hooks/usePingApi";
import styles from "./PingPage.module.css";

// Page component for /ping route
const PingPage: React.FC = () => {
  const { result: pingResult, loading, refresh } = usePingApi();

  return (
    <div className={styles.root}>
      <Card>
        <h1 className={styles.title}>Nx Monorepo Demo</h1>
        <p className={styles.subtitle}>
          This is a fullstack example using <b>Next.js</b> (frontend) and <b>FastAPI</b> (backend).
        </p>
        <ApiResult loading={loading} result={pingResult} apiPrefix="/api" />
        <Button onClick={refresh}>Refresh</Button>
      </Card>
      <Footer />
    </div>
  );
};

export default PingPage;