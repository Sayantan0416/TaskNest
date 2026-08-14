import { useState } from "react";
import { CalendarDays, X } from "lucide-react";
import { createTask } from "../services/api";

function AddTaskModal({ onClose, onTaskCreated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    due_date: "",
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

      const newTask = await createTask({
        title: form.title.trim(),
        description:
          form.description.trim() || null,
        priority: form.priority,
        due_date: form.due_date || null,
      });

      onTaskCreated?.(newTask);
      onClose();
    } catch (error) {
      console.error(
        "Failed to create task:",
        error
      );

      alert(
        error.response?.data?.detail ||
          "Failed to create task."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={() => !saving && onClose()}
    >
      <div
        className="edit-modal add-task-modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <div className="edit-modal-header">
          <div>
            <p className="eyebrow">
              TASK MANAGEMENT
            </p>

            <h2>Add New Task</h2>

            <p>
              Create a task and keep your work moving.
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
              placeholder="e.g. Complete TaskNest project"
              autoFocus
              required
            />
          </label>

          <label>
            Description

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Add some details about this task..."
              rows="4"
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
                ? "Creating..."
                : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTaskModal;