import { Navigate } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import MainLayout from "./components/MainLayout";
import Account from "./pages/Account";
import UsersList from "./pages/UsersList";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ReportList from "./pages/ReportList";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import AddUser from "./pages/AddUser";
import Live from "./pages/Live";

const routes = [
  {
    path: "app",
    element: <DashboardLayout />,
    children: [
      { path: "account", element: <Account /> },
      { path: "users", element: <UsersList /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "reports", element: <ReportList /> },
      { path: "settings", element: <Settings /> },
      { path: "adduser", element: <AddUser /> },
      { path: "live", element: <Live /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "404", element: <NotFound /> },
      { path: "/", element: <Navigate to="/login" /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
];

export default routes;
