import { useEffect, useRef, useState } from "react";
import {
  Check,
  Clock3,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

import {
  updateTask,
  deleteTask,
} from "../services/api";

import EditTaskModal from "./EditTaskModal";

function TaskCard({
  task,
  onTaskUpdated,
  onTaskDeleted,
}) {
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const menuRef = useRef(null);

  const priorityClass = task.priority?.toLowerCase();

  /* =====================================================
     CLOSE MENU WHEN CLICKING OUTSIDE
     ===================================================== */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener(
        "mousedown",
        handleOutsideClick
      );
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, [showMenu]);


  /* =====================================================
     COMPLETE / UNCOMPLETE
     ===================================================== */

  const handleToggleComplete = async () => {
    if (updating) return;

    try {
      setUpdating(true);

      const updatedTask = await updateTask(
        task.id,
        {
          completed: !task.completed,
        }
      );

      onTaskUpdated?.(updatedTask);
    } catch (error) {
      console.error(
        "Failed to update task:",
        error
      );

      alert(
        error.response?.data?.detail ||
          "Failed to update task."
      );
    } finally {
      setUpdating(false);
    }
  };


  /* =====================================================
     DELETE
     ===================================================== */

  const handleDelete = async () => {
    if (deleting) return;

    const confirmed = window.confirm(
      `Delete "${task.title}"?`
    );

    if (!confirmed) {
      setShowMenu(false);
      return;
    }

    try {
      setDeleting(true);

      setShowMenu(false);

      await deleteTask(task.id);

      onTaskDeleted?.(task.id);
    } catch (error) {
      console.error(
        "Failed to delete task:",
        error
      );

      alert(
        error.response?.data?.detail ||
          "Failed to delete task."
      );
    } finally {
      setDeleting(false);
    }
  };


  /* =====================================================
     EDIT
     ===================================================== */

  const handleEdit = () => {
    setShowMenu(false);
    setShowEditModal(true);
  };


  return (
    <>
      <div
        className={`task-card ${
          task.completed
            ? "task-completed"
            : ""
        }`}
      >

        {/* CHECKBOX */}

        <button
          type="button"
          className={`task-check ${
            task.completed
              ? "checked"
              : ""
          }`}
          onClick={handleToggleComplete}
          disabled={updating}
          aria-label={
            task.completed
              ? "Mark task as pending"
              : "Mark task as completed"
          }
        >
          {task.completed && (
            <Check size={15} />
          )}
        </button>


        {/* TASK CONTENT */}

        <div className="task-content">

          <div className="task-title-row">

            <h3
              className={
                task.completed
                  ? "completed"
                  : ""
              }
            >
              {task.title}
            </h3>

            <span
              className={`priority-badge ${priorityClass}`}
            >
              {task.priority}
            </span>

          </div>


          {task.description && (
            <p>{task.description}</p>
          )}


          <div className="task-meta">

            <span>
              <Clock3 size={14} />

              {task.due_date
                ? new Date(
                    task.due_date
                  ).toLocaleString()
                : "No deadline"}
            </span>

          </div>

        </div>


        {/* MENU */}

        <div
          className="task-menu-wrapper"
          ref={menuRef}
        >

          <button
            type="button"
            className="task-menu"
            onClick={(event) => {
              event.stopPropagation();

              setShowMenu(
                (current) => !current
              );
            }}
            aria-label="Task options"
            aria-expanded={showMenu}
          >
            <MoreHorizontal size={19} />
          </button>


          {showMenu && (
            <div
              className="task-dropdown"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              <button
                type="button"
                className="task-dropdown-item"
                onClick={handleEdit}
              >
                <Pencil size={15} />
                <span>Edit Task</span>
              </button>


              <button
                type="button"
                className="task-dropdown-item danger"
                onClick={handleDelete}
                disabled={deleting}
              >
                <Trash2 size={15} />

                <span>
                  {deleting
                    ? "Deleting..."
                    : "Delete Task"}
                </span>
              </button>

            </div>
          )}

        </div>

      </div>


      {/* EDIT MODAL */}

      {showEditModal && (
        <EditTaskModal
          task={task}
          onClose={() =>
            setShowEditModal(false)
          }
          onTaskUpdated={(updatedTask) => {
            onTaskUpdated?.(updatedTask);

            setShowEditModal(false);
          }}
        />
      )}
    </>
  );
}

export default TaskCard;