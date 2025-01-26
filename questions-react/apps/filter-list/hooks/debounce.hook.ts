import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, time: number = 250) {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedValue(value)
        }, time)
        return () => {
            clearTimeout(timerId)
        }
    }, [value, time])
    return debouncedValue
}