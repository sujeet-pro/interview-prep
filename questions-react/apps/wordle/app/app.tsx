// import React from "react";
import { useEffect, useReducer } from 'react'
import './app.css'
import { useWord } from './word.hook'
import { WordleAttempt } from './wordle'

const NO_CHARS: string[] = []

type State = {
  attempts: string[][]
  currentAttempt: string[]
  maxAttempts: number
}

type Action =
  | { type: 'add-char'; char: string }
  | { type: 'remove-char' }
  | { type: 'choose-new-word' }
  | { type: 'reset' }
  | { type: 'set-max-attempts'; maxAttempts: number }

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'add-char':
      if (state.currentAttempt.length < 5) {
        return {
          ...state,
          currentAttempt: [...state.currentAttempt, action.char],
        }
      }
      return state
    case 'remove-char':
      if (state.currentAttempt.length > 0) {
        return {
          ...state,
          currentAttempt: state.currentAttempt.slice(0, -1),
        }
      }
      return state
    case 'choose-new-word':
      if (state.currentAttempt.length === 5) {
        return {
          ...state,
          attempts: [...state.attempts, state.currentAttempt],
          currentAttempt: [],
        }
      }
      return state
    case 'reset':
      return {
        attempts: [],
        currentAttempt: [],
        maxAttempts: state.maxAttempts,
      }
    case 'set-max-attempts':
      return {
        ...state,
        maxAttempts: action.maxAttempts,
      }
    default:
      return state
  }
}

export function App() {
  const { word, chooseNewWord } = useWord()
  const [state, dispatch] = useReducer<State, [Action]>(reducer, { attempts: [], currentAttempt: [], maxAttempts: 6 })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        dispatch({ type: 'choose-new-word' })
      } else if (e.key === 'Backspace') {
        dispatch({ type: 'remove-char' })
      } else if (e.key.length === 1 && /^[a-zA-Z]$/.test(e.key)) {
        dispatch({ type: 'add-char', char: e.key.toUpperCase() })
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  if (!word) {
    return <div>Loading...</div>
  }

  const emptyAttempts = Array.from({ length: state.maxAttempts - state.attempts.length - 1 }, (_, idx) => idx)

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex flex-col items-center gap-[5px] mx-auto my-5 max-w-[350px]">
        {state.attempts.map((attempt, idx) => (
          <WordleAttempt key={`${idx}-${word}`} word={word} attempt={attempt} isAttemptCompleted={true} />
        ))}
        {state.attempts.length < state.maxAttempts ? (
          <WordleAttempt word={word} attempt={state.currentAttempt} isAttemptCompleted={false} />
        ) : null}
        {emptyAttempts.map((_, idx) => (
          <WordleAttempt key={`empty-${idx}`} word={word} attempt={NO_CHARS} isAttemptCompleted={false} />
        ))}
      </div>
      <div className="flex justify-center">
        <button
          className="btn btn-primary btn-outline"
          onClick={() => {
            chooseNewWord()
            dispatch({ type: 'reset' })
          }}
        >
          Reset
        </button>
        <input
          type="number"
          value={state.maxAttempts}
          onChange={e =>
            dispatch({
              type: 'set-max-attempts',
              maxAttempts: Number(e.target.value),
            })
          }
        />
        <div className="tooltip tooltip-left" data-tip={word.join('')}>
          <button className="btn">Reveal</button>
        </div>
      </div>
    </div>
  )
}
