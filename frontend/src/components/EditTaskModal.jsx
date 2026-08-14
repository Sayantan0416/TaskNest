import { useState } from "react";
import { CalendarDays, X } from "lucide-react";
import { updateTask } from "../services/api";

function EditTaskModal({
  task,
  onClose,
  onTaskUpdated,
}) {
  const [form, setForm] = useState({
    title: task.title || "",
    description: task.description || "",
    priority: task.priority || "medium",
    due_date: task.due_date
      ? new Date(task.due_date)
          .toISOString()
          .slice(0, 16)
      : "",
    completed: task.completed || false,
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      alert("Task title is required.");
      return;
    }

    try {
      setSaving(true);

      const updatedTask = await updateTask(
        task.id,
        {
          title: form.title.trim(),
          description:
            form.description.trim() || null,
          priority: form.priority,
          due_date: form.due_date || null,
          completed: form.completed,
        }
      );

      onTaskUpdated?.(updatedTask);
      onClose();
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
      setSaving(false);
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={() =>
        !saving && onClose()
      }
    >
      <div
        className="edit-modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <div className="edit-modal-header">
          <div>
            <p className="eyebrow">
              TASK MANAGEMENT
            </p>

            <h2>Edit Task</h2>

            <p>
              Update the details of your task.
            </p>
          </div>

          <button
            type="button"
            className="modal-close"
            onClick={() =>
              !saving && onClose()
            }
            aria-label="Close"
          >
            <X size={19} />
          </button>
        </div>

        <form
          className="edit-form"
          onSubmit={handleSubmit}
        >
          <label>
            Task title

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Description

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              placeholder="Add task details..."
            />
          </label>

          <div className="edit-form-row">
            <label>
              Priority

              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
              >
                <option value="low">
                  Low
                </option>

                <option value="medium">
                  Medium
                </option>

                <option value="high">
                  High
                </option>
              </select>
            </label>

            <label>
              Due date

              <div className="date-input-wrapper">
                <CalendarDays size={15} />

                <input
                  type="datetime-local"
                  name="due_date"
                  value={form.due_date}
                  onChange={handleChange}
                />
              </div>
            </label>
          </div>

          <label className="completed-toggle">
            <input
              type="checkbox"
              checked={form.completed}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  completed:
                    event.target.checked,
                }))
              }
            />

            <span>
              Mark task as completed
            </span>
          </label>

          <div className="edit-modal-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() =>
                !saving && onClose()
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTaskModal;