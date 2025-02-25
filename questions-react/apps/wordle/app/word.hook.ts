import { useCallback, useEffect, useState } from 'react'

const WORD_LIST_API_URL = `${import.meta.env.BASE_URL}/data/wordle.json`

interface WordHook {
  word: string[] | null
  chooseNewWord: () => void
}

export function useWord(): WordHook {
  const [allWords, setAllWords] = useState<string[]>([])
  const [word, setWord] = useState<string[] | null>(null)

  useEffect(() => {
    fetch(WORD_LIST_API_URL)
      .then((res: Response) => res.json())
      .then((data: string[]) => {
        const idx: number = Math.floor(Math.random() * data.length)
        setAllWords(data)
        setWord(data[idx].toUpperCase().split('') as string[])
      })
  }, [])

  const chooseNewWord = useCallback((): void => {
    if (allWords.length === 0) return
    const idx: number = Math.floor(Math.random() * allWords.length)
    const newWord: string = allWords[idx].toUpperCase()
    if (newWord) {
      setWord(newWord.split('') as string[])
    }
  }, [allWords])

  return { word, chooseNewWord }
}
