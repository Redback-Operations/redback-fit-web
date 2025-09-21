import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserSettingsProvider } from "./context/UserSettingsContext";
import { AuthProvider } from "./providers/AuthProvider";

import Root from "./routes/Root/Root";
import LoginPage from "./routes/LoginPage/LoginPage";
import Dashboard from "./routes/Dashboard/Dashboard";
import ReportPage from "./routes/ReportPage/ReportPage";
import NotificationsPage from "./routes/NotificationsPage/NotificationsPage";
import HomePage from "./routes/HomePage/HomePage";

import DataPredictions from "./components/DashboardDataPredictions/DashboardDataPredictions";
import DashboardLanding from "./components/DashboardLanding/DashboardLanding";
import ProfilePage from "./routes/ProfilePage/ProfilePage";
import Categories from "./components/Categories/Categories";
import ReportPageContent from "./components/Report/Report";
import NotificationsPageContent from "./components/Notifications/Notifications";
import Features from "./components/Features/Features";
import SettingsPage from "./components/Settings/Settings";
import Goals from "./components/Goals/Goals";
import CustomNotification from "./components/CustomNotification/CustomNotification";
import WeeklySummary from "./components/WeeklySummary/WeeklySummary";
import MyFriendsPage from "./components/FriendRequest/MyFriendsPage";
import RecoveryTracker from "./components/RecoveryTracker/RecoveryTracker";

const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <Root />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "profile", element: <ProfilePage /> },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          { path: "", element: <DashboardLanding /> },
          { path: "data-predictions", element: <DataPredictions /> },
          { path: "categories", element: <Categories /> },
          { path: "features", element: <Features /> },
          { path: "goals", element: <Goals /> },
          { path: "custom-notification", element: <CustomNotification /> },
          { path: "settings", element: <SettingsPage /> },
          { path: "recovery-tracker", element: <RecoveryTracker /> },
          { path: "weekly-summary", element: <WeeklySummary /> },
          { path: "my-friends", element: <MyFriendsPage /> },
        ],
      },
      {
        path: "reports",
        element: <ReportPage />,
        children: [{ path: "", element: <ReportPageContent /> }],
      },
      {
        path: "notifications",
        element: <NotificationsPage />,
        children: [{ path: "", element: <NotificationsPageContent /> }],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserSettingsProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </UserSettingsProvider>
  </React.StrictMode>
);
