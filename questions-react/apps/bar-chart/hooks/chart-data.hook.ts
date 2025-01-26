import { useEffect, useState } from "react";
import { getChartData } from "../services/data-service.api";
import type { BarChartData } from "../services/data-service.api";

export function useChartData() {
    const [data, setData] = useState<BarChartData | null>(null)
    const [inProgress, setInProgress] = useState<boolean>(false)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [error, setError] = useState<any>(null)

    useEffect(() => {
        setInProgress(true)
        const controller = new AbortController()

        getChartData({ signal: controller.signal }).then(chartData => {
            setError(null)
            setData(chartData)
        }).catch(err => {
            setData(null)
            setError(err)
        }).finally(() => {
            setInProgress(false)
        })
        return () => {
            controller.abort()
        }
    }, [])

    return { data, inProgress, error }
}