'use client';
import { useState } from 'react';

export function useFetch<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function getData(url: string, options?: RequestInit) {
    setLoading(true);
    try {
      const response = await fetch(url, options);

      const result = await response.json();
      setData(result);
      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      setError(errorMessage);

      throw error;
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, getData };
}
