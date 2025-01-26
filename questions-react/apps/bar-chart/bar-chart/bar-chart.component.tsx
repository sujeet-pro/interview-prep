import { FC, useEffect, useState } from 'react'
import type { BarChartData, ChartData } from '../services/data-service.api'
import styles from './bar-chart.module.css'

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

const Bar: FC<{ bar: ChartData; upperBound: number }> = ({
  bar,
  upperBound,
}) => {
  const height = `${(bar.ticketCount * 100) / upperBound}%`
  return (
    <div className={styles.bar} style={{ backgroundColor: bar.colour, height }}>
      X: {bar.ticketCount}
    </div>
  )
}

function getOrderedChartData(
  chartData: ChartData[],
  order: 'relevance' | 'asc' | 'desc',
) {
  const newData = [...chartData]
  if (order === 'asc' || order === 'desc') {
    const sortOrder = order === 'asc' ? 1 : -1
    newData.sort((a, b) => sortOrder * (a.ticketCount - b.ticketCount))
  }
  return newData
}

export const BarChart: FC<BarChartProps> = ({
  data,
  initialOrder = 'relevance',
}) => {
  const [order, setOrder] = useState(initialOrder)
  const [barsInDisplayOrder, setBarsInDisplayOrder] = useState<ChartData[]>(
    () => {
      return getOrderedChartData(data.bars, order)
    },
  )

  useEffect(() => {
    setBarsInDisplayOrder(getOrderedChartData(data.bars, order))
  }, [order, data.bars])

  return (
    <div>
      <select
        className={styles.sortSelector}
        value={order}
        onChange={e => setOrder(e.target.value as OrderType)}
      >
        <option value="relevance">Relevance</option>
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>
      <div>
        <h2>Legends</h2>
        <ul>
          {data.bars.map(bar => (
            <li key={bar.id}>
              <span
                className={styles.legendColor}
                style={{ backgroundColor: bar.colour }}
              />
              <span>{bar.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.barChart}>
        {barsInDisplayOrder.map(bar => (
          <Bar key={bar.id} bar={bar} upperBound={data.upperBound} />
        ))}
      </div>
    </div>
  )
}
