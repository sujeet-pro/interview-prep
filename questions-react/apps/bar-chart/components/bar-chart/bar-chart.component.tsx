import { FC, useEffect, useState } from 'react'
import type { BarChartData, ChartData } from '../../services/data-service.api'

type OrderType = 'relevance' | 'asc' | 'desc'
export type BarChartProps = {
  data: BarChartData
  initialOrder?: OrderType
}

/**
 *
 * t == upBound
 * t / upperBound
 *  */

const Bar: FC<{ bar: ChartData; upperBound: number }> = ({ bar, upperBound }) => {
  const height = `${(bar.ticketCount * 100) / upperBound}%`
  return (
    <div className="w-full text-center p-2" style={{ backgroundColor: bar.colour, height }}>
      X: {bar.ticketCount}
    </div>
  )
}

function getOrderedChartData(chartData: ChartData[], order: 'relevance' | 'asc' | 'desc') {
  const newData = [...chartData]
  if (order === 'asc' || order === 'desc') {
    const sortOrder = order === 'asc' ? 1 : -1
    newData.sort((a, b) => sortOrder * (a.ticketCount - b.ticketCount))
  }
  return newData
}

export const BarChart: FC<BarChartProps> = ({ data, initialOrder = 'relevance' }) => {
  const [order, setOrder] = useState(initialOrder)
  const [barsInDisplayOrder, setBarsInDisplayOrder] = useState<ChartData[]>(() => {
    return getOrderedChartData(data.bars, order)
  })

  useEffect(() => {
    setBarsInDisplayOrder(getOrderedChartData(data.bars, order))
  }, [order, data.bars])

  return (
    <div className="p-4">
      <div className="flex items-center justify-end my-4 gap-2">
        Sort By:
        <select className="" value={order} onChange={e => setOrder(e.target.value as OrderType)}>
          <option value="relevance">Relevance</option>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>
      <div className="flex flex-row justify-between items-end gap-2 h-100">
        {barsInDisplayOrder.map(bar => (
          <Bar key={bar.id} bar={bar} upperBound={data.upperBound} />
        ))}
      </div>
      <div>
        <h2>Legends</h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2 my-2">
          {data.bars.map(bar => (
            <li key={bar.id} className="flex items-center gap-2 jsutify-start">
              <span className="inline-block w-4 h-4" style={{ backgroundColor: bar.colour }} />
              <span className="flex-grow">{bar.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
