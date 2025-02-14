import { Routes, Route } from "react-router-dom"
import Settings from './pages/Settings.jsx';
import Homepage from './pages/Homepage.jsx';
import Chart from "./pages/Chart.jsx";
import { WaterLevel } from "./pages/WaterLevel.jsx";
import Records from "./pages/Records.jsx";
import '../src/styles/App.css'

function App() {
  return (
      <Routes>
        <Route path = "/" element={<Homepage />}/>
        <Route path = "/waterlevel" element={<WaterLevel />}/>
        <Route path = "/chart" element={<Chart />}/>
        <Route path = "/records" element={<Records />}/>
        <Route path = "/settings" element={<Settings />}/>
      </Routes>
  );
}

export default App;
