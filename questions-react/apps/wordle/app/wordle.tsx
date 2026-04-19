import clsx from 'clsx'
import React from 'react'

const containerStyle = 'flex gap-1'
const charStyle = 'size-16 border-2 border-[#d3d6da] flex justify-center items-center text-2xl font-bold uppercase'

function LineImp({
  word,
  attempt,
  isAttemptCompleted,
}: {
  word: string[]
  attempt: string[]
  isAttemptCompleted: boolean
}) {
  return (
    <div className={containerStyle}>
      {attempt.map((char, index) => (
        <div
          key={index}
          className={clsx(
            charStyle,
            attempt.length === 5 && isAttemptCompleted
              ? {
                  'bg-[#6aaa64] text-white border-[#6aaa64]': word[index] === char,
                  'bg-[#c9b458] text-white border-[#c9b458]': word.includes(char) && word[index] !== char,
                  'bg-[#787c7e] text-white border-[#787c7e]': !word.includes(char) && char !== ' ',
                }
              : null,
          )}
        >
          {char}
        </div>
      ))}
      {Array.from({ length: 5 - attempt.length }).map((_, index) => (
        <div key={`empty-${index}`} className={charStyle}></div>
      ))}
    </div>
  )
}

export const WordleAttempt = React.memo(LineImp)
