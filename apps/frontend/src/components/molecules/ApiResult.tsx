import React from "react";
import styles from "./ApiResult.module.css";

interface ApiResultProps {
  loading: boolean;
  result: string;
  apiPrefix: string;
}

const ApiResult: React.FC<ApiResultProps> = ({ loading, result, apiPrefix }) => (
  <div className={styles.apiResult}>
    {loading ? (
      <span style={{ color: "#94a3b8" }}>Loading backend...</span>
    ) : (
      <span>
        <b>Backend {apiPrefix}/ping:</b> {result}
      </span>
    )}
  </div>
);

export default ApiResult;