import { useEffect, useState } from 'react'

type FetchState<T> = {
  responseJson: T | null
  isLoading: boolean
  error: Error | null
}

export function useFetch<T>(url: string | URL, init?: RequestInit): FetchState<T> {
  const [responseJson, setResponseJson] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller
    const exec = async () => {
      try {
        setIsLoading(true)
        const res = await fetch(url, {
          ...init,
          signal: AbortSignal.any([signal, ...(init?.signal ? [init?.signal] : [])]),
        })
        // Issue 1: No error handling for non-200 responses
        if (!res.ok && res.status !== 404) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data = await res.json()
        if (signal.aborted) return
        // Issue 2: No type validation of response data
        setResponseJson(data as T) // Type assertion without validation
        setError(null)
      } catch (err) {
        if (signal.aborted) return
        setError(err instanceof Error ? err : new Error('An error occurred'))
        setResponseJson(null)
      }
      if (signal.aborted) return
      setIsLoading(false)
    }

    exec()
    return () => {
      controller.abort()
    }
    // Issue 3: init object in deps array could cause unnecessary re-renders
    // Should use JSON.stringify(init) or extract mutable values
  }, [url, init])

  return { responseJson, isLoading, error }
}
