import React from "react";
import Card from "../organisms/Card";
import Footer from "../atoms/Footer";
import Button from "../atoms/Button";
import styles from "./WelcomeDashboard.module.css";

const WelcomeDashboard: React.FC = () => (
  <div className={styles.root}>
    <Card>
      <h1 className={styles.title}>
        Welcome to the Nx Monorepo Dashboard
      </h1>
      <p className={styles.subtitle}>
        This is the main dashboard. Use the navigation or button below to try the backend API demo.
      </p>
      <a href="/ping" style={{ textDecoration: "none" }}>
        <Button>Go to /ping API Demo</Button>
      </a>
    </Card>
    <Footer />
  </div>
);

export default WelcomeDashboard;