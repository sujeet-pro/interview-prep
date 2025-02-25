import { useState, useEffect } from 'react'

interface WindowSize {
  width: number
  height: number
}

function debounce<T extends unknown[]>(fn: (...args: T) => void, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  return (...args: T) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

/**
 * A custom hook that returns the current window size and updates when the window is resized.
 * Includes debouncing to prevent excessive updates.
 *
 * @param debounceTime - The time in milliseconds to debounce the resize event (default: 250ms)
 * @returns The current window width and height
 */
export function useWindowSize(debounceTime: number = 250): WindowSize {
  const [state, setState] = useState<WindowSize>(() => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  })

  useEffect(() => {
    const handler = debounce(() => {
      setState({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }, debounceTime)

    window.addEventListener('resize', handler)
    return () => {
      window.removeEventListener('resize', handler)
    }
  }, [debounceTime])

  return state
}
