import { Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react";
import PageLoader from "../components/loader/MainLoader";
import Main from "../layout/main/index";
import AuthLayout from "../layout/auth-layout";
import Login from "../pages/authentication/Login";
import Signup from "../pages/authentication/Register";
import NotFound from "../pages/not-found/NotFound";
import NotificationPage from "../pages/NotificationPage/NotificationPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import ProfileEditPage from "../pages/ProfilePage/ProfileEditPage";
import UserRecordsPage from "../pages/userRecords/UserRecordsPage";

const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const ControlPanel = lazy(() => import("../pages/control-panel/ControlPanel"));
const Chart = lazy(() => import("../pages/chart/Chart"));
const Records = lazy(() => import("../pages/records/Records"));
const Settings = lazy(() => import("../pages/settings/Settings"));

const Router = () => {
  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route
            path="/"
            element={
              <Main>
                <Dashboard />
              </Main>} />
          {/* <Route
            path="/control-panel"
            element={
              <Main>
                <ControlPanel />
              </Main>
            } /> */}
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
            path="/userrecords"
            element={
              <Main>
                <UserRecordsPage />
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
            path="/notifications"
            element={
              <Main>
                <NotificationPage />
              </Main>
            } />

          <Route
            path="/profile"
            element={
              <Main>
                <ProfilePage />
              </Main>
            } />

          <Route
            path="/profile/edit"
            element={
              <Main>
                <ProfileEditPage />
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
            path="/register"
            element={
              <AuthLayout>
                <Signup />
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