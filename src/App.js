import './App.css';
import AnimatedBarChart from './Components/AnimatedBarChart';
import AnimatedLineChart from './Components/AnimatedLineChart';
import AnimatedPieChart from './Components/AnimatedPieChart';
import BarChart from './Components/BarChart';
import BarChartTooTip from './Components/BarChartToolTip';
import { DateConverter } from './Components/Converter/DateConverter';
import Header from './Components/Header';
import InteractivePieChart from './Components/InteractivePieChart';
import LineChartBrushZoom from './Components/LineBrushZoom';
import LineChart from './Components/LineChart';
import LineChartToolTip from './Components/LineChartToolTip';
import PieChart from './Components/PieChart';
import PieChartData from './Components/PieChartData';
import RangeSlider from './Components/RangeSlider/RangeSlider';
import UltimateLineChart from './Components/UltimateLineChart';
import marketData from './assets/data.json';
function App() {
  const chartData = []
  const DataLineChart2 = [
    {date: 0, amount : 250},
    {date: 1, amount : 350},
    {date: 2, amount : 150},
    {date: 3, amount : 850},
    {date: 4, amount : 1650},
    {date: 5, amount : 750},
    {date: 6, amount : 850},
    {date: 7, amount : 550},
    {date: 8, amount : 1050},
    {date: 9, amount : 450},
  ]
  const DataLineChart = [
    {date: new Date("Thu, 01 Sep 2023"), amount : 250},
    {date: new Date("Thu, 02 Sep 2023"), amount : 350},
    {date: new Date("Thu, 03 Sep 2023"), amount : 150},
    {date: new Date("Thu, 04 Sep 2023"), amount : 850},
    {date: new Date("Thu, 05 Sep 2023"), amount : 1650},
    {date: new Date("Thu, 06 Sep 2023"), amount : 750},
    {date: new Date("Thu, 07 Sep 2023"), amount : 850},
    {date: new Date("Thu, 08 Sep 2023"), amount : 550},
    {date: new Date("Thu, 09 Sep 2023"), amount : 1050},
    {date: new Date("Thu, 10 Sep 2023"), amount : 450},
  ]
  
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
      <Header header={'Line Charts'}/>
        <LineChart data={DataLineChart} lable={'date'} value={'amount'}/>
        <LineChartToolTip data={DataLineChart} lable={'date'} value={'amount'} height={300} width={500}/>
        <AnimatedLineChart data={DateConverter(marketData.data, 'price_date')} lable={'price_date'} value={'modal_price'}/>
        <UltimateLineChart data={marketData}/>
        <LineChartBrushZoom data={chartData}/>
      <Header header={'Bar Chart'}/>
        <BarChart data={DataLineChart} lable={'date'} value={'amount'}/>
        <AnimatedBarChart data={DataLineChart} lable={'date'} value={'amount'}/>
        <BarChartTooTip data={DataLineChart} lable={'date'} value={'amount'}/>
      <Header header={'Pie Chart'}/>
        <PieChart data={chartData}/>
        <AnimatedPieChart data={chartData}/>
        <PieChartData data={marketData.data}/>
        <InteractivePieChart/>
    </div>
  );
}

export default App;
