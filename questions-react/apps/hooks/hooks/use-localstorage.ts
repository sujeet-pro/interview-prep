import { useCallback, useState } from 'react'

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(error)
  }
}

function getItem<T>(key: string, fallbackValue?: T): T | null {
  try {
    const item = localStorage.getItem(key)
    if (item === null && fallbackValue !== undefined) {
      setItem(key, fallbackValue)
      return fallbackValue
    }
    return item ? (JSON.parse(item) as T) : null
  } catch (error) {
    console.error(error)
    return null
  }
}

/**
 * A custom hook that provides persistent state using localStorage.
 *
 * @param key - The localStorage key to store the value under
 * @param initialValue - The initial value to use if no value exists in localStorage
 * @returns A tuple containing the current value and a function to update it
 *
 * @example
 * // Basic usage
 * const [count, setCount] = useLocalStorage('count', 0);
 * setCount(count + 1);
 *
 * @example
 * // Using a function to update based on previous value
 * const [user, setUser] = useLocalStorage('user', { name: 'John' });
 * setUser(prev => ({ ...prev, age: 30 }));
 *
 * @example
 * // With complex objects
 * const [settings, setSettings] = useLocalStorage('settings', {
 *   theme: 'dark',
 *   notifications: true
 * });
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): readonly [T | null, (newValue: T | ((prev: T | null) => T)) => void] {
  const [value, setValue] = useState<T | null>(() => getItem(key, initialValue))

  const setValueAndStorage = useCallback(
    (newValue: T | ((prev: T | null) => T)): void => {
      setValue(prev => {
        const nextValue = typeof newValue === 'function' ? (newValue as (prev: T | null) => T)(prev) : newValue
        setItem(key, nextValue)
        return nextValue
      })
    },
    [key],
  )

  return [value, setValueAndStorage] as const
}
