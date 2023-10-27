import { useCallback, useRef } from "react";
import { LRUCache } from "../types/LRUCache";

const useLRUCache = (capacity: number) => {
  const cache = useRef(new LRUCache(capacity));

  const get = useCallback((key: string) => {
    return cache.current.get(key);
  }, []);

  const put = useCallback((key: string, value: any) => {
    cache.current.put(key, value);
  }, []);

  return { get, put };
};

export default useLRUCache;
