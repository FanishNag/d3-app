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
import { DataLineChart, DataLineChart2, boxplotData, stackedData, streamData, stockData, scatterData } from './assets/data';
import StreamGraph from './Components/StreamGraph';
import BoxPlot from './Components/BoxPlot';
import StockBoxPlot from './Components/StockBoxPlot';
import LineChartHoverLine from './LineChartHoverLine';
import ScatterPlot from './Components/ScatterPlot';
import LineChartWheel from './Components/LineChartWheel';
import BarChartWheel from './BarChartWheel';

function App() {
  return (
    <div className="App">
      <Header header={'Scatter plot'}/>
        <ScatterPlot data={scatterData} lable={'GrLivArea'} value={'SalePrice'}/>
      <Header header={'Line Charts'}/>
        <LineChart data={DataLineChart} lable={'date'} value={'amount'}/>
        <LineChartToolTip data={DataLineChart} lable={'date'} value={'amount'} height={300} width={500}/>
        <AnimatedLineChart data={DateConverter(marketData.data, 'price_date')} lable={'price_date'} value={'modal_price'}/>
        <UltimateLineChart data={DateConverter(marketData.data, 'price_date')} lable={'price_date'} value={'modal_price'}/>
        <LineChartBrushZoom data={DataLineChart} lable={'date'} value={'amount'}/>
        <LineChartHoverLine data={DataLineChart} lable={'date'} value={'amount'}/>
        <LineChartWheel data={DataLineChart} lable={'date'} value={'amount'}/>

      <Header header={'Area Chart'}/>
        <AreaChart data={DataLineChart} lable={'date'} value={'amount'}/>
        <StackedAreaChart data={DateConverter(stackedData, "date")} lable={'date'} value={'amount'}/>
        <StreamGraph data={DateConverter(streamData, "date")} lable={'year'} value={'amount'}/>

      <Header header={'Bar Chart'}/>
        <BarChart data={DataLineChart} lable={'date'} value={'amount'}/>
        <AnimatedBarChart data={DataLineChart} lable={'date'} value={'amount'}/>
        <BarChartTooTip data={DataLineChart} lable={'date'} value={'amount'}/>
        <BarChartWheel data={DataLineChart} lable={'date'} value={'amount'}/>

      <Header header={'Pie Chart'}/>
        <PieChart data={DataLineChart2} lable={'date'} value={'amount'}/>
        <AnimatedPieChart data={DataLineChart2} lable={'date'} value={'amount'}/>
        <InteractivePieChart data={DataLineChart2} lable={'date'} value={'amount'}/>

      <Header header={'Box plot'}/>
        <BoxPlot data={boxplotData} categerizedBy={'Species'} column={'Sepal_Length'}/>
        <StockBoxPlot data={DateConverter(stockData, 'time')} categerizedBy={'time'} column={'price'}/>

      <Header header={'Map Chart'}/>
        <BackgroundMap/>
      
    </div>
  );
}

export default App;
