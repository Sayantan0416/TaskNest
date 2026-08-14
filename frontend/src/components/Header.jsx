import {
  Bell,
  Search,
  LogOut,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Header() {
  const { user, logout } = useAuth();

  const userName = user?.name || "User";
  const avatarLetter = userName.charAt(0).toUpperCase();

  return (
    <header className="topbar">
      <div className="topbar-search">
        <Search size={18} />

        <input
          type="text"
          placeholder="Search tasks..."
        />
      </div>

      <div className="topbar-actions">

        <button
          className="icon-button"
          type="button"
        >
          <Bell size={19} />
          <span className="notification-dot" />
        </button>

        <div className="profile">

          <div className="profile-avatar">
            {avatarLetter}
          </div>

          <div className="profile-info">
            <strong>{userName}</strong>
            <span>Productivity Mode</span>
          </div>

          <button
            type="button"
            className="logout-button"
            onClick={logout}
          >
            <LogOut size={17} />
            <span>Logout</span>
          </button>

        </div>
      </div>
    </header>
  );
}

export default Header;