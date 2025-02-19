import { Routes, Route } from "react-router-dom"
import Settings from '../pages/settings/Settings';
import Chart from "../pages/chart/Chart";
import WaterLevel from "../pages/water-level/WaterLevel";
import Records from "../pages/records/Records";
import Main from "../layout/main/index";
import Dashboard from "../pages/dashboard/Dashboard";

const Router = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Main>
              <Dashboard />
            </Main>} />
        <Route
          path="/waterlevel"
          element={
            <Main>
              <WaterLevel />
            </Main>
          } />
        <Route
          path="/chart"
          element={
            <Main>
              <Chart />
            </Main>
          } />
        <Route
          path="/records"
          element={
            <Main>
              <Records />
            </Main>
          } />
        <Route
          path="/settings"
          element={
            <Main>
              <Settings />
            </Main>
          } />
      </Routes>
    </>
  )
}

export default Router;