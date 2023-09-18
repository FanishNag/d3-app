import './App.css';
import AnimatedLineChart from './Components/AnimatedLineChart';
import BarChart from './Components/BarChart';
import BarChartTooTip from './Components/BarChartToolTip';
import InteractivePieChart from './Components/InteractivePieChart';
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
      <BarChartTooTip/>
      <InteractivePieChart/>
      <AnimatedLineChart/>
    </div>
  );
}

export default App;
