import { Routes, Route } from "react-router-dom"
// import Settings from '../pages/settings/Settings';
// import Chart from "../pages/chart/Chart";
// import WaterLevel from "../pages/water-level/WaterLevel";
// import Records from "../pages/records/Records";
// import Dashboard from "../pages/dashboard/Dashboard";
import { lazy, Suspense } from "react";
import PageLoader from "../components/loader/PageLoader";
import Main from "../layout/main/index";

const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const WaterLevel = lazy(() => import("../pages/water-level/WaterLevel"));
const Chart = lazy(() => import("../pages/chart/Chart"));
const Records = lazy(() => import("../pages/records/Records"));
const Settings = lazy(() => import("../pages/settings/Settings"));

const Router = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Main>
              <Suspense fallback={ <PageLoader /> }>
                <Dashboard />
              </Suspense>
            </Main>} />
        <Route
          path="/waterlevel"
          element={
            <Main>
              <Suspense fallback={ <PageLoader /> }>
                <WaterLevel />
              </Suspense>
            </Main>
          } />
        <Route
          path="/chart"
          element={
            <Main>
              <Suspense fallback={ <PageLoader /> }>
                <Chart />
              </Suspense>
            </Main>
          } />
        <Route
          path="/records"
          element={
            <Main>
              <Suspense fallback={ <PageLoader /> }>
                <Records />
              </Suspense>
            </Main>
          } />
        <Route
          path="/settings"
          element={
            <Main>
              <Suspense fallback={ <PageLoader /> }>
                <Settings />
              </Suspense>
            </Main>
          } />
      </Routes>
    </>
  )
}

export default Router;