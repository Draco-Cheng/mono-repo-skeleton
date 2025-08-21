import React from "react";
import styles from "./Footer.module.css";

const Footer: React.FC = () => (
  <footer className={styles.footer}>
    &copy; {new Date().getFullYear()} Nx + Next.js + FastAPI Monorepo Example
  </footer>
);

export default Footer;