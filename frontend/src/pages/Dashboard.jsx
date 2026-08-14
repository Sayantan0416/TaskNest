import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  CircleAlert,
  ListTodo,
  Plus,
} from "lucide-react";

import AddTaskModal from "../components/AddTaskModal";

import StatCard from "../components/StatCard";
import TaskCard from "../components/TaskCard";

import { getTasks } from "../services/api";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error(
          "Failed to load tasks:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  // ================================
  // STATISTICS
  // ================================

  const statistics = useMemo(() => {
    const total = tasks.length;

    const completed = tasks.filter(
      (task) => task.completed
    ).length;

    const pending = tasks.filter(
      (task) => !task.completed
    ).length;

    const overdue = tasks.filter((task) => {
      if (!task.due_date || task.completed) {
        return false;
      }

      return new Date(task.due_date) < new Date();
    }).length;

    return {
      total,
      completed,
      pending,
      overdue,
    };
  }, [tasks]);

  // ================================
  // UPCOMING TASKS
  // ================================

  const upcomingTasks = useMemo(() => {
    return [...tasks]
      .filter((task) => !task.completed)
      .sort((a, b) => {
        if (!a.due_date) return 1;
        if (!b.due_date) return -1;

        return (
          new Date(a.due_date) -
          new Date(b.due_date)
        );
      })
      .slice(0, 5);
  }, [tasks]);

  // ================================
  // COMPLETED TASKS
  // ================================

  const completedTasks = useMemo(() => {
    return [...tasks]
      .filter((task) => task.completed)
      .sort((a, b) => {
        return (
          new Date(b.created_at) -
          new Date(a.created_at)
        );
      })
      .slice(0, 5);
  }, [tasks]);

  const userName = user?.name || "User";

  // ================================
  // UPDATE TASK IN STATE
  // ================================

  const handleTaskUpdated = (updatedTask) => {
    setTasks((currentTasks) =>
      currentTasks.map((currentTask) =>
        currentTask.id === updatedTask.id
          ? updatedTask
          : currentTask
      )
    );
  };

  // ================================
  // DELETE TASK FROM STATE
  // ================================

  const handleTaskDeleted = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.filter(
        (currentTask) =>
          currentTask.id !== taskId
      )
    );
  };

  // ================================
  // NEW TASK CREATED
  // ================================

  const handleTaskCreated = (newTask) => {
    setTasks((currentTasks) => [
      newTask,
      ...currentTasks,
    ]);
  };

  return (
    <div className="dashboard-layout">
     

      <main className="dashboard">

        {/* ================================
            DASHBOARD HEADER
        ================================= */}

        <section className="dashboard-heading">
          <div>
            <p className="eyebrow">
              OVERVIEW
            </p>

            <h2>
              Good evening, {userName} 👋
            </h2>

            <p className="dashboard-subtitle">
              Stay organized and keep your
              priorities moving.
            </p>
          </div>

          <button
            className="primary-button"
            onClick={() =>
              setShowAddTask(true)
            }
          >
            <Plus size={18} />
            Add New Task
          </button>
        </section>

        {/* ================================
            STATISTICS
        ================================= */}

        <section className="stats-grid">
          <StatCard
            title="Total Tasks"
            value={statistics.total}
            description="Tasks in your workspace"
            icon={ListTodo}
          />

          <StatCard
            title="Pending"
            value={statistics.pending}
            description="Tasks waiting for you"
            icon={CircleAlert}
          />

          <StatCard
            title="Completed"
            value={statistics.completed}
            description="Tasks finished"
            icon={CheckCircle2}
          />

          <StatCard
            title="Overdue"
            value={statistics.overdue}
            description="Need your attention"
            icon={CircleAlert}
          />
        </section>

        {/* ================================
            UPCOMING TASKS
        ================================= */}

        <section className="tasks-section">

          <div className="section-heading">
            <div>
              <p className="eyebrow">
                YOUR WORK
              </p>

              <h2>
                Upcoming Tasks
              </h2>
            </div>

            <button className="text-button">
              View all
            </button>
          </div>

          <div className="task-list">

            {loading ? (
              <div className="empty-state">
                <p>
                  Loading your tasks...
                </p>
              </div>
            ) : upcomingTasks.length === 0 ? (
              <div className="empty-state">
                <ListTodo size={34} />

                <h3>
                  No upcoming tasks
                </h3>

                <p>
                  Your schedule is clear.
                  Add a task to get started.
                </p>
              </div>
            ) : (
              upcomingTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onTaskUpdated={
                    handleTaskUpdated
                  }
                  onTaskDeleted={
                    handleTaskDeleted
                  }
                />
              ))
            )}

          </div>
        </section>

        {/* ================================
            COMPLETED TASKS
        ================================= */}

        <section className="tasks-section completed-section">

          <div className="section-heading">
            <div>
              <p className="eyebrow">
                FINISHED
              </p>

              <h2>
                Completed Tasks
              </h2>
            </div>
          </div>

          <div className="task-list">

            {loading ? (
              <div className="empty-state">
                <p>
                  Loading completed tasks...
                </p>
              </div>
            ) : completedTasks.length === 0 ? (
              <div className="empty-state">
                <CheckCircle2 size={34} />

                <h3>
                  No completed tasks yet
                </h3>

                <p>
                  Complete a task and it
                  will appear here.
                </p>
              </div>
            ) : (
              completedTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onTaskUpdated={
                    handleTaskUpdated
                  }
                  onTaskDeleted={
                    handleTaskDeleted
                  }
                />
              ))
            )}

          </div>
        </section>

      </main>

      {/* ================================
          ADD TASK MODAL
      ================================= */}

      {showAddTask && (
        <AddTaskModal
          onClose={() =>
            setShowAddTask(false)
          }
          onTaskCreated={
            handleTaskCreated
          }
        />
      )}
    </div>
  );
}

export default Dashboard;