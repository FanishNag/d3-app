import './App.css';
import AnimatedBarChart from './Components/AnimatedBarChart';
import AnimatedLineChart from './Components/AnimatedLineChart';
import AnimatedPieChart from './Components/AnimatedPieChart';
import AreaChart from './Components/AreaChart';
import BackgroundMap from './Components/BackgroundMap';
import BarChart from './Components/BarChart';
import BarChartTooTip from './Components/BarChartToolTip';
import { DateConverter } from './Components/Converter/DateConverter';
import Header from './Components/Header';
import InteractivePieChart from './Components/InteractivePieChart';
import LineChartBrushZoom from './Components/LineBrushZoom';
import LineChart from './Components/LineChart';
import LineChartToolTip from './Components/LineChartToolTip';
import PieChart from './Components/PieChart';
import StackedAreaChart from './Components/StackedAreaChart';
import UltimateLineChart from './Components/UltimateLineChart';
import marketData from './assets/data.json';
function App() {
  
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

  const stackedData=[
    { "date": "2023-01-01", "categoryA": 30, "categoryB": 20, "categoryC": 50 },
    { "date": "2023-02-01", "categoryA": 40, "categoryB": 30, "categoryC": 60 },
    { "date": "2023-03-01", "categoryA": 35, "categoryB": 25, "categoryC": 45 },
    { "date": "2023-04-01", "categoryA": 50, "categoryB": 40, "categoryC": 70 },
    { "date": "2023-05-01", "categoryA": 55, "categoryB": 45, "categoryC": 80 }
  ]
  
  
  return (
    <div className="App">
      <Header header={'Line Charts'}/>
        <LineChart data={DataLineChart} lable={'date'} value={'amount'}/>
        <LineChartToolTip data={DataLineChart} lable={'date'} value={'amount'} height={300} width={500}/>
        <AnimatedLineChart data={DateConverter(marketData.data, 'price_date')} lable={'price_date'} value={'modal_price'}/>
        <UltimateLineChart data={DateConverter(marketData.data, 'price_date')} lable={'price_date'} value={'modal_price'}/>
        <LineChartBrushZoom data={DataLineChart} lable={'date'} value={'amount'}/>
      <Header header={'Area Chart'}/>
        <AreaChart data={DataLineChart} lable={'date'} value={'amount'}/>
        <StackedAreaChart data={DateConverter(stackedData, "date")} lable={'date'} value={'amount'}/>
      <Header header={'Bar Chart'}/>
        <BarChart data={DataLineChart} lable={'date'} value={'amount'}/>
        <AnimatedBarChart data={DataLineChart} lable={'date'} value={'amount'}/>
        <BarChartTooTip data={DataLineChart} lable={'date'} value={'amount'}/>
      <Header header={'Pie Chart'}/>
        <PieChart data={DataLineChart2} lable={'date'} value={'amount'}/>
        <AnimatedPieChart data={DataLineChart2} lable={'date'} value={'amount'}/>
        <InteractivePieChart data={DataLineChart2} lable={'date'} value={'amount'}/>
      <Header header={'Map Chart'}/>
        <BackgroundMap/>
    </div>
  );
}

export default App;
