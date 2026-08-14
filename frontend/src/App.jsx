import { useState } from "react";

import { useAuth } from "./context/AuthContext";
import Calendar from "./pages/Calendar";
import "./App.css";

import Dashboard from "./pages/Dashboard";
import MyTasks from "./pages/MyTasks";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AppLayout from "./components/AppLayout";
import Settings from "./pages/Settings";

function App() {
  const { user, loading } = useAuth();

  const [showRegister, setShowRegister] =
    useState(false);

  const [activePage, setActivePage] =
    useState("dashboard");

  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner"></div>
        <p>Loading TaskNest...</p>
      </div>
    );
  }

  if (!user) {
    if (showRegister) {
      return (
        <Register
          onSwitchToLogin={() =>
            setShowRegister(false)
          }
        />
      );
    }

    return (
      <Login
        onSwitchToRegister={() =>
          setShowRegister(true)
        }
      />
    );
  }

  let page;

  switch (activePage) {
    case "tasks":
      page = <MyTasks />;
      break;

   case "calendar":
  page = <Calendar />;
  break;

    case "settings":
  page = <Settings />;
  break;
    case "dashboard":
    default:
      page = <Dashboard />;
      break;
  }

  return (
    <AppLayout
      activePage={activePage}
      onNavigate={setActivePage}
    >
      {page}
    </AppLayout>
  );
}

export default App;