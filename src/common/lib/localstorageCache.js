export const localStorageCache = () => {
    const cache = new Map();
  
    // Load cache from localStorage, only on the client-side
    if (typeof window !== 'undefined') {
      const storedCache = localStorage.getItem('swr-cache');
      if (storedCache) {
        try {
          const parsedCache = JSON.parse(storedCache);
          if (Array.isArray(parsedCache)) {
            parsedCache.forEach(([key, value]) => {
              cache.set(key, value);
            });
          }
        } catch (error) {
          console.error('Error parsing localStorage cache:', error);
        }
      }
    }
  
    const set = (key, value) => {
      cache.set(key, value);
      if (typeof window !== 'undefined') {
        const cacheArray = Array.from(cache.entries());
        localStorage.setItem('swr-cache', JSON.stringify(cacheArray));
      }
    };
  
    const get = (key) => {
      return cache.has(key) ? cache.get(key) : undefined;
    };
  
    const remove = (key) => {
      cache.delete(key);
      if (typeof window !== 'undefined') {
        const cacheArray = Array.from(cache.entries());
        localStorage.setItem('swr-cache', JSON.stringify(cacheArray));
      }
    };

    const keys = () => {
        return cache.keys();
      };
    
      const deleteCache = (key) => {
        cache.delete(key);
        if (typeof window !== 'undefined') {
          const cacheArray = Array.from(cache.entries());
          localStorage.setItem('swr-cache', JSON.stringify(cacheArray));
        }
      };
  
    return { get, set, remove,keys, delete: deleteCache } // use `delete` to remove a cache entry };
  };