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

  // Sets state only from async callbacks, so it is safe to call from an
  // effect (react-hooks/set-state-in-effect). `loading` already starts true.
  const loadPing = useCallback(() => {
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

  const refresh = useCallback(() => {
    setLoading(true);
    loadPing();
  }, [loadPing]);

  useEffect(() => {
    loadPing();
  }, [loadPing]);

  return { result, loading, refresh };
}