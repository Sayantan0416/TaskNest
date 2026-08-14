import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  CircleAlert,
  ListTodo,
  Plus,
  Search,
} from "lucide-react";

import { getTasks } from "../services/api";
import TaskCard from "../components/TaskCard";
import AddTaskModal from "../components/AddTaskModal";

function MyTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("all");

  const [showAddTask, setShowAddTask] =
    useState(false);

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

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Status filter
      if (
        filter === "pending" &&
        task.completed
      ) {
        return false;
      }

      if (
        filter === "completed" &&
        !task.completed
      ) {
        return false;
      }

      if (filter === "overdue") {
        if (
          task.completed ||
          !task.due_date ||
          new Date(task.due_date) >= new Date()
        ) {
          return false;
        }
      }

      // Search
      const searchText = search
        .trim()
        .toLowerCase();

      if (searchText) {
        const matchesTitle =
          task.title
            ?.toLowerCase()
            .includes(searchText);

        const matchesDescription =
          task.description
            ?.toLowerCase()
            .includes(searchText);

        if (
          !matchesTitle &&
          !matchesDescription
        ) {
          return false;
        }
      }

      // Priority
      if (
        priority !== "all" &&
        task.priority?.toLowerCase() !==
          priority
      ) {
        return false;
      }

      return true;
    });
  }, [tasks, filter, search, priority]);

  const handleTaskUpdated = (updatedTask) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === updatedTask.id
          ? updatedTask
          : task
      )
    );
  };

  const handleTaskDeleted = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.filter(
        (task) => task.id !== taskId
      )
    );
  };

  return (
    <div className="dashboard-layout">
    

      <main className="my-tasks-page">
        <section className="my-tasks-heading">
          <div>
            <p className="eyebrow">
              TASK MANAGEMENT
            </p>

            <h1>My Tasks</h1>

            <p className="dashboard-subtitle">
              Manage your work, priorities and
              deadlines in one place.
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

        <section className="task-stat-grid">
          <button
            className={`task-stat ${
              filter === "all"
                ? "active"
                : ""
            }`}
            onClick={() => setFilter("all")}
          >
            <ListTodo size={20} />

            <div>
              <strong>
                {statistics.total}
              </strong>

              <span>All Tasks</span>
            </div>
          </button>

          <button
            className={`task-stat ${
              filter === "pending"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setFilter("pending")
            }
          >
            <CircleAlert size={20} />

            <div>
              <strong>
                {statistics.pending}
              </strong>

              <span>Pending</span>
            </div>
          </button>

          <button
            className={`task-stat ${
              filter === "completed"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setFilter("completed")
            }
          >
            <CheckCircle2 size={20} />

            <div>
              <strong>
                {statistics.completed}
              </strong>

              <span>Completed</span>
            </div>
          </button>

          <button
            className={`task-stat ${
              filter === "overdue"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setFilter("overdue")
            }
          >
            <CircleAlert size={20} />

            <div>
              <strong>
                {statistics.overdue}
              </strong>

              <span>Overdue</span>
            </div>
          </button>
        </section>

        <section className="task-controls">
          <div className="task-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          <select
            value={priority}
            onChange={(event) =>
              setPriority(event.target.value)
            }
          >
            <option value="all">
              All priorities
            </option>

            <option value="high">
              High priority
            </option>

            <option value="medium">
              Medium priority
            </option>

            <option value="low">
              Low priority
            </option>
          </select>
        </section>

        <section className="my-tasks-list">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                YOUR WORKSPACE
              </p>

              <h2>
                {filter === "all"
                  ? "All Tasks"
                  : filter === "pending"
                  ? "Pending Tasks"
                  : filter === "completed"
                  ? "Completed Tasks"
                  : "Overdue Tasks"}
              </h2>
            </div>

            <span className="task-count">
              {filteredTasks.length}{" "}
              {filteredTasks.length === 1
                ? "task"
                : "tasks"}
            </span>
          </div>

          <div className="task-list">
            {loading ? (
              <div className="empty-state">
                <p>
                  Loading your tasks...
                </p>
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="empty-state">
                <ListTodo size={36} />

                <h3>
                  No tasks found
                </h3>

                <p>
                  Try changing your filters
                  or create a new task.
                </p>

                <button
                  className="primary-button"
                  onClick={() =>
                    setShowAddTask(true)
                  }
                >
                  <Plus size={17} />
                  Create Task
                </button>
              </div>
            ) : (
              filteredTasks.map((task) => (
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

      {showAddTask && (
        <AddTaskModal
          onClose={() =>
            setShowAddTask(false)
          }
          onTaskCreated={(newTask) => {
            setTasks((currentTasks) => [
              newTask,
              ...currentTasks,
            ]);

            setShowAddTask(false);
          }}
        />
      )}
    </div>
  );
}

export default MyTasks;