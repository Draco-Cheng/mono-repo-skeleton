import { useCallback, useState, useEffect } from "react";
import { API_PREFIX } from "../config";

// Define the expected response type for /api/ping
interface PingResponse {
  result: string;
}

// Custom hook for fetching /api/ping
export function usePingApi() {
  const [result, setResult] = useState<string>("Loading...");
  const [loading, setLoading] = useState(true);

  const fetchPing = useCallback(() => {
    setLoading(true);
    fetch(`${API_PREFIX}/ping`)
      .then((res) => res.json() as Promise<PingResponse>)
      .then((data) => {
        setResult(data.result || JSON.stringify(data));
        setLoading(false);
      })
      .catch((err) => {
        setResult("Error: " + err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchPing();
  }, [fetchPing]);

  return { result, loading, refresh: fetchPing };
}