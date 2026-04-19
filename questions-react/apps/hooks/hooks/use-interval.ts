import { useEffect, useRef } from 'react'

/**
 * A custom hook that executes a callback function at specified intervals.
 *
 * @param callback - The function to be executed at each interval
 * @param delay - The time in milliseconds between each execution. If null or undefined, the interval is paused.
 *
 * @example
 * // Basic usage
 * useInterval(() => {
 *   console.log('This runs every second');
 * }, 1000);
 *
 * @example
 * // Pausing the interval by setting delay to null
 * const [delay, setDelay] = useState(1000);
 * useInterval(() => {
 *   // This won't run when delay is null
 * }, isRunning ? delay : null);
 *
 * @example
 * // The callback can change without resetting the timer
 * useInterval(() => {
 *   console.log(count); // Will always use the latest count value
 * }, 1000);
 */
export function useInterval(callback: () => void, delay: number | null): void {
  const cbRef = useRef(callback)

  useEffect(() => {
    cbRef.current = callback
  }, [callback])

  useEffect(() => {
    if (delay == null) {
      return
    }
    const timerRef = setInterval(() => {
      if (cbRef.current) {
        cbRef.current()
      }
    }, delay)
    return () => clearInterval(timerRef)
  }, [delay])
}
