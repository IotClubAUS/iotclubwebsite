'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { team } from '@/lib/team';

type EventType =
  | 'Club'
  | 'Workshop'
  | 'Meeting'
  | 'Competition'
  | 'Social'
  | 'Deadline'
  | 'Other';

type CalendarEvent = {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  description?: string;
  type: EventType;
};

type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done';

type Task = {
  id: string;
  title: string;
  category: string;
  assigneeId?: string | null;
  dueDate?: string | null;
  points?: number | null;
  priority?: string | null;
  status: TaskStatus;
  checklist?: {
    id: string;
    title: string;
    completed: boolean;
  }[];
};

type Member = {
  id: string;
  name: string;
  role?: string;
  committeeCategory?: string;
  avatar?: string;
};

/* =========================================================
   EVENTS
   ========================================================= */

const EVENTS: CalendarEvent[] = [
  {
    id: 'club-fair',
    title: 'IoT Club Fair',
    date: '2026-09-15',
    endDate: '2026-09-16',
    startTime: '10:00',
    endTime: '16:00',
    location: 'Main Building Rotunda',
    description:
      'Come visit the IoT Club booth for interactive challenges, robots, trivia, prizes, and more.',
    type: 'Club',
  },
  
  {
    id: 'Besomi TinyML workshop',
    title: 'Besomi TinyML workshop Workshop',
    date: '2026-10-05',
    startTime: '17:00',
    endTime: '19:00',
    location: 'TBD',
    description: 'Hands-on IoT workshop for club members.',
    type: 'Workshop',
  },
  {
    id: 'carnival-1',
    title: 'CARNIVAL',
    date: '2026-11-18',
    startTime: '15:00',
    endTime: '19:00',
    location: 'Football Field',
    description: 'Media planning, content creation, and upcoming campaigns.',
    type: 'Social',
  },
  {
    id: 'carnival-2',
    title: 'CARNIVAL',
    date: '2026-11-19',
    startTime: '15:00',
    endTime: '19:00',
    location: 'Football Field',
    description: 'Media planning, content creation, and upcoming campaigns.',
    type: 'Social',
  },
  
  
];

/* =========================================================
   BLACKOUT DATES
   =========================================================
   Add any dates here that should be shown in RED.

   Format:
   YYYY-MM-DD

   You can add as many as you want.
   ========================================================= */

const BLACKOUT_DATES = [
  {
    date: '2026-11-24',
    title: 'NO CLUB ACTIVITIES',
  },
  {
    date: '2026-11-25',
    title: 'NO CLUB ACTIVITIES',
  },
  {
    date: '2026-11-26',
    title: 'NO CLUB ACTIVITIES',
  },
   {
    date: '2026-11-27',
    title: 'NO CLUB ACTIVITIES',
  },
   {
    date: '2026-11-28',
    title: 'NO CLUB ACTIVITIES',
  },
   {
    date: '2026-11-29',
    title: 'NO CLUB ACTIVITIES',
  },
   {
    date: '2026-11-26',
    title: 'NO CLUB ACTIVITIES',
  },
  {
    date: '2026-10-06',
    title: 'NO CLUB ACTIVITIES',
  },
  {
    date: '2026-10-13',
    title: 'NO CLUB ACTIVITIES',
  },
  {
    date: '2026-10-22',
    title: 'NO CLUB ACTIVITIES',
  },
  
  {
    date: '2026-10-14',
    title: 'NO CLUB ACTIVITIES',
  },
];

/* =========================================================
   HELPERS
   ========================================================= */

function getDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function getTodayKey() {
  return getDateKey(new Date());
}

function getBlackoutDate(dateKey: string) {
  return BLACKOUT_DATES.find(
    (blackout) => blackout.date === dateKey
  );
}

