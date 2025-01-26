import { useChartData } from './hooks/chart-data.hook'
import { BarChart } from './bar-chart/bar-chart.component'

export function App() {
  const { data, inProgress } = useChartData()

  return (
    <section>
      <div>
        Status: {inProgress ? 'Progress' : 'Done'}
        <br />
      </div>
      {data ? <BarChart data={data} /> : null}
    </section>
  )
}
