import { Routes, Route } from "react-router-dom"
import Settings from '../pages/Settings';
import Chart from "../pages/Chart";
import WaterLevel from "../pages/WaterLevel";
import Records from "../pages/Records";
import Main from "../layout/main/index";
import Dashboard from "../pages/dashboard/Dashboard";

const Router = () => {
    return (
        <>
            <Routes>
        <Route 
          path = "/" 
          element={
            <Main> 
              <Dashboard />
            </Main>}/>
        <Route 
          path = "/waterlevel" 
          element={
            <Main>
              <WaterLevel />
            </Main>
          }/>
        <Route 
          path = "/chart" 
          element={
            <Main>
              <Chart />
            </Main>
          }/>
        <Route 
          path = "/records" 
          element={
            <Main>
              <Records />
            </Main>
          }/>
        <Route 
          path = "/settings" 
          element={
            <Main>
              <Settings />
            </Main>
          }/>
      </Routes>
        </>
    )
}

export default Router;