"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Card from "../organisms/Card";
import Footer from "../atoms/Footer";
import Button from "../atoms/Button";
import styles from "./WelcomeDashboard.module.css";

const WelcomeDashboard: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles.root}>
      <Card>
        <h1 className={styles.title}>
          Welcome to the Nx Monorepo Dashboard
        </h1>
        <p className={styles.subtitle}>
          This is the main dashboard. Use the navigation or button below to try the backend API demo.
        </p>
        <Button onClick={() => router.push("/ping")}>Go to /ping API Demo</Button>
      </Card>
      <Footer />
    </div>
  );
};

export default WelcomeDashboard;