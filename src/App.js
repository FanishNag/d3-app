import './App.css';
import AnimatedBarChart from './Components/AnimatedBarChart';
import AnimatedLineChart from './Components/AnimatedLineChart';
import BarChart from './Components/BarChart';
import BarChartTooTip from './Components/BarChartToolTip';
import Header from './Components/Header';
import InteractivePieChart from './Components/InteractivePieChart';
import LineChart from './Components/LineChart';
import LineChartToolTip from './Components/LineChartToolTip';
import PieChart from './Components/PieChart';

function App() {
  return (
    <div className="App">
      <Header header={'Simple Charts'}/>
        <LineChart/>
        <BarChart/>
        <PieChart/>
      <Header header={'Animated Chart'}/>
        <AnimatedLineChart/>
        <AnimatedBarChart/>
      <Header header={'Interactive Chart'}/>
        <LineChartToolTip/>
        <BarChartTooTip/>
        <InteractivePieChart/>
    </div>
  );
}

export default App;