function formatDate(dateString?: string | null) {
  if (!dateString) return 'No date';

  const date = new Date(`${dateString}T00:00:00`);

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatTime(time?: string | null) {
  if (!time) return '';

  const [hours, minutes] = time.split(':');
  const hour = Number(hours);

  const suffix = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;

  return `${displayHour}:${minutes} ${suffix}`;
}

function getEventColor(type: EventType) {
  switch (type) {
    case 'Workshop':
      return 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300';

    case 'Meeting':
      return 'bg-purple-500/15 border-purple-500/30 text-purple-300';

    case 'Competition':
      return 'bg-orange-500/15 border-orange-500/30 text-orange-300';

    case 'Social':
      return 'bg-pink-500/15 border-pink-500/30 text-pink-300';

    case 'Deadline':
      return 'bg-red-500/15 border-red-500/30 text-red-300';

    case 'Club':
      return 'bg-blue-500/15 border-blue-500/30 text-blue-300';

    default:
      return 'bg-slate-500/15 border-slate-500/30 text-slate-300';
  }
}

function getPriorityColor(priority?: string | null) {
  switch (priority?.toLowerCase()) {
    case 'high':
      return 'text-red-400 bg-red-500/10 border-red-500/20';

    case 'medium':
      return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';

    case 'low':
      return 'text-green-400 bg-green-500/10 border-green-500/20';

    default:
      return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
  }
}

function getTaskStatusLabel(status: TaskStatus) {
  switch (status) {
    case 'todo':
      return 'To Do';

    case 'in_progress':
      return 'In Progress';

    case 'review':
      return 'Review';

    case 'done':
      return 'Done';

    default:
      return status;
  }
}

/* =========================================================
   MAIN PAGE
   ========================================================= */

export default function HomePage() {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [selectedEvent, setSelectedEvent] =
    useState<CalendarEvent | null>(null);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(true);

  /* =========================================================
     FETCH TASKS
     ========================================================= */

  useEffect(() => {
    let mounted = true;

    async function loadTasks() {
      setLoadingTasks(true);

      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('dueDate', { ascending: true });

      if (error) {
        console.error('Error loading tasks:', error);

        if (mounted) {
          setTasks([]);
          setLoadingTasks(false);
        }

        return;
      }

      if (mounted) {
        setTasks((data as Task[]) || []);
        setLoadingTasks(false);
      }
    }

    loadTasks();

    return () => {
      mounted = false;
    };
  }, []);

  /* =========================================================
     REALTIME TASK UPDATES
     ========================================================= */

  useEffect(() => {
    const channel = supabase
      .channel('homepage-task-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tasks',
        },
        async () => {
          const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .order('dueDate', { ascending: true });

          if (!error) {
            setTasks((data as Task[]) || []);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  /* =========================================================
     CALENDAR CALCULATIONS
     ========================================================= */

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const startDay = firstDay.getDay();

    const daysInMonth = new Date(
      year,
      month + 1,
      0
    ).getDate();

    const previousMonthDays = new Date(
      year,
      month,
      0
    ).getDate();

    const days = [];

    for (let i = startDay - 1; i >= 0; i--) {
      const day = previousMonthDays - i;

      days.push({
        date: new Date(year, month - 1, day),
        isCurrentMonth: false,
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: new Date(year, month, day),
        isCurrentMonth: true,
      });
    }

    while (days.length < 42) {
      const day = days.length - (startDay + daysInMonth) + 1;

      days.push({
        date: new Date(year, month + 1, day),
        isCurrentMonth: false,
      });
    }

    return days;
  }, [currentDate]);

  const monthTitle = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  /* =========================================================
     EVENTS FOR DATE
     ========================================================= */

  function getEventsForDate(date: Date) {
    const dateKey = getDateKey(date);

    return EVENTS.filter((event) => {
      if (!event.endDate) {
        return event.date === dateKey;
      }

      return dateKey >= event.date && dateKey <= event.endDate;
    });
  }

  /* =========================================================
     TASK DATA
     ========================================================= */

  const activeTasks = useMemo(() => {
    return tasks
      .filter(
        (task) =>
          task.status !== 'done'
      )
      .sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;

        return (
          new Date(a.dueDate).getTime() -
          new Date(b.dueDate).getTime()
        );
      })
      .slice(0, 7);
  }, [tasks]);

  function getMember(memberId?: string | null): Member | undefined {
    if (!memberId) return undefined;

    return (team as Member[]).find(
      (member) => member.id === memberId
    );
  }

  /* =========================================================
     MONTH NAVIGATION
     ========================================================= */

  function goToPreviousMonth() {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
      )
    );
  }

  function goToNextMonth() {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        1
      )
    );
  }

  function goToToday() {
    const now = new Date();

    setCurrentDate(
      new Date(
        now.getFullYear(),
        now.getMonth(),
        1
      )
    );
  }

  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      {/* =====================================================
          HEADER
          ===================================================== */}

      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
              AUS IoT Club
            </p>

            <h1 className="mt-1 text-xl font-bold sm:text-2xl">
              Club Calendar
            </h1>
          </div>

          <nav className="flex items-center gap-2">
            <Link
              href="/tasks"
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-cyan-500/50 hover:bg-slate-800 sm:px-4 sm:text-sm"
            >
              Tasks
            </Link>
          </nav>
        </div>
      </header>

      {/* =====================================================
          CONTENT
          ===================================================== */}

      <div className="mx-auto max-w-[1600px] px-3 py-4 sm:px-6 lg:px-8 lg:py-6">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_290px]">
          {/* =================================================
              CALENDAR
              ================================================= */}

          <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70 shadow-2xl">
            {/* Calendar header */}

            <div className="flex flex-col gap-3 border-b border-slate-800 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold sm:text-xl">
                  {monthTitle}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Club events, workshops, meetings, and deadlines
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={goToToday}
                  className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-cyan-500/50 hover:text-white"
                >
                  Today
                </button>

                <button
                  onClick={goToPreviousMonth}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-300 transition hover:border-cyan-500/50 hover:text-white"
                  aria-label="Previous month"
                >
                  ←
                </button>

                <button
                  onClick={goToNextMonth}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-300 transition hover:border-cyan-500/50 hover:text-white"
                  aria-label="Next month"
                >
                  →
                </button>
              </div>
            </div>

            {/* =================================================
                WEEK DAYS
                ================================================= */}

            <div className="grid grid-cols-7 border-b border-slate-800">
              {[
                'Sun',
                'Mon',
                'Tue',
                'Wed',
                'Thu',
                'Fri',
                'Sat',
              ].map((day) => (
                <div
                  key={day}
                  className="border-r border-slate-800 px-1 py-2 text-center text-[9px] font-bold uppercase tracking-wider text-slate-500 last:border-r-0 sm:text-[10px]"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* =================================================
                CALENDAR GRID
                ================================================= */}

            <div className="grid grid-cols-7">
              {calendarDays.map(
                ({ date, isCurrentMonth }, index) => {
                  const dateKey = getDateKey(date);
                  const isToday =
                    dateKey === getTodayKey();

                  const blackout =
                    getBlackoutDate(dateKey);

                  const events =
                    getEventsForDate(date);

                  return (
                    <div
                      key={`${dateKey}-${index}`}
                      className={`
                        relative min-h-[78px]
                        border-r border-b p-1
                        transition
                        sm:min-h-[92px]
                        lg:min-h-[105px]

                        ${
                          blackout
                            ? 'border-red-900/70 bg-red-950/40'
                            : isCurrentMonth
                            ? 'border-slate-800 bg-slate-950/30'
                            : 'border-slate-800 bg-slate-950/70'
                        }

                        ${
                          isToday && !blackout
                            ? 'bg-indigo-950/30'
                            : ''
                        }
                      `}
                    >
                      {/* Date number */}

                      <div className="mb-1 flex items-center justify-between">
                        <span
                          className={`
                            flex h-6 w-6 items-center justify-center
                            rounded-full text-[10px] font-semibold

                            ${
                              isToday && !blackout
                                ? 'bg-cyan-500 text-slate-950'
                                : blackout
                                ? 'text-red-300'
                                : isCurrentMonth
                                ? 'text-slate-300'
                                : 'text-slate-700'
                            }
                          `}
                        >
                          {date.getDate()}
                        </span>

                        {/* Today indicator */}

                        {isToday && !blackout && (
                          <span className="hidden text-[7px] font-bold uppercase tracking-wider text-cyan-400 sm:block">
                            Today
                          </span>
                        )}
                      </div>

                      {/* =================================================
                          BLACKOUT BADGE
                          ================================================= */}

                      {blackout && (
                        <div className="mb-1 rounded border border-red-900/70 bg-red-950/70 px-1 py-1">
                          <p className="truncate text-[7px] font-bold uppercase tracking-wide text-red-400 sm:text-[8px]">
                            {blackout.title}
                          </p>
                        </div>
                      )}

                      {/* =================================================
                          EVENTS
                          ================================================= */}

                      <div className="space-y-1">
                        {events.slice(0, 3).map((event) => (
                          <button
                            key={event.id}
                            onClick={() =>
                              setSelectedEvent(event)
                            }
                            className={`
                              block w-full truncate rounded
                              border px-1 py-1 text-left
                              text-[7px] font-semibold
                              transition
                              sm:text-[8px]

                              ${getEventColor(event.type)}

                              ${
                                blackout
                                  ? 'opacity-60'
                                  : 'hover:brightness-125'
                              }
                            `}
                          >
                            {event.title}
                          </button>
                        ))}

                        {events.length > 3 && (
                          <p className="px-1 text-[7px] text-slate-500">
                            +{events.length - 3} more
                          </p>
                        )}
                      </div>
                    </div>
                  );
                }
              )}
            </div>

            {/* =================================================
                LEGEND
                ================================================= */}

            <div className="flex flex-wrap items-center gap-3 border-t border-slate-800 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-500" />
                <span className="text-[10px] text-slate-500">
                  Today
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded bg-red-500" />
                <span className="text-[10px] text-slate-500">
                  No Club Activities
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded bg-cyan-400" />
                <span className="text-[10px] text-slate-500">
                  Workshop
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded bg-purple-400" />
                <span className="text-[10px] text-slate-500">
                  Meeting
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded bg-orange-400" />
                <span className="text-[10px] text-slate-500">
                  Competition
                </span>
              </div>
            </div>
          </section>

          {/* =====================================================
              TASK SIDEBAR
              ===================================================== */}

          <aside className="h-fit rounded-2xl border border-slate-800 bg-slate-950/70">
            <div className="flex items-center justify-between border-b border-slate-800 px-4 py-4">
              <div>
                <h2 className="text-sm font-bold">
                  Live Tasks
                </h2>

                <p className="mt-1 text-[10px] text-slate-500">
                  Current club tasks
                </p>
              </div>

              <Link
                href="/tasks"
                className="text-[10px] font-semibold text-cyan-400 hover:text-cyan-300"
              >
                View all
              </Link>
            </div>

            <div className="p-3">
              {loadingTasks ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="h-20 animate-pulse rounded-xl border border-slate-800 bg-slate-900/50"
                    />
                  ))}
                </div>
              ) : activeTasks.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-800 px-4 py-8 text-center">
                  <p className="text-xs font-semibold text-slate-400">
                    No active tasks
                  </p>

                  <p className="mt-1 text-[10px] text-slate-600">
                    Everything is currently completed.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {activeTasks.map((task) => {
                    const assignee = getMember(
                      task.assigneeId
                    );

                    return (
                      <Link
                        key={task.id}
                        href="/tasks"
                        className="block rounded-xl border border-slate-800 bg-slate-900/40 p-3 transition hover:border-cyan-500/30 hover:bg-slate-900/80"
                      >
                        {/* Task title */}

                        <div className="flex items-start justify-between gap-2">
                          <p className="line-clamp-2 text-xs font-semibold text-slate-200">
                            {task.title}
                          </p>

                          {task.points != null && (
                            <span className="shrink-0 text-[9px] font-bold text-cyan-400">
                              +{task.points}
                            </span>
                          )}
                        </div>

                        {/* Category */}

                        <div className="mt-2 flex flex-wrap items-center gap-1">
                          {task.category && (
                            <span className="rounded border border-slate-700 bg-slate-950 px-1.5 py-0.5 text-[8px] font-semibold text-slate-400">
                              {task.category}
                            </span>
                          )}

                          {task.priority && (
                            <span
                              className={`
                                rounded border px-1.5 py-0.5
                                text-[8px] font-semibold
                                ${getPriorityColor(
                                  task.priority
                                )}
                              `}
                            >
                              {task.priority}
                            </span>
                          )}
                        </div>

                        {/* Bottom info */}

                        <div className="mt-2 flex items-center justify-between gap-2">
                          <span className="truncate text-[9px] text-slate-500">
                            {assignee?.name ||
                              'Unassigned'}
                          </span>

                          <span className="shrink-0 text-[9px] text-slate-600">
                            {task.dueDate
                              ? formatDate(
                                  task.dueDate
                                )
                              : 'No due date'}
                          </span>
                        </div>

                        {/* Status */}

                        <div className="mt-2">
                          <span className="text-[8px] font-semibold uppercase tracking-wider text-slate-600">
                            {getTaskStatusLabel(
                              task.status
                            )}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Task footer */}

            <div className="border-t border-slate-800 px-4 py-3">
              <Link
                href="/tasks"
                className="block rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-center text-[10px] font-semibold text-slate-400 transition hover:border-cyan-500/30 hover:text-cyan-400"
              >
                Open Task Manager
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* =====================================================
          EVENT MODAL
          ===================================================== */}

      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {/* Modal header */}

            <div className="flex items-start justify-between gap-4 border-b border-slate-800 p-5">
              <div>
                <div
                  className={`
                    mb-2 inline-flex rounded-full
                    border px-2 py-1
                    text-[9px] font-bold
                    uppercase tracking-wider

                    ${getEventColor(
                      selectedEvent.type
                    )}
                  `}
                >
                  {selectedEvent.type}
                </div>

                <h2 className="text-xl font-bold text-white">
                  {selectedEvent.title}
                </h2>
              </div>

              <button
                onClick={() =>
                  setSelectedEvent(null)
                }
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-800 text-slate-500 transition hover:border-slate-600 hover:text-white"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* Modal body */}

            <div className="space-y-4 p-5">
              {/* Date */}

              <div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-600">
                  Date
                </p>

                <p className="mt-1 text-sm text-slate-300">
                  {formatDate(
                    selectedEvent.date
                  )}

                  {selectedEvent.endDate &&
                    selectedEvent.endDate !==
                      selectedEvent.date && (
                      <>
                        {' '}
                        –{' '}
                        {formatDate(
                          selectedEvent.endDate
                        )}
                      </>
                    )}
                </p>
              </div>

              {/* Time */}

              {(selectedEvent.startTime ||
                selectedEvent.endTime) && (
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-600">
                    Time
                  </p>

                  <p className="mt-1 text-sm text-slate-300">
                    {formatTime(
                      selectedEvent.startTime
                    )}

                    {selectedEvent.endTime && (
                      <>
                        {' '}
                        –{' '}
                        {formatTime(
                          selectedEvent.endTime
                        )}
                      </>
                    )}
                  </p>
                </div>
              )}

              {/* Location */}

              {selectedEvent.location && (
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-600">
                    Location
                  </p>

                  <p className="mt-1 text-sm text-slate-300">
                    {selectedEvent.location}
                  </p>
                </div>
              )}

              {/* Description */}

              {selectedEvent.description && (
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-600">
                    Description
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    {selectedEvent.description}
                  </p>
                </div>
              )}
            </div>

            {/* Modal footer */}

            <div className="border-t border-slate-800 p-4">
              <button
                onClick={() =>
                  setSelectedEvent(null)
                }
                className="w-full rounded-lg bg-cyan-500 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}