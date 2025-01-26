export type ChartData = {
    "id": string
    "name": string
    "ticketCount": number
    "colour": string
}

export type BarChartData = {
    lowerBound: number
    upperBound: number
    bars: ChartData[]
}

export async function getChartData({ signal }: { signal: AbortSignal }): Promise<BarChartData> {
    try {
        const res = await fetch('/data.json', { signal })
        if (!res.ok) {
            throw new Error('Data not found')
        }
        const data: ChartData[] = (await res.json()) // await getData()
        const ticketSizes = data.map(d => d.ticketCount)
        const upperBound = Math.max(...ticketSizes)
        const lowerBound = Math.min(...ticketSizes)
        // pre-processing: TODO: check cause
        return {
            lowerBound,
            upperBound,
            bars: data
        }
    } catch (err) {
        throw new Error('Some errror', { cause: err })
    }
}
