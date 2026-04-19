export type StateWithHistory<T> = readonly [
  value: T | undefined,
  setValue: (value: T) => void,
  goBack: () => void,
  goForward: () => void,
  history: T[],
]

export type StateWithHistoryHook<T> = (initialValue: T) => StateWithHistory<T>
