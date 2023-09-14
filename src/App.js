import './App.css';
import BarChart from './Components/BarChart';
import LineChart from './Components/LineChart';
import PieChart from './Components/PieChart';

function App() {
  return (
    <div className="App">
      <LineChart/>
      <BarChart/>
      <PieChart/>
    </div>
  );
}

export default App;
