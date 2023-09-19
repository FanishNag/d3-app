import './App.css';
import AnimatedBarChart from './Components/AnimatedBarChart';
import AnimatedLineChart from './Components/AnimatedLineChart';
import AnimatedPieChart from './Components/AnimatedPieChart';
import BarChart from './Components/BarChart';
import BarChartTooTip from './Components/BarChartToolTip';
import Header from './Components/Header';
import InteractivePieChart from './Components/InteractivePieChart';
import LineChart from './Components/LineChart';
import LineChartData from './Components/LineChartData';
import LineChartToolTip from './Components/LineChartToolTip';
import PieChart from './Components/PieChart';

function App() {
  const data=[200,250,190,100,120,80,210,75,39]
  const chartData = []
  
  const randomData=()=>{
  for (let i = 0; i <= 10; i++) {
    const value = Math.floor(Math.random() * 200);
    chartData.push(value);
    }
  return chartData
  }
  randomData()
  return (
    <div className="App">
      <LineChartData/>
      {/* <Header header={'Simple Charts'}/>
        <LineChart data={chartData}/>
        <BarChart data={chartData} />
        <PieChart data={chartData}/>
      <Header header={'Animated Chart'}/>
        <AnimatedLineChart data={chartData}/>
        <AnimatedBarChart data={chartData}/>
        <AnimatedPieChart data={chartData}/>
      <Header header={'Interactive Chart'}/>
        <LineChartToolTip/>
        <BarChartTooTip/>
        <InteractivePieChart/> */}
    </div>
  );
}

export default App;
