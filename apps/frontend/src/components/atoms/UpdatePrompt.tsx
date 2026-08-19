"use client";

import React from "react";
import { useServiceWorker } from "../../hooks/useServiceWorker";
import styles from "./UpdatePrompt.module.css";

const UpdatePrompt: React.FC = () => {
  const { hasUpdate, applyUpdate } = useServiceWorker();

  if (!hasUpdate) return null;

  return (
    <div className={styles.banner}>
      <span>A new version is available</span>
      <button className={styles.button} onClick={applyUpdate}>
        Refresh
      </button>
    </div>
  );
};

export default UpdatePrompt;
