'use client';
import { useCallback, useState, useRef } from 'react';

export function useFetch<T>() {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const pendingRequestsRef = useRef<Set<string>>(new Set());

  const getData = useCallback(async (url: string, options?: RequestInit) => {
    if (pendingRequestsRef.current.has(url)) {
      return Promise.reject(new Error('Запрос уже выполняется'));
    }
    pendingRequestsRef.current.add(url);
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      setError(errorMessage);
      throw error;
    } finally {
      pendingRequestsRef.current.delete(url);
    }
  }, []);

  return { data, error, getData };
}
