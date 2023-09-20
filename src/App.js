import './App.css';
import AnimatedBarChart from './Components/AnimatedBarChart';
import AnimatedLineChart from './Components/AnimatedLineChart';
import AnimatedPieChart from './Components/AnimatedPieChart';
import BarChart from './Components/BarChart';
import BarChartData from './Components/BarChartData';
import BarChartTooTip from './Components/BarChartToolTip';
import DynamicRangeLineChart from './Components/DynamicRangeLineChart';
import Header from './Components/Header';
import InteractivePieChart from './Components/InteractivePieChart';
import LineChart from './Components/LineChart';
import LineChartData from './Components/LineChartData';
import LineChartToolTip from './Components/LineChartToolTip';
import PieChart from './Components/PieChart';
import PieChartData from './Components/PieChartData';
import RangeSlider from './Components/RangeSlider/RangeSlider';
import marketData from './assets/data.json';
function App() {
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
      <Header header={'Simple Charts'}/>
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
        <InteractivePieChart/>
      <Header header={'With real data'}/>
        <LineChartData data={marketData}/>
        <BarChartData data={marketData.data}/>
        <PieChartData data={marketData.data}/>
      <Header header={'Dynamic Range'}/>
        <DynamicRangeLineChart marketData={marketData.data}/>
    </div>
  );
}

export default App;
