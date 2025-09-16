// Simple cache utility for API responses and static data
interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number; // time to live in milliseconds
}

class SimpleCache {
  private cache = new Map<string, CacheItem<unknown>>();
  private defaultTTL = 5 * 60 * 1000; // 5 minutes

  set<T>(key: string, data: T, ttl?: number): void {
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL
    };
    this.cache.set(key, item);
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    // Check if item has expired
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }

  has(key: string): boolean {
    const item = this.cache.get(key);
    
    if (!item) {
      return false;
    }

    // Check if item has expired
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  // Get cache statistics
  getStats() {
    let validItems = 0;
    let expiredItems = 0;
    const now = Date.now();

    this.cache.forEach((item) => {
      if (now - item.timestamp > item.ttl) {
        expiredItems++;
      } else {
        validItems++;
      }
    });

    return {
      totalItems: this.cache.size,
      validItems,
      expiredItems
    };
  }

  // Clean up expired items
  cleanup(): number {
    const now = Date.now();
    let cleaned = 0;

    this.cache.forEach((item, key) => {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key);
        cleaned++;
      }
    });

    return cleaned;
  }
}

// Global cache instance
export const cache = new SimpleCache();

// Cache-aware fetch wrapper
export async function cachedFetch<T>(
  url: string,
  options?: RequestInit,
  cacheOptions?: { ttl?: number; key?: string }
): Promise<T> {
  const cacheKey = cacheOptions?.key || `fetch_${url}_${JSON.stringify(options)}`;
  
  // Try to get from cache first
  const cached = cache.get<T>(cacheKey);
  if (cached) {
    console.log(`Cache hit for ${cacheKey}`);
    return cached;
  }

  // Fetch from API
  console.log(`Cache miss for ${cacheKey}, fetching...`);
  const response = await fetch(url, options);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json() as T;
  
  // Store in cache
  cache.set(cacheKey, data, cacheOptions?.ttl);
  
  return data;
}

// React hook for cached data
import { useState, useEffect } from 'react';

export function useCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl?: number
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try cache first
        const cached = cache.get<T>(key);
        if (cached) {
          setData(cached);
          setLoading(false);
          return;
        }

        // Fetch new data
        const result = await fetcher();
        cache.set(key, result, ttl);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error('Error loading cached data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [key, fetcher, ttl]);

  const refresh = async () => {
    cache.delete(key);
    setLoading(true);
    
    try {
      const result = await fetcher();
      cache.set(key, result, ttl);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refresh };
}