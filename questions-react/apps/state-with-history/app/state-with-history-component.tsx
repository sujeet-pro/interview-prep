import { useState } from 'react'
import { StateWithHistory } from './type'

interface StateWithHistoryStringProps {
  stateWithHistory: StateWithHistory<string>
  title: string
}

export const StateWithHistoryString = ({ stateWithHistory, title }: StateWithHistoryStringProps) => {
  const [value, setValue, goBack, goForward, history] = stateWithHistory
  const [inputValue, setInputValue] = useState('')

  const btnHandler = () => {
    const val = inputValue.trim()
    if (val) {
      setValue(inputValue)
      setInputValue('')
    }
  }

  return (
    <section className="p-4">
      <h2 className="text-xl md:text-center mb-4">{title}</h2>
      <div className="flex flex-col md:flex-row md:justify-center gap-4">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            className="input"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') btnHandler()
            }}
          />
          <div className="join">
            <button onClick={btnHandler} className="btn join-item">
              Set New State
            </button>
            <button className="btn join-item" onClick={goBack}>
              Go Back
            </button>
            <button className="btn join-item" onClick={goForward}>
              Go Forward
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-lg">Current Value: {value}</h3>
          <ul className="flex flex-row flex-wrap gap-2">
            {history.map((item, index) => (
              <li className={`badge ${item === value ? 'badge-primary' : 'badge-ghost'}`} key={index}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
