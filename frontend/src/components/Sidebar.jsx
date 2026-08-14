import {
  LayoutDashboard,
  ListTodo,
  CalendarDays,
  Settings,
  LogOut,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Sidebar({ activePage, onNavigate }) {
  const { logout } = useAuth();

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "tasks",
      label: "My Tasks",
      icon: ListTodo,
    },
    {
      id: "calendar",
      label: "Calendar",
      icon: CalendarDays,
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          T
        </div>

        <div>
          <h1>TaskNest</h1>
          <span>Productivity</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <p className="sidebar-label">
          WORKSPACE
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              className={`sidebar-item ${
                activePage === item.id
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                onNavigate(item.id)
              }
            >
              <Icon size={19} />

              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <button
          type="button"
          className="sidebar-item logout-button"
          onClick={logout}
        >
          <LogOut size={19} />

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;