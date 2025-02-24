import { useCallback, useMemo, useReducer } from 'react'
import { StateWithHistory } from './type'

type HistoryState<T> = {
  history: T[]
  currentIndex: number
}
type HistoryAction<T> = { type: 'add'; value: T } | { type: 'goBack' } | { type: 'goForward' }

function reducer<T>(state: HistoryState<T>, action: HistoryAction<T>) {
  switch (action.type) {
    case 'add':
      return {
        history: [...state.history, action.value],
        currentIndex: state.history.length,
      }
    case 'goBack':
      return {
        history: state.history,
        currentIndex: Math.max(0, state.currentIndex - 1),
      }
    case 'goForward':
      return {
        history: state.history,
        currentIndex: Math.min(state.currentIndex + 1, state.history.length - 1),
      }
  }
}

export function useStateWithHistoryUsingReducer<T>(initialValue: T): StateWithHistory<T> {
  const [state, dispatch] = useReducer<HistoryState<T>, [HistoryAction<T>]>(reducer, {
    history: [initialValue],
    currentIndex: 0,
  })

  const value = useMemo((): T => {
    return state.history[state.currentIndex]
  }, [state.currentIndex, state.history])

  const setValue = useCallback((newValue: T) => {
    dispatch({ type: 'add', value: newValue })
  }, [])

  const goBack = useCallback(() => {
    dispatch({ type: 'goBack' })
  }, [])
  const goForward = useCallback(() => {
    dispatch({ type: 'goForward' })
  }, [])

  return [value, setValue, goBack, goForward, state.history] as const
}
