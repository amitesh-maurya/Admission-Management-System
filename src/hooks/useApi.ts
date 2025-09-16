// Custom hook for API requests with error handling and loading states
import { useState, useCallback } from 'react';

interface UseApiOptions {
  onSuccess?: (data: unknown) => void;
  onError?: (error: string) => void;
}

export function useApi(endpoint: string, options: UseApiOptions = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [data, setData] = useState<unknown>(null);

  const execute = useCallback(async (
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: unknown,
    headers?: HeadersInit
  ) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      const responseData = await response.json();

      if (!response.ok) {
        const errorMessage = responseData.error || `HTTP ${response.status}: ${response.statusText}`;
        setError(errorMessage);
        options.onError?.(errorMessage);
        return null;
      }

      setData(responseData);
      options.onSuccess?.(responseData);
      return responseData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      options.onError?.(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, [endpoint, options]);

  const get = useCallback(() => execute('GET'), [execute]);
  const post = useCallback((body: unknown) => execute('POST', body), [execute]);
  const put = useCallback((body: unknown) => execute('PUT', body), [execute]);
  const del = useCallback(() => execute('DELETE'), [execute]);

  return {
    loading,
    error,
    data,
    execute,
    get,
    post,
    put,
    delete: del,
  };
}