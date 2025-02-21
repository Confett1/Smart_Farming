import { Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react";
import PageLoader from "../components/loader/MainLoader";
import Main from "../layout/main/index";
import AuthLayout from "../layout/auth-layout";
import Login from "../pages/authentication/login/Login";
import NotFound from "../pages/not-found/NotFound";

const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const WaterLevel = lazy(() => import("../pages/water-level/WaterLevel"));
const Chart = lazy(() => import("../pages/chart/Chart"));
const Records = lazy(() => import("../pages/records/Records"));
const Settings = lazy(() => import("../pages/settings/Settings"));

const Router = () => {
  return (
    <>
      <Suspense fallback={ <PageLoader /> }>
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


            <Route
            path="/login"
            element={
              <AuthLayout>
                  <Login />
              </AuthLayout>
            } />

            <Route
              path="*"
              element={
                <NotFound />
              }
            />
        </Routes>
      </Suspense>
    </>
  )
}

export default Router;