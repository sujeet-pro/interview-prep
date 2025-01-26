import { useChartData } from './hooks/chart-data.hook'
import { BarChart } from './components/bar-chart/bar-chart.component'

export function App() {
  const { data, inProgress, error } = useChartData()

  if (inProgress) {
    return <div>fetching data.</div>
  }

  if (error) {
    return (
      <details>
        <summary>Something Went Wrong</summary>
        <div>
          <pre>{error.message}</pre>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      </details>
    )
  }

  if (!data) {
    return <div>no data</div>
  }

  return <BarChart data={data} />
}
