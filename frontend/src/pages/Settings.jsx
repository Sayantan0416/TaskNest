
import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Palette,
  Bell,
  CheckCircle2,
  ListTodo,
  Save,
  RotateCcw,
  LogOut,
  Moon,
  Sun,
  Monitor,
  ShieldCheck,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Settings() {
  const { user, logout } = useAuth();

  const [settings, setSettings] = useState({
    displayName: user?.name || "User",
    email: user?.email || "",
    theme: localStorage.getItem("tasknest_theme") || "light",
    taskReminders:
      localStorage.getItem("tasknest_task_reminders") !== "false",
    completionNotifications:
      localStorage.getItem("tasknest_completion_notifications") !==
      "false",
    defaultPriority:
      localStorage.getItem("tasknest_default_priority") || "medium",
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("tasknest_theme") || "light";

    document.documentElement.setAttribute(
      "data-theme",
      savedTheme
    );
  }, []);

  const updateSetting = (key, value) => {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));

    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem(
      "tasknest_theme",
      settings.theme
    );

    localStorage.setItem(
      "tasknest_task_reminders",
      String(settings.taskReminders)
    );

    localStorage.setItem(
      "tasknest_completion_notifications",
      String(settings.completionNotifications)
    );

    localStorage.setItem(
      "tasknest_default_priority",
      settings.defaultPriority
    );

    document.documentElement.setAttribute(
      "data-theme",
      settings.theme
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const handleReset = () => {
    const defaultSettings = {
      displayName: user?.name || "User",
      email: user?.email || "",
      theme: "light",
      taskReminders: true,
      completionNotifications: true,
      defaultPriority: "medium",
    };

    setSettings(defaultSettings);

    localStorage.removeItem("tasknest_theme");
    localStorage.removeItem("tasknest_task_reminders");
    localStorage.removeItem(
      "tasknest_completion_notifications"
    );
    localStorage.removeItem(
      "tasknest_default_priority"
    );

    document.documentElement.setAttribute(
      "data-theme",
      "light"
    );

    setSaved(false);
  };

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmed) return;

    logout();
  };

  return (
    <main className="settings-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="settings-heading">
        <div>
          <p className="eyebrow">PREFERENCES</p>

          <h1>Settings</h1>

          <p className="dashboard-subtitle">
            Customize your TaskNest experience and manage
            your account preferences.
          </p>
        </div>

        <button
          type="button"
          className="primary-button settings-save-top"
          onClick={handleSave}
        >
          <Save size={17} />

          {saved ? "Saved!" : "Save Changes"}
        </button>
      </section>


      {/* =====================================================
          PROFILE
      ===================================================== */}

      <section className="settings-card">

        <div className="settings-card-header">
          <div className="settings-section-icon">
            <User size={19} />
          </div>

          <div>
            <h2>Profile</h2>

            <p>
              Manage your personal information.
            </p>
          </div>
        </div>

        <div className="settings-profile">

          <div className="settings-avatar">
            {(settings.displayName || "U")
              .charAt(0)
              .toUpperCase()}
          </div>

          <div className="settings-profile-info">
            <strong>
              {settings.displayName || "User"}
            </strong>

            <span>
              TaskNest account
            </span>
          </div>

        </div>

        <div className="settings-form-grid">

          <label className="settings-field">
            <span>Display Name</span>

            <div className="settings-input-wrapper">
              <User size={16} />

              <input
                type="text"
                value={settings.displayName}
                onChange={(event) =>
                  updateSetting(
                    "displayName",
                    event.target.value
                  )
                }
                placeholder="Your name"
              />
            </div>
          </label>


          <label className="settings-field">
            <span>Email Address</span>

            <div className="settings-input-wrapper disabled">
              <Mail size={16} />

              <input
                type="email"
                value={settings.email}
                disabled
                readOnly
              />
            </div>

            <small>
              Your email address is managed by your account.
            </small>
          </label>

        </div>

      </section>


      {/* =====================================================
          APPEARANCE
      ===================================================== */}

      <section className="settings-card">

        <div className="settings-card-header">
          <div className="settings-section-icon">
            <Palette size={19} />
          </div>

          <div>
            <h2>Appearance</h2>

            <p>
              Choose how TaskNest looks on your device.
            </p>
          </div>
        </div>

        <div className="theme-options">

          <button
            type="button"
            className={`theme-option ${
              settings.theme === "light"
                ? "active"
                : ""
            }`}
            onClick={() =>
              updateSetting("theme", "light")
            }
          >
            <div className="theme-preview light-preview">
              <Sun size={20} />
            </div>

            <div>
              <strong>Light</strong>

              <span>
                Clean and bright
              </span>
            </div>

            {settings.theme === "light" && (
              <CheckCircle2 size={18} />
            )}
          </button>


          <button
            type="button"
            className={`theme-option ${
              settings.theme === "dark"
                ? "active"
                : ""
            }`}
            onClick={() =>
              updateSetting("theme", "dark")
            }
          >
            <div className="theme-preview dark-preview">
              <Moon size={20} />
            </div>

            <div>
              <strong>Dark</strong>

              <span>
                Easy on the eyes
              </span>
            </div>

            {settings.theme === "dark" && (
              <CheckCircle2 size={18} />
            )}
          </button>


          <button
            type="button"
            className={`theme-option ${
              settings.theme === "system"
                ? "active"
                : ""
            }`}
            onClick={() =>
              updateSetting("theme", "system")
            }
          >
            <div className="theme-preview system-preview">
              <Monitor size={20} />
            </div>

            <div>
              <strong>System</strong>

              <span>
                Follow device settings
              </span>
            </div>

            {settings.theme === "system" && (
              <CheckCircle2 size={18} />
            )}
          </button>

        </div>

      </section>


      {/* =====================================================
          NOTIFICATIONS
      ===================================================== */}

      <section className="settings-card">

        <div className="settings-card-header">
          <div className="settings-section-icon">
            <Bell size={19} />
          </div>

          <div>
            <h2>Notifications</h2>

            <p>
              Control how TaskNest keeps you informed.
            </p>
          </div>
        </div>


        <div className="settings-option-list">

          <div className="settings-option">

            <div className="settings-option-icon">
              <Bell size={17} />
            </div>

            <div className="settings-option-content">
              <strong>Task reminders</strong>

              <span>
                Get reminders about upcoming deadlines.
              </span>
            </div>

            <button
              type="button"
              className={`settings-toggle ${
                settings.taskReminders
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                updateSetting(
                  "taskReminders",
                  !settings.taskReminders
                )
              }
              aria-label="Toggle task reminders"
            >
              <span />
            </button>

          </div>


          <div className="settings-option">

            <div className="settings-option-icon success">
              <CheckCircle2 size={17} />
            </div>

            <div className="settings-option-content">
              <strong>Completion notifications</strong>

              <span>
                Show notifications when tasks are completed.
              </span>
            </div>

            <button
              type="button"
              className={`settings-toggle ${
                settings.completionNotifications
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                updateSetting(
                  "completionNotifications",
                  !settings.completionNotifications
                )
              }
              aria-label="Toggle completion notifications"
            >
              <span />
            </button>

          </div>

        </div>

      </section>


      {/* =====================================================
          TASK PREFERENCES
      ===================================================== */}

      <section className="settings-card">

        <div className="settings-card-header">
          <div className="settings-section-icon">
            <ListTodo size={19} />
          </div>

          <div>
            <h2>Task Preferences</h2>

            <p>
              Configure your default task behavior.
            </p>
          </div>
        </div>


        <div className="settings-form-grid single">

          <label className="settings-field">

            <span>
              Default Task Priority
            </span>

            <select
              value={settings.defaultPriority}
              onChange={(event) =>
                updateSetting(
                  "defaultPriority",
                  event.target.value
                )
              }
            >
              <option value="low">
                Low Priority
              </option>

              <option value="medium">
                Medium Priority
              </option>

              <option value="high">
                High Priority
              </option>
            </select>

            <small>
              New tasks can use this priority as their default.
            </small>

          </label>

        </div>

      </section>


      {/* =====================================================
          ACCOUNT SECURITY
      ===================================================== */}

      <section className="settings-card security-card">

        <div className="settings-card-header">
          <div className="settings-section-icon security">
            <ShieldCheck size={19} />
          </div>

          <div>
            <h2>Account</h2>

            <p>
              Manage your current TaskNest session.
            </p>
          </div>
        </div>


        <div className="settings-account-actions">

          <div>
            <strong>
              Sign out of TaskNest
            </strong>

            <span>
              You can sign back in anytime using your account.
            </span>
          </div>

          <button
            type="button"
            className="settings-logout-button"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Logout
          </button>

        </div>

      </section>


      {/* =====================================================
          BOTTOM ACTIONS
      ===================================================== */}

      <section className="settings-bottom-actions">

        <button
          type="button"
          className="secondary-button"
          onClick={handleReset}
        >
          <RotateCcw size={16} />
          Reset Settings
        </button>

        <button
          type="button"
          className="primary-button"
          onClick={handleSave}
        >
          <Save size={16} />

          {saved
            ? "Changes Saved"
            : "Save Changes"}
        </button>

      </section>

    </main>
  );
}

export default Settings;

