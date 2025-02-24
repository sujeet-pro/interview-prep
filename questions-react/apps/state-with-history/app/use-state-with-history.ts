import { useCallback, useMemo, useReducer } from 'react'
import { StateWithHistory } from './type'

class HistoryNode<T> {
  value: T
  next: HistoryNode<T> | null = null
  prev: HistoryNode<T> | null = null

  constructor(value: T) {
    this.value = value
  }
}

class HistoryList<T> {
  #head: HistoryNode<T> | null = null
  #tail: HistoryNode<T> | null = null
  #size: number = 0
  #maxSize: number

  constructor(
    maxSize: number,
    head: HistoryNode<T> | null = null,
    tail: HistoryNode<T> | null = null,
    size: number = 0,
  ) {
    this.#maxSize = Math.max(1, maxSize)
    this.#head = head
    this.#tail = tail
    this.#size = size
  }

  append(value: T) {
    let newHead = this.#head
    let newSize = this.#size

    // Check if max size reached before adding
    if (this.#size >= this.#maxSize) {
      // Point head to next node directly
      newHead = newHead?.next || null
      if (newHead) {
        newHead.prev = null
      }
      newSize--
    }

    const newList = new HistoryList<T>(this.#maxSize, newHead, this.#tail, newSize)

    // Add new value
    const newNode = new HistoryNode(value)
    if (!newList.#head) {
      newList.#head = newNode
      newList.#tail = newNode
    } else if (newList.#tail) {
      newNode.prev = newList.#tail
      newList.#tail.next = newNode
      newList.#tail = newNode
    }
    newList.#size++

    return newList
  }

  get latest() {
    return this.#tail
  }

  *[Symbol.iterator]() {
    let current = this.#head
    while (current) {
      yield current.value
      current = current.next
    }
  }
}

type HistoryState<T> = {
  history: HistoryList<T>
  current: HistoryNode<T> | null
}

type HistoryAction<T> = { type: 'add'; value: T } | { type: 'goBack' } | { type: 'goForward' }

function historyReducer<T>(state: HistoryState<T>, action: HistoryAction<T>): HistoryState<T> {
  let history = state.history
  switch (action.type) {
    case 'add':
      history = history.append(action.value)
      return {
        history,
        current: history.latest,
      }
    case 'goBack':
      if (state.current?.prev) {
        return {
          history,
          current: state.current.prev,
        }
      }
      return state
    case 'goForward':
      if (state.current?.next) {
        return {
          history,
          current: state.current.next,
        }
      }
      return state
  }
}

function reducerInitValue<T>(initialValue: T | (() => T), maxHistory: number) {
  let history = new HistoryList<T>(maxHistory)
  if (typeof initialValue === 'function') {
    history = history.append((initialValue as () => T)())
  } else {
    history = history.append(initialValue)
  }

  return {
    history,
    current: history.latest,
  }
}

type InitialValue<T> = T | (() => T)

export function useStateWithHistory<T>(initialValue: InitialValue<T>, maxHistory: number): StateWithHistory<T> {
  const [state, dispatch] = useReducer<HistoryState<T>, InitialValue<T>, [HistoryAction<T>]>(
    historyReducer,
    initialValue,
    initialValue => reducerInitValue(initialValue, maxHistory),
  )

  const value = useMemo((): T | undefined => {
    return state.current?.value
  }, [state])

  const setValue = useCallback((newValue: T) => {
    dispatch({ type: 'add', value: newValue })
  }, [])

  const goBack = useCallback(() => {
    dispatch({ type: 'goBack' })
  }, [])

  const goForward = useCallback(() => {
    dispatch({ type: 'goForward' })
  }, [])

  const historyArray = useMemo(() => [...state.history], [state.history])

  return [value, setValue, goBack, goForward, historyArray] as const
}
