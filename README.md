# 🚀 TaskNest — Smart Task & Productivity Manager

TaskNest is a modern full-stack task management and productivity application designed to help users organize tasks, manage deadlines, track progress, and personalize their productivity experience through a clean and responsive interface.

The application provides authentication, task management, calendar-based scheduling, task priorities, completion tracking, and customizable settings.

---

## ✨ Features

### 🔐 Authentication

* User registration
* User login
* JWT-based authentication
* Protected application pages
* Current-user authentication
* Logout functionality

### 📊 Dashboard

* Overview of task activity
* Task statistics
* Pending and completed task tracking
* Quick access to tasks
* Modern productivity-focused dashboard

### ✅ Task Management

* Create new tasks
* Edit existing tasks
* Delete tasks
* Mark tasks as completed
* Restore completed tasks to pending
* Task descriptions
* Due dates
* Priority levels
* High / Medium / Low priority indicators

### 📅 Calendar

* Monthly calendar interface
* Previous/next month navigation
* Today shortcut
* Tasks displayed according to due dates
* Selected-date task details
* Completed task indicators
* Task count for each date
* Upcoming deadline visibility

### ⚙️ Settings

* Profile information
* Display name customization
* Light theme
* Dark theme
* System theme
* Task reminder preferences
* Completion notification preferences
* Default task priority
* Save settings
* Reset settings
* Logout

### 🎨 Modern UI/UX

* Responsive design
* Premium dashboard interface
* Interactive navigation
* Smooth hover effects
* Modal-based task editing
* Dropdown task actions
* Responsive calendar
* Mobile-friendly layouts
* Loading states
* Empty states
* Visual task priority indicators

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* JavaScript
* CSS
* Lucide React
* Axios

### Backend

* Python
* FastAPI
* SQLAlchemy
* SQLite
* JWT Authentication
* bcrypt

### Development Tools

* Git
* GitHub
* VS Code
* npm
* Python Virtual Environment

### Deployment

* Render

---

## 🏗️ Project Architecture

```text
TaskNest/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AppLayout.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   └── ...
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── MyTasks.jsx
│   │   │   ├── Calendar.jsx
│   │   │   ├── Settings.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── database.py
│   │   ├── schemas.py
│   │   └── ...
│   │
│   ├── requirements.txt
│   └── tasknest.db
│
└── README.md
```

---

## 🔑 Authentication Flow

TaskNest uses token-based authentication.

The authentication flow is:

```text
User
 │
 ▼
Register / Login
 │
 ▼
FastAPI Authentication API
 │
 ▼
JWT Token
 │
 ▼
Frontend localStorage
 │
 ▼
Authenticated API Requests
 │
 ▼
Protected Task Data
```

The frontend stores the authentication token and uses it when communicating with protected backend endpoints.

---

## 🔌 API Structure

The backend provides REST API endpoints for authentication and task management.

### Authentication

```text
POST /auth/register
POST /auth/login
GET  /auth/me
```

### Tasks

```text
GET    /tasks/
POST   /tasks/
PUT    /tasks/{task_id}
DELETE /tasks/{task_id}
```

The API is built using FastAPI and communicates with the SQLite database through SQLAlchemy.

---

## 🗄️ Database

TaskNest currently uses:

```text
SQLite
```

The database file is:

```text
tasknest.db
```

SQLAlchemy is used as the ORM layer for database interaction.

---

## 🎯 Task Priority System

Tasks support three priority levels:

| Priority  | Purpose                   |
| --------- | ------------------------- |
| 🔴 High   | Important or urgent tasks |
| 🟠 Medium | Normal priority tasks     |
| 🔵 Low    | Lower-priority tasks      |

Priority indicators are displayed throughout the application.

---

## 📅 Calendar System

The Calendar page automatically organizes tasks according to their due dates.

Users can:

* Navigate between months
* Return to today
* Select individual dates
* View tasks scheduled for a date
* See task completion status
* View task priority
* View task descriptions

This provides a visual overview of upcoming deadlines.

---

## ⚙️ User Preferences

TaskNest allows users to customize their experience.

Available preferences include:

```text
Theme
 ├── Light
 ├── Dark
 └── System

Notifications
 ├── Task reminders
 └── Completion notifications

Task Preferences
 └── Default task priority
```

Preferences are persisted using browser local storage.

---

## 📱 Responsive Design

TaskNest is designed to work across different screen sizes.

Supported layouts include:

* Desktop
* Laptop
* Tablet
* Mobile

The interface automatically adapts navigation, cards, forms, calendar layouts, and dashboard components according to screen size.

---

## 🔒 Security

The application includes:

* JWT-based authentication
* Password hashing with bcrypt
* Protected API routes
* Authenticated task access
* CORS configuration
* Client-side authentication state management

---

## 🚀 Deployment

TaskNest is designed to be deployed as two services:

```text
                ┌─────────────────────┐
                │      Frontend       │
                │   React + Vite      │
                └──────────┬──────────┘
                           │
                           │ API Requests
                           ▼
                ┌─────────────────────┐
                │       Backend       │
                │ FastAPI + SQLAlchemy│
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │       SQLite        │
                │      Database       │
                └─────────────────────┘
```

The frontend and backend can be deployed separately using Render.

---

## 🔮 Future Improvements

Potential future enhancements include:

* Drag-and-drop task management
* Recurring tasks
* Email reminders
* Push notifications
* Advanced analytics
* Productivity charts
* Team collaboration
* Task categories
* Search and filtering improvements
* Dark-mode refinement
* Cloud database integration
* File attachments
* Task sharing
* AI-powered productivity recommendations

---

## 👨‍💻 Project Information

**Project:** TaskNest
**Type:** Full-Stack Task Management Application
**Internship:** CODETECH
**InternID:** CITS8288

---

## 📌 Project Status

```text
Authentication       ✅
Dashboard            ✅
Task Management      ✅
Task Editing         ✅
Task Deletion        ✅
Task Completion      ✅
Calendar             ✅
Settings             ✅
Responsive UI        ✅
Backend API          ✅
Database             ✅
Deployment           🚀 In Progress
```

---

## ⭐ Acknowledgement

TaskNest was developed as part of the CODETECH software development internship to demonstrate practical full-stack application development, REST API integration, authentication, database management, responsive UI/UX design, and deployment.

---

## 📄 License

This project was developed for educational and internship purposes.
