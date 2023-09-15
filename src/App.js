import './App.css';
import BarChart from './Components/BarChart';
import LineChart from './Components/LineChart';
import LineChartToolTip from './Components/LineChartToolTip';
import PieChart from './Components/PieChart';

function App() {
  return (
    <div className="App">
      <LineChart/>
      <BarChart/>
      <PieChart/>
      <LineChartToolTip/>
    </div>
  );
}

export default App;
