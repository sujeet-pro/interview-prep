// import React from "react";
import './app.css'
import { StateWithHistoryString } from './state-with-history-component'
import { useStateWithHistory } from './use-state-with-history'
import { useStateWithHistoryUsingReducer } from './use-state-with-history-base'

export const App = () => {
  const stateWithHistoryUsingReducer = useStateWithHistoryUsingReducer<string>('hello')
  const stateWithHistory = useStateWithHistory<string>('hello', 3)
  const stateWithHistoryNoLimit = useStateWithHistory<string>('hello', Number.MAX_SAFE_INTEGER)
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-12">State With History</h1>
      <StateWithHistoryString stateWithHistory={stateWithHistoryUsingReducer} title="Using Reducer" />
      <StateWithHistoryString stateWithHistory={stateWithHistory} title="Using LL (max 3)" />
      <StateWithHistoryString stateWithHistory={stateWithHistoryNoLimit} title="Using LL (No Limit)" />
    </div>
  )
}
