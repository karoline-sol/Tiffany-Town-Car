import { useState, useEffect } from "react";

/**
 * Custom hook that keeps a state value in sync with localStorage.
 * @param key - The localStorage key name
 * @param defaultValue - Value to use if localStorage is empty
 */
function useLocalStorageState<T>(key: string, defaultValue: T) {
  // 1️⃣ Load the initial value (from localStorage if it exists)
  const [value, setValue] = useState<T>(() => {
    const saved = localStorage.getItem(key);
    return saved ? (JSON.parse(saved) as T) : defaultValue;
  });

  // 2️⃣ Save any changes to localStorage automatically
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // 3️⃣ Return both the current value and the setter function
  return [value, setValue] as const;
}

export default useLocalStorageState;
