
import { useEffect, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Clock3,
  CheckCircle2,
} from "lucide-react";

import { getTasks } from "../services/api";

function Calendar() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentDate, setCurrentDate] = useState(
    new Date()
  );

  const [selectedDate, setSelectedDate] = useState(
    new Date()
  );

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error(
          "Failed to load calendar tasks:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  /* =====================================================
     MONTH INFORMATION
     ===================================================== */

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString(
    "default",
    {
      month: "long",
    }
  );

  const firstDay = new Date(
    year,
    month,
    1
  ).getDay();

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  /* =====================================================
     CALENDAR DAYS
     ===================================================== */

  const calendarDays = useMemo(() => {
    const days = [];

    const previousMonthDays = new Date(
      year,
      month,
      0
    ).getDate();

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: previousMonthDays - i,
        currentMonth: false,
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: day,
        currentMonth: true,
      });
    }

    let nextDay = 1;

    while (days.length < 42) {
      days.push({
        date: nextDay,
        currentMonth: false,
      });

      nextDay++;
    }

    return days;
  }, [
    year,
    month,
    firstDay,
    daysInMonth,
  ]);

  /* =====================================================
     DATE HELPERS
     ===================================================== */

  const isSameDate = (dateA, dateB) => {
    return (
      dateA.getFullYear() ===
        dateB.getFullYear() &&
      dateA.getMonth() ===
        dateB.getMonth() &&
      dateA.getDate() ===
        dateB.getDate()
    );
  };

  const getTasksForDate = (day, isCurrentMonth) => {
    if (!isCurrentMonth) {
      return [];
    }

    return tasks.filter((task) => {
      if (!task.due_date) {
        return false;
      }

      const taskDate = new Date(task.due_date);

      return (
        taskDate.getFullYear() === year &&
        taskDate.getMonth() === month &&
        taskDate.getDate() === day
      );
    });
  };

  const today = new Date();

  /* =====================================================
     SELECTED DAY TASKS
     ===================================================== */

  const selectedDayTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (!task.due_date) {
        return false;
      }

      return isSameDate(
        new Date(task.due_date),
        selectedDate
      );
    });
  }, [tasks, selectedDate]);

  /* =====================================================
     MONTH NAVIGATION
     ===================================================== */

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(year, month - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(year, month + 1, 1)
    );
  };

  const goToToday = () => {
    const todayDate = new Date();

    setCurrentDate(todayDate);
    setSelectedDate(todayDate);
  };

  /* =====================================================
     RENDER
     ===================================================== */

  return (
    <main className="calendar-page">

      {/* PAGE HEADER */}

      <section className="calendar-heading">

        <div>
          <p className="eyebrow">
            PRODUCTIVITY
          </p>

          <h1>Calendar</h1>

          <p className="dashboard-subtitle">
            Organize your tasks and deadlines
            across your schedule.
          </p>
        </div>

        <button
          className="secondary-button calendar-today-button"
          onClick={goToToday}
        >
          <CalendarDays size={17} />
          Today
        </button>

      </section>


      {/* CALENDAR CARD */}

      <section className="calendar-card">

        {/* CALENDAR TOOLBAR */}

        <div className="calendar-toolbar">

          <div className="calendar-month-title">

            <h2>
              {monthName} {year}
            </h2>

            <span>
              {tasks.length} total tasks
            </span>

          </div>


          <div className="calendar-navigation">

            <button
              type="button"
              onClick={goToPreviousMonth}
              aria-label="Previous month"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              onClick={goToNextMonth}
              aria-label="Next month"
            >
              <ChevronRight size={18} />
            </button>

          </div>

        </div>


        {/* WEEK DAYS */}

        <div className="calendar-weekdays">

          {[
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
          ].map((day) => (
            <div key={day}>
              {day}
            </div>
          ))}

        </div>


        {/* CALENDAR GRID */}

        <div className="calendar-grid">

          {calendarDays.map(
            (calendarDay, index) => {

              const tasksForDay =
                getTasksForDate(
                  calendarDay.date,
                  calendarDay.currentMonth
                );

              const dayDate = new Date(
                year,
                month,
                calendarDay.date
              );

              const isToday =
                calendarDay.currentMonth &&
                isSameDate(
                  dayDate,
                  today
                );

              const isSelected =
                calendarDay.currentMonth &&
                isSameDate(
                  dayDate,
                  selectedDate
                );

              return (
                <button
                  type="button"
                  key={index}
                  className={`calendar-day ${
                    !calendarDay.currentMonth
                      ? "muted"
                      : ""
                  } ${
                    isToday
                      ? "today"
                      : ""
                  } ${
                    isSelected
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => {

                    if (
                      !calendarDay.currentMonth
                    ) {
                      return;
                    }

                    setSelectedDate(
                      dayDate
                    );
                  }}
                >

                  <span className="calendar-day-number">
                    {calendarDay.date}
                  </span>


                  {/* TASK PREVIEWS */}

                  <div className="calendar-task-list">

                    {tasksForDay
                      .slice(0, 3)
                      .map((task) => (
                        <span
                          key={task.id}
                          className={`calendar-task ${
                            task.completed
                              ? "completed"
                              : ""
                          }`}
                        >
                          <span className="calendar-task-dot" />

                          <span>
                            {task.title}
                          </span>
                        </span>
                      ))}


                    {tasksForDay.length > 3 && (
                      <span className="calendar-more">
                        +{tasksForDay.length - 3} more
                      </span>
                    )}

                  </div>

                </button>
              );
            }
          )}

        </div>

      </section>


      {/* SELECTED DATE */}

      <section className="calendar-selected-section">

        <div className="calendar-selected-header">

          <div>

            <p className="eyebrow">
              SELECTED DATE
            </p>

            <h2>
              {selectedDate.toLocaleDateString(
                "default",
                {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }
              )}
            </h2>

          </div>

          <span className="task-count">
            {selectedDayTasks.length}{" "}
            {selectedDayTasks.length === 1
              ? "task"
              : "tasks"}
          </span>

        </div>


        <div className="calendar-selected-tasks">

          {loading ? (
            <div className="empty-state">
              <p>
                Loading your calendar...
              </p>
            </div>
          ) : selectedDayTasks.length === 0 ? (
            <div className="empty-state">
              <CalendarDays size={34} />

              <h3>
                No tasks scheduled
              </h3>

              <p>
                There are no tasks due on
                this date.
              </p>
            </div>
          ) : (
            selectedDayTasks.map((task) => (
              <div
                className={`calendar-task-detail ${
                  task.completed
                    ? "completed"
                    : ""
                }`}
                key={task.id}
              >

                <div className="calendar-detail-icon">

                  {task.completed ? (
                    <CheckCircle2
                      size={18}
                    />
                  ) : (
                    <Clock3 size={18} />
                  )}

                </div>


                <div className="calendar-detail-content">

                  <h3>
                    {task.title}
                  </h3>

                  {task.description && (
                    <p>
                      {task.description}
                    </p>
                  )}

                  <span>
                    {task.priority} priority
                  </span>

                </div>

              </div>
            ))
          )}

        </div>

      </section>

    </main>
  );
}

export default Calendar;

