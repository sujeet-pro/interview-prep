import { useChartData } from "./hooks/chart-data.hook";
import { BarChart } from "./bar-chart/bar-chart.component";

function App() {
  const { data, inProgress, error } = useChartData();
  console.log(data, error, inProgress);

  return (
    <section>
      <div>
        Status: {inProgress ? "Progress" : "Done"}
        <br />
      </div>
      {data ? <BarChart data={data} /> : null}
    </section>
  );
}

export default App;
