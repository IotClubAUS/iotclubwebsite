'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { supabase } from '@/lib/supabase';
import { team } from '@/lib/team';

/* =========================================================
   TYPES
   ========================================================= */

type EventType =
  | 'Club'
  | 'Workshop'
  | 'Meeting'
  | 'Competition'
  | 'Social'
  | 'Deadline'
  | 'Hackathon'
  | 'Other';

type TaskStatus =
  | 'todo'
  | 'in_progress'
  | 'review'
  | 'done';

type TaskChecklistItem = {
  id: string;
  text: string;
  completed: boolean;
};

type Task = {
  id: string;
  title: string;
  category: string;
  assigneeId: number;
  dueDate: string;
  points: number;
  priority: string;
  status: TaskStatus;
  checklist: TaskChecklistItem[];
};

type Member = {
  id: number;
  name: string;
  role?: string;
  category?: string | string[];
  img?: string;
  github?: string;
  linkedin?: string;
};

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

/* =========================================================
   ADMIN CREDENTIALS
   CHANGE THESE
   ========================================================= */

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

/* =========================================================
   ADMIN CATEGORIES
   ========================================================= */

const ADMIN_TABS = [
  'ALL',
  'General',
  'Technical',
  'Activities',
  'Public Relations',
  'Media',
  'Executives',
];

/* =========================================================
   CALENDAR EVENTS
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
    title: 'Besomi TinyML Workshop',
    date: '2026-10-12',
    startTime: '17:00',
    endTime: '19:00',
    location: 'ESB-1043',
    description:
      'Hands-on IoT workshop for club members.',
    type: 'Workshop',
  },

  
  {
    id: "INSPIRE '26 Collab",
    title: "INSPIRE '26 Collab",
    date: '2026-09-05',
    startTime: '09:00',
    endTime: '19:00',
    location: 'Main Building',
    description:
      'Collaboration with IEEE SSCS in "INSPIRE 26 ',
    type: 'Hackathon',
  },

  {
    id: 'carnival-1',
    title: 'CARNIVAL',
    date: '2026-11-18',
    startTime: '15:00',
    endTime: '19:00',
    location: 'Football Field',
    description:
      'Collaboration between different clubs',
    type: 'Social',
  },

  {
    id: 'carnival-2',
    title: 'CARNIVAL',
    date: '2026-11-19',
    startTime: '15:00',
    endTime: '19:00',
    location: 'Football Field',
    description:
      'Collaboration between different clubs',
    type: 'Social',
  },

  {
    id: 'Keychain Workshop',
    title: 'Make your own interactive Keychain',
    date: '2026-10-20',
    startTime: '16:00',
    endTime: '18:00',
    location: 'ESB',
    description:
      'Hands-on IoT workshop for club members.',
    type: 'Workshop',
  },

  {
    id: 'Hackathon',
    title: 'Hackathon',
    date: '2026-11-01',
    startTime: '09:00',
    endTime: '18:00',
    location: 'Main Bldg',
    description:
      'hackathon event',
    type: 'Competition',
  },

  {
    id: 'Industry Trip',
    title: 'Visit to ###',
    date: '2026-10-25',
    startTime: '09:00',
    endTime: '18:00',
    location: '??',
    description:
      'Visit to industry',
    type: 'Other',
  },
];

/* =========================================================
   BLACKOUT DATES
   ========================================================= */

const BLACKOUT_DATES = [
  { date: '2026-11-24', title: 'NO CLUB ACTIVITIES' },
  { date: '2026-11-25', title: 'NO CLUB ACTIVITIES' },
  { date: '2026-11-26', title: 'NO CLUB ACTIVITIES' },
  { date: '2026-10-06', title: 'NO CLUB ACTIVITIES' },
  { date: '2026-10-13', title: 'NO CLUB ACTIVITIES' },
  { date: '2026-10-22', title: 'NO CLUB ACTIVITIES' },
  { date: '2026-10-14', title: 'NO CLUB ACTIVITIES' },
];

/* =========================================================
   HELPERS
   ========================================================= */

function getDateKey(date: Date) {
  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, '0');

  const day = String(
    date.getDate()
  ).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function getTodayKey() {
  return getDateKey(new Date());
}

function getBlackoutDate(
  dateKey: string
) {
  return BLACKOUT_DATES.find(
    (item) => item.date === dateKey
  );
}

function formatDate(
  dateString?: string | null
) {
  if (!dateString) {
    return 'No date';
  }

  const date = new Date(
    `${dateString}T00:00:00`
  );

  return date.toLocaleDateString(
    'en-US',
    {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }
  );
}

function formatTime(
  time?: string | null
) {
  if (!time) return '';

  const [hours, minutes] =
    time.split(':');

  const hour = Number(hours);

  const suffix =
    hour >= 12 ? 'PM' : 'AM';

  const displayHour =
    hour % 12 || 12;

  return `${displayHour}:${minutes} ${suffix}`;
}

function getEventColor(
  type: EventType
) {
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

function getPriorityColor(
  priority?: string | null
) {
  switch (
    priority?.toLowerCase()
  ) {
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

function getTaskStatusLabel(
  status: TaskStatus
) {
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
   PAGE
   ========================================================= */

export default function HomePage() {
  /* =======================================================
     VIEW
     ======================================================= */

  const [view, setView] =
    useState<'calendar' | 'tasks'>(
      'calendar'
    );

  /* =======================================================
     ADMIN
     ======================================================= */

  const [isAdmin, setIsAdmin] =
    useState(false);

  const [showLogin, setShowLogin] =
    useState(false);

  const [username, setUsername] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [loginError, setLoginError] =
    useState('');

  /* =======================================================
     TASKS
     ======================================================= */

  const [tasks, setTasks] =
    useState<Task[]>([]);

  const [
    selectedAdminTab,
    setSelectedAdminTab,
  ] = useState('ALL');

  const [
    showCreateTask,
    setShowCreateTask,
  ] = useState(false);

  /* =======================================================
     CALENDAR
     ======================================================= */

  const today = new Date();

  const [
    currentDate,
    setCurrentDate,
  ] = useState(
    new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    )
  );

  const [
    selectedEvent,
    setSelectedEvent,
  ] =
    useState<CalendarEvent | null>(
      null
    );

  /* =======================================================
     CREATE TASK FORM
     ======================================================= */

  const [
    newTaskTitle,
    setNewTaskTitle,
  ] = useState('');

  const [
    newTaskCategory,
    setNewTaskCategory,
  ] = useState('General');

  const [
    newTaskAssignee,
    setNewTaskAssignee,
  ] = useState('');

  const [
    newTaskDueDate,
    setNewTaskDueDate,
  ] = useState('');

  const [
    newTaskPoints,
    setNewTaskPoints,
  ] = useState('10');

  const [
    newTaskPriority,
    setNewTaskPriority,
  ] = useState('Medium');

  const [
    newTaskChecklist,
    setNewTaskChecklist,
  ] = useState('');

  /* =======================================================
     MEMBERS
     ======================================================= */

  const validMembers =
    useMemo(
      () =>
        (team as Member[]).filter(
          (member) =>
            member.name.trim()
              .length > 0
        ),
      []
    );

  /* =======================================================
     LOAD ADMIN STATE
     ======================================================= */

  useEffect(() => {
    const savedAdmin =
      localStorage.getItem(
        'iot_admin_logged_in'
      );

    if (savedAdmin === 'true') {
      setIsAdmin(true);
    }
  }, []);

  /* =======================================================
     FETCH TASKS
     ======================================================= */

  const fetchTasks =
    useCallback(async () => {
      const {
        data,
        error,
      } = await supabase
        .from('tasks')
        .select('*')
        .order(
          'dueDate',
          {
            ascending: true,
          }
        );

      if (error) {
        console.error(
          'Error loading tasks:',
          error
        );

        return;
      }

      setTasks(
        (data as Task[]) || []
      );
    }, []);

  /* =======================================================
     REALTIME
     ======================================================= */

  useEffect(() => {
    fetchTasks();

    const channel =
      supabase
        .channel(
          'public-task-sync'
        )
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'tasks',
          },
          () => {
            fetchTasks();
          }
        )
        .subscribe();

    return () => {
      supabase.removeChannel(
        channel
      );
    };
  }, [fetchTasks]);

  /* =======================================================
     LOGIN
     ======================================================= */

  function handleAdminLogin() {
    if (
      username ===
        ADMIN_USERNAME &&
      password ===
        ADMIN_PASSWORD
    ) {
      setIsAdmin(true);

      localStorage.setItem(
        'iot_admin_logged_in',
        'true'
      );

      setUsername('');
      setPassword('');
      setLoginError('');
      setShowLogin(false);

      return;
    }

    setLoginError(
      'Invalid username or password.'
    );
  }

  /* =======================================================
     LOGOUT
     ======================================================= */

  function handleAdminLogout() {
    setIsAdmin(false);

    localStorage.removeItem(
      'iot_admin_logged_in'
    );

    setShowLogin(false);
  }

  /* =======================================================
     MEMBER LOOKUP
     ======================================================= */

  function getMember(
    memberId?: number | string | null
  ) {
    if (
      memberId === undefined ||
      memberId === null
    ) {
      return undefined;
    }

    const numericId =
      Number(memberId);

    if (
      Number.isNaN(
        numericId
      )
    ) {
      return undefined;
    }

    return validMembers.find(
      (member) =>
        member.id ===
        numericId
    );
  }

  /* =======================================================
     AVATAR
     ======================================================= */

  function getAvatar(
    member?: Member
  ) {
    if (
      member?.img &&
      member.img.trim()
        .length > 1 &&
      member.img !==
        '/team/default_0.webp'
    ) {
      return member.img;
    }

    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${
      member?.name || 'IoT'
    }`;
  }

  /* =======================================================
     CHECKLIST TOGGLE
     ======================================================= */

  async function toggleChecklist(
    taskId: string,
    checkId: string
  ) {
    const task =
      tasks.find(
        (item) =>
          item.id === taskId
      );

    if (!task) return;

    const updatedChecklist =
      task.checklist.map(
        (item) =>
          item.id === checkId
            ? {
                ...item,
                completed:
                  !item.completed,
              }
            : item
      );

    setTasks((previous) =>
      previous.map((item) =>
        item.id === taskId
          ? {
              ...item,
              checklist:
                updatedChecklist,
            }
          : item
      )
    );

    const { error } =
      await supabase
        .from('tasks')
        .update({
          checklist:
            updatedChecklist,
        })
        .eq(
          'id',
          taskId
        );

    if (error) {
      console.error(
        error
      );

      fetchTasks();
    }
  }

  /* =======================================================
     SUBMIT
     ======================================================= */

  async function submitForApproval(
    taskId: string
  ) {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: 'review',
            }
          : task
      )
    );

    const { error } =
      await supabase
        .from('tasks')
        .update({
          status: 'review',
        })
        .eq(
          'id',
          taskId
        );

    if (error) {
      fetchTasks();
    }
  }

  /* =======================================================
     APPROVE
     ======================================================= */

  async function approveTask(
    taskId: string
  ) {
    if (!isAdmin) return;

    setTasks((previous) =>
      previous.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: 'done',
            }
          : task
      )
    );

    const { error } =
      await supabase
        .from('tasks')
        .update({
          status: 'done',
        })
        .eq(
          'id',
          taskId
        );

    if (error) {
      fetchTasks();
    }
  }

  /* =======================================================
     REJECT / REOPEN
     ======================================================= */

  async function rejectTask(
    taskId: string
  ) {
    if (!isAdmin) return;

    setTasks((previous) =>
      previous.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: 'todo',
            }
          : task
      )
    );

    const { error } =
      await supabase
        .from('tasks')
        .update({
          status: 'todo',
        })
        .eq(
          'id',
          taskId
        );

    if (error) {
      fetchTasks();
    }
  }

  /* =======================================================
     DELETE
     ======================================================= */

  async function deleteTask(
    taskId: string
  ) {
    if (!isAdmin) return;

    setTasks((previous) =>
      previous.filter(
        (task) =>
          task.id !== taskId
      )
    );

    const { error } =
      await supabase
        .from('tasks')
        .delete()
        .eq(
          'id',
          taskId
        );

    if (error) {
      fetchTasks();
    }
  }

  /* =======================================================
     CREATE TASK
     ======================================================= */

  async function createTask() {
    if (!isAdmin) {
      return;
    }

    if (
      !newTaskTitle.trim()
    ) {
      return;
    }

    if (!newTaskAssignee) {
      return;
    }

    const checklist =
      newTaskChecklist
        .split(',')
        .map((item) =>
          item.trim()
        )
        .filter(
          (item) =>
            item.length > 0
        )
        .map(
          (
            text,
            index
          ) => ({
            id: `c_${Date.now()}_${index}`,
            text,
            completed: false,
          })
        );

    const newTask: Task = {
      id:
        typeof crypto !==
          'undefined' &&
        crypto.randomUUID
          ? crypto.randomUUID()
          : `task_${Date.now()}`,

      title:
        newTaskTitle.trim(),

      category:
        newTaskCategory,

      assigneeId:
        Number(
          newTaskAssignee
        ),

      dueDate:
        newTaskDueDate,

      points:
        Number(
          newTaskPoints
        ) || 0,

      priority:
        newTaskPriority,

      status: 'todo',

      checklist,
    };

    const { error } =
      await supabase
        .from('tasks')
        .insert([
          newTask,
        ]);

    if (error) {
      console.error(
        'Error creating task:',
        error
      );

      return;
    }

    setTasks((previous) => [
      ...previous,
      newTask,
    ]);

    /* Reset form */

    setNewTaskTitle('');
    setNewTaskCategory(
      'General'
    );
    setNewTaskAssignee('');
    setNewTaskDueDate('');
    setNewTaskPoints('10');
    setNewTaskPriority(
      'Medium'
    );
    setNewTaskChecklist('');

    setShowCreateTask(
      false
    );
  }

  /* =======================================================
     FILTERED TASKS
     ======================================================= */

  const visibleTasks =
    useMemo(() => {
      if (!isAdmin) {
        return tasks;
      }

      if (
        selectedAdminTab ===
        'ALL'
      ) {
        return tasks;
      }

      return tasks.filter(
        (task) =>
          task.category ===
          selectedAdminTab
      );
    }, [
      tasks,
      isAdmin,
      selectedAdminTab,
    ]);

  /* =======================================================
     TASK GROUPS
     ======================================================= */

  const activeTasks =
    useMemo(
      () =>
        visibleTasks.filter(
          (task) =>
            task.status ===
              'todo' ||
            task.status ===
              'in_progress'
        ),
      [visibleTasks]
    );

  const pendingReviewTasks =
    useMemo(
      () =>
        visibleTasks.filter(
          (task) =>
            task.status ===
            'review'
        ),
      [visibleTasks]
    );

  const completedTasks =
    useMemo(
      () =>
        visibleTasks.filter(
          (task) =>
            task.status ===
            'done'
        ),
      [visibleTasks]
    );

  /* =======================================================
     LEADERBOARD
     ======================================================= */

  const leaderboard =
    useMemo(() => {
      return validMembers
        .map((member) => {
          const doneTasks =
            tasks.filter(
              (task) =>
                task.assigneeId ===
                  member.id &&
                task.status ===
                  'done'
            );

          const totalPoints =
            doneTasks.reduce(
              (
                total,
                task
              ) =>
                total +
                Number(
                  task.points ||
                    0
                ),
              0
            );

          return {
            ...member,
            totalPoints,
            doneCount:
              doneTasks.length,
          };
        })
        .sort(
          (a, b) =>
            b.totalPoints -
            a.totalPoints
        );
    }, [
      validMembers,
      tasks,
    ]);

  /* =======================================================
     CALENDAR DAYS
     ======================================================= */

  const calendarDays =
    useMemo(() => {
      const year =
        currentDate.getFullYear();

      const month =
        currentDate.getMonth();

      const firstDay =
        new Date(
          year,
          month,
          1
        );

      const startDay =
        firstDay.getDay();

      const daysInMonth =
        new Date(
          year,
          month + 1,
          0
        ).getDate();

      const previousMonthDays =
        new Date(
          year,
          month,
          0
        ).getDate();

      const days: {
        date: Date;
        isCurrentMonth: boolean;
      }[] = [];

      for (
        let i =
          startDay - 1;
        i >= 0;
        i--
      ) {
        days.push({
          date: new Date(
            year,
            month - 1,
            previousMonthDays -
              i
          ),
          isCurrentMonth:
            false,
        });
      }

      for (
        let day = 1;
        day <=
        daysInMonth;
        day++
      ) {
        days.push({
          date: new Date(
            year,
            month,
            day
          ),
          isCurrentMonth:
            true,
        });
      }

      while (
        days.length < 42
      ) {
        const dayOffset =
          days.length -
          (startDay +
            daysInMonth) +
          1;

        days.push({
          date: new Date(
            year,
            month + 1,
            dayOffset
          ),
          isCurrentMonth:
            false,
        });
      }

      return days;
    }, [currentDate]);

  const monthTitle =
    currentDate.toLocaleDateString(
      'en-US',
      {
        month: 'long',
        year: 'numeric',
      }
    );

  /* =======================================================
     CALENDAR EVENTS
     ======================================================= */

  function getEventsForDate(
    date: Date
  ) {
    const dateKey =
      getDateKey(date);

    return EVENTS.filter(
      (event) => {
        if (!event.endDate) {
          return (
            event.date ===
            dateKey
          );
        }

        return (
          dateKey >=
            event.date &&
          dateKey <=
            event.endDate
        );
      }
    );
  }

  function goToPreviousMonth() {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() -
          1,
        1
      )
    );
  }

  function goToNextMonth() {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() +
          1,
        1
      )
    );
  }

  function goToToday() {
    const now =
      new Date();

    setCurrentDate(
      new Date(
        now.getFullYear(),
        now.getMonth(),
        1
      )
    );
  }

  /* =======================================================
     RENDER
     ======================================================= */

  return (

    
<main className="min-h-screen bg-[#020617] pt-20 text-white lg:pt-24">
      {/* =====================================================
    CALENDAR / TASK CONTROLS
    ===================================================== */}

<div className="border-b border-slate-800 bg-slate-950/60 px-3 py-3 sm:px-6 lg:px-8">
  <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3">

    {/* Left side */}
    <div className="flex items-center gap-2">

      <button
        onClick={() => setView('calendar')}
        className={`rounded-lg border px-3 py-2 text-xs font-semibold transition sm:px-4 sm:text-sm ${
          view === 'calendar'
            ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300'
            : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-cyan-500/50 hover:text-white'
        }`}
      >
        Calendar
      </button>

      <button
        onClick={() => setView('tasks')}
        className={`rounded-lg border px-3 py-2 text-xs font-semibold transition sm:px-4 sm:text-sm ${
          view === 'tasks'
            ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300'
            : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-cyan-500/50 hover:text-white'
        }`}
      >
        Tasks
      </button>

    </div>

    {/* Right side */}
    <div>

      {isAdmin ? (
        <button
          onClick={handleAdminLogout}
          className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-500/20 sm:px-4 sm:text-sm"
        >
          Admin Sign Out
        </button>
      ) : (
        <button
          onClick={() => {
            setShowLogin(true);
            setView('tasks');
          }}
          className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-cyan-500/50 hover:text-white sm:px-4 sm:text-sm"
        >
          Admin Sign In
        </button>
      )}

    </div>

  </div>
</div>

      {/* =====================================================
          CONTENT
          ===================================================== */}

      <div className="mx-auto max-w-[1600px] px-3 py-4 sm:px-6 lg:px-8 lg:py-6">

        {/* ===================================================
            CALENDAR
            =================================================== */}

        {view ===
          'calendar' && (
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_290px]">

            <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70 shadow-2xl">

              <div className="flex flex-col gap-3 border-b border-slate-800 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <h2 className="text-lg font-bold sm:text-xl">
                    {monthTitle}
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Club events,
                    workshops,
                    meetings, and
                    deadlines
                  </p>
                </div>

                <div className="flex items-center gap-2">

                  <button
                    onClick={
                      goToToday
                    }
                    className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-cyan-500/50 hover:text-white"
                  >
                    Today
                  </button>

                  <button
                    onClick={
                      goToPreviousMonth
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-300 transition hover:border-cyan-500/50 hover:text-white"
                  >
                    ←
                  </button>

                  <button
                    onClick={
                      goToNextMonth
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-300 transition hover:border-cyan-500/50 hover:text-white"
                  >
                    →
                  </button>

                </div>

              </div>

              <div className="grid grid-cols-7 border-b border-slate-800">

                {[
                  'Sun',
                  'Mon',
                  'Tue',
                  'Wed',
                  'Thu',
                  'Fri',
                  'Sat',
                ].map(
                  (day) => (
                    <div
                      key={day}
                      className="border-r border-slate-800 px-1 py-2 text-center text-[9px] font-bold uppercase tracking-wider text-slate-500 last:border-r-0 sm:text-[10px]"
                    >
                      {day}
                    </div>
                  )
                )}

              </div>

              <div className="grid grid-cols-7">

                {calendarDays.map(
                  (
                    {
                      date,
                      isCurrentMonth,
                    },
                    index
                  ) => {
                    const dateKey =
                      getDateKey(
                        date
                      );

                    const isToday =
                      dateKey ===
                      getTodayKey();

                    const blackout =
                      getBlackoutDate(
                        dateKey
                      );

                    const events =
                      getEventsForDate(
                        date
                      );

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
                            isToday &&
                            !blackout
                              ? 'bg-indigo-950/30'
                              : ''
                          }
                        `}
                      >

                        <div className="mb-1 flex items-center justify-between">

                          <span
                            className={`
                              flex h-6 w-6 items-center justify-center
                              rounded-full text-[10px] font-semibold

                              ${
                                isToday &&
                                !blackout
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

                          {isToday &&
                            !blackout && (
                              <span className="hidden text-[7px] font-bold uppercase tracking-wider text-cyan-400 sm:block">
                                Today
                              </span>
                            )}

                        </div>

                        {blackout && (
                          <div className="mb-1 rounded border border-red-900/70 bg-red-950/70 px-1 py-1">
                            <p className="truncate text-[7px] font-bold uppercase tracking-wide text-red-400 sm:text-[8px]">
                              {
                                blackout.title
                              }
                            </p>
                          </div>
                        )}

                        <div className="space-y-1">

                          {events
                            .slice(
                              0,
                              3
                            )
                            .map(
                              (
                                event
                              ) => (
                                <button
                                  key={
                                    event.id
                                  }
                                  onClick={() =>
                                    setSelectedEvent(
                                      event
                                    )
                                  }
                                  className={`
                                    block w-full truncate rounded
                                    border px-1 py-1 text-left
                                    text-[7px] font-semibold
                                    transition sm:text-[8px]

                                    ${getEventColor(
                                      event.type
                                    )}
                                  `}
                                >
                                  {
                                    event.title
                                  }
                                </button>
                              )
                            )}

                          {events.length >
                            3 && (
                            <p className="px-1 text-[7px] text-slate-500">
                              +
                              {events.length -
                                3}{' '}
                              more
                            </p>
                          )}

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

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
                    No Club
                    Activities
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

            {/* =================================================
                LIVE TASKS
                ================================================= */}

            <aside className="h-fit rounded-2xl border border-slate-800 bg-slate-950/70">

              <div className="flex items-center justify-between border-b border-slate-800 px-4 py-4">

                <div>
                  <h2 className="text-sm font-bold">
                    Live Tasks
                  </h2>

                  <p className="mt-1 text-[10px] text-slate-500">
                    Current club
                    tasks
                  </p>
                </div>

                <button
                  onClick={() =>
                    setView(
                      'tasks'
                    )
                  }
                  className="text-[10px] font-semibold text-cyan-400 hover:text-cyan-300"
                >
                  View all
                </button>

              </div>

              <div className="p-3">

                {activeTasks.length ===
                0 ? (
                  <div className="rounded-xl border border-dashed border-slate-800 px-4 py-8 text-center">

                    <p className="text-xs font-semibold text-slate-400">
                      No active
                      tasks
                    </p>

                    <p className="mt-1 text-[10px] text-slate-600">
                      Everything is
                      currently
                      completed.
                    </p>

                  </div>
                ) : (
                  <div className="space-y-2">

                    {activeTasks
                      .slice(
                        0,
                        7
                      )
                      .map(
                        (task) => {
                          const assignee =
                            getMember(
                              task.assigneeId
                            );

                          return (
                            <button
                              key={
                                task.id
                              }
                              onClick={() =>
                                setView(
                                  'tasks'
                                )
                              }
                              className="block w-full rounded-xl border border-slate-800 bg-slate-900/40 p-3 text-left transition hover:border-cyan-500/30 hover:bg-slate-900/80"
                            >

                              <div className="flex items-start justify-between gap-2">

                                <p className="line-clamp-2 text-xs font-semibold text-slate-200">
                                  {
                                    task.title
                                  }
                                </p>

                                <span className="shrink-0 text-[9px] font-bold text-cyan-400">
                                  +
                                  {
                                    task.points
                                  }
                                </span>

                              </div>

                              <div className="mt-2 flex flex-wrap gap-1">

                                <span className="rounded border border-slate-700 bg-slate-950 px-1.5 py-0.5 text-[8px] font-semibold text-slate-400">
                                  {
                                    task.category
                                  }
                                </span>

                                <span
                                  className={`
                                    rounded border px-1.5 py-0.5
                                    text-[8px] font-semibold
                                    ${getPriorityColor(
                                      task.priority
                                    )}
                                  `}
                                >
                                  {
                                    task.priority
                                  }
                                </span>

                              </div>

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

                              <div className="mt-2">
                                <span className="text-[8px] font-semibold uppercase tracking-wider text-slate-600">
                                  {
                                    getTaskStatusLabel(
                                      task.status
                                    )
                                  }
                                </span>
                              </div>

                            </button>
                          );
                        }
                      )}

                  </div>
                )}

              </div>

              <div className="border-t border-slate-800 px-4 py-3">

                <button
                  onClick={() =>
                    setView(
                      'tasks'
                    )
                  }
                  className="block w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-center text-[10px] font-semibold text-slate-400 transition hover:border-cyan-500/30 hover:text-cyan-400"
                >
                  Open Task
                  Manager
                </button>

              </div>

            </aside>

          </div>
        )}

        {/* ===================================================
            TASK MANAGER
            =================================================== */}

        {view === 'tasks' && (
          <div className="min-h-screen">

            {/* =================================================
                TASK HEADER
                ================================================= */}

            <div className="mb-6 border-b border-slate-800 pb-5">

              <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">

                <div>

                  <div className="mb-2 flex flex-wrap items-center gap-2">

                    <span className="rounded border border-indigo-800 bg-indigo-950 px-2 py-0.5 text-xs font-bold uppercase tracking-widest text-indigo-400">
                      Public Task
                      Portal
                    </span>

                    {isAdmin && (
                      <span className="rounded border border-amber-800 bg-amber-950 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-400">
                        Admin Mode
                      </span>
                    )}

                  </div>

                  <h1 className="text-2xl font-extrabold text-white">
                    Club Task Manager
                  </h1>

                  <p className="mt-1 text-xs text-slate-500">
                    All club members can
                    view and work on
                    tasks.
                  </p>

                </div>

                <div className="flex items-center gap-2">

                  {isAdmin && (
                    <button
                      onClick={() =>
                        setShowCreateTask(
                          true
                        )
                      }
                      className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-medium text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500"
                    >
                      + Create Task
                    </button>
                  )}

                  <button
                    onClick={() =>
                      setView(
                        'calendar'
                      )
                    }
                    className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-300 transition hover:bg-slate-700"
                  >
                    Calendar
                  </button>

                </div>

              </div>

            </div>

            {/* =================================================
                ADMIN FILTERS
                ================================================= */}

            {isAdmin && (
              <div className="mb-6 flex flex-wrap gap-2 border-b border-slate-800/80 pb-4">

                <span className="mr-2 self-center text-xs font-semibold text-slate-400">
                  Filter View:
                </span>

                {ADMIN_TABS.map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() =>
                        setSelectedAdminTab(
                          tab
                        )
                      }
                      className={`
                        rounded-lg border px-3 py-1.5
                        text-xs transition

                        ${
                          selectedAdminTab ===
                          tab
                            ? 'border-indigo-500 bg-indigo-600 font-semibold text-white'
                            : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                        }
                      `}
                    >
                      {tab}
                    </button>
                  )
                )}

              </div>
            )}

            {/* =================================================
                TASK GRID
                ================================================= */}

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

              <div className="space-y-8 lg:col-span-2">

                {/* =================================================
                    PENDING
                    ================================================= */}

                {pendingReviewTasks.length >
                  0 && (
                  <section className="space-y-4 rounded-2xl border border-amber-900/50 bg-amber-950/20 p-4">

                    <h2 className="flex items-center justify-between text-sm font-bold uppercase tracking-wider text-amber-400">

                      <span>
                        Pending Admin
                        Approval (
                        {
                          pendingReviewTasks.length
                        }
                        )
                      </span>

                      <span className="text-[10px] font-normal normal-case text-amber-500/80">
                        Points awarded
                        upon approval
                      </span>

                    </h2>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                      {pendingReviewTasks.map(
                        (task) => {
                          const assignee =
                            getMember(
                              task.assigneeId
                            );

                          return (
                            <div
                              key={
                                task.id
                              }
                              className="rounded-xl border border-amber-800/60 bg-slate-900 p-4"
                            >

                              <div className="mb-2 flex justify-between">

                                <span className="rounded border border-amber-800 bg-amber-950 px-2 py-0.5 text-[10px] uppercase text-amber-300">
                                  {
                                    task.category
                                  }{' '}
                                  • Review
                                </span>

                                <span className="text-xs font-bold text-amber-400">
                                  +
                                  {
                                    task.points
                                  }{' '}
                                  pts
                                </span>

                              </div>

                              <h3 className="text-sm font-semibold text-white">
                                {
                                  task.title
                                }
                              </h3>

                              <p className="mb-3 mt-1 text-[11px] text-slate-400">
                                Submitted by{' '}
                                {
                                  assignee?.name ||
                                  'Unknown'
                                }
                              </p>

                              <div className="mb-4 space-y-1">

                                {task.checklist.map(
                                  (
                                    item
                                  ) => (
                                    <div
                                      key={
                                        item.id
                                      }
                                      className="text-xs text-slate-300"
                                    >
                                      ✓{' '}
                                      {
                                        item.text
                                      }
                                    </div>
                                  )
                                )}

                              </div>

                              {isAdmin && (
                                <div className="flex justify-end gap-2 border-t border-slate-800 pt-3">

                                  <button
                                    onClick={() =>
                                      rejectTask(
                                        task.id
                                      )
                                    }
                                    className="rounded border border-red-800 bg-red-950 px-3 py-1.5 text-[11px] text-red-300 hover:bg-red-900"
                                  >
                                    Reject
                                  </button>

                                  <button
                                    onClick={() =>
                                      approveTask(
                                        task.id
                                      )
                                    }
                                    className="rounded bg-emerald-600 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-emerald-500"
                                  >
                                    Approve
                                  </button>

                                </div>
                              )}

                            </div>
                          );
                        }
                      )}

                    </div>

                  </section>
                )}

                {/* =================================================
                    ACTIVE
                    ================================================= */}

                <section className="space-y-4">

                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                    Active Work (
                    {
                      activeTasks.length
                    }
                    )
                  </h2>

                  {activeTasks.length ===
                  0 ? (
                    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-8 text-center text-xs text-slate-500">
                      No active tasks
                      pending.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                      {activeTasks.map(
                        (task) => {
                          const assignee =
                            getMember(
                              task.assigneeId
                            );

                          const allDone =
                            task.checklist.length >
                              0 &&
                            task.checklist.every(
                              (
                                item
                              ) =>
                                item.completed
                            );

                          return (
                            <div
                              key={
                                task.id
                              }
                              className="rounded-xl border border-slate-800 bg-slate-900 p-4"
                            >

                              <div className="mb-3 flex items-center justify-between">

                                <span className="rounded border border-slate-700 bg-slate-800 px-2 py-0.5 text-[10px] font-semibold uppercase text-indigo-300">
                                  {
                                    task.category
                                  }
                                </span>

                                <div className="flex items-center gap-2">

                                  <span className="rounded border border-amber-800/50 bg-amber-950/40 px-2 py-0.5 text-xs font-bold text-amber-400">
                                    +
                                    {
                                      task.points
                                    }{' '}
                                    pts
                                  </span>

                                  {isAdmin && (
                                    <button
                                      onClick={() =>
                                        deleteTask(
                                          task.id
                                        )
                                      }
                                      className="text-xs text-slate-500 hover:text-red-400"
                                    >
                                      ✕
                                    </button>
                                  )}

                                </div>

                              </div>

                              <h3 className="text-sm font-semibold text-white">
                                {
                                  task.title
                                }
                              </h3>

                              <div className="my-3 space-y-1.5">

                                {task.checklist.map(
                                  (
                                    item
                                  ) => (
                                    <label
                                      key={
                                        item.id
                                      }
                                      className="flex cursor-pointer items-start gap-2 text-xs text-slate-300"
                                    >

                                      <input
                                        type="checkbox"
                                        checked={
                                          item.completed
                                        }
                                        onChange={() =>
                                          toggleChecklist(
                                            task.id,
                                            item.id
                                          )
                                        }
                                        className="mt-0.5 rounded border-slate-700 bg-slate-800 text-indigo-500 focus:ring-0"
                                      />

                                      <span
                                        className={
                                          item.completed
                                            ? 'line-through text-slate-500'
                                            : ''
                                        }
                                      >
                                        {
                                          item.text
                                        }
                                      </span>

                                    </label>
                                  )
                                )}

                              </div>

                              <div className="flex items-center justify-between border-t border-slate-800 pt-3">

                                <div className="flex items-center gap-2">

                                  <img
                                    src={getAvatar(
                                      assignee
                                    )}
                                    alt={
                                      assignee?.name ||
                                      'Member'
                                    }
                                    className="h-6 w-6 rounded-full bg-slate-800 object-cover"
                                  />

                                  <span className="max-w-[110px] truncate text-xs text-slate-300">
                                    {
                                      assignee?.name
                                    }
                                  </span>

                                </div>

                                <button
                                  onClick={() =>
                                    submitForApproval(
                                      task.id
                                    )
                                  }
                                  className={`
                                    rounded-lg border px-3 py-1.5
                                    text-xs font-bold transition

                                    ${
                                      allDone
                                        ? 'border-amber-500 bg-amber-600 text-white'
                                        : 'border-indigo-800 bg-indigo-950 text-indigo-300 hover:bg-indigo-600 hover:text-white'
                                    }
                                  `}
                                >
                                  Submit for
                                  Approval
                                </button>

                              </div>

                            </div>
                          );
                        }
                      )}

                    </div>
                  )}

                </section>

                {/* =================================================
                    COMPLETED
                    ================================================= */}

                {completedTasks.length >
                  0 && (
                  <section className="space-y-4 border-t border-slate-800 pt-4">

                    <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
                      Approved &
                      Completed (
                      {
                        completedTasks.length
                      }
                      )
                    </h2>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                      {completedTasks.map(
                        (task) => {
                          const assignee =
                            getMember(
                              task.assigneeId
                            );

                          return (
                            <div
                              key={
                                task.id
                              }
                              className="rounded-xl border border-emerald-950/60 bg-slate-900/60 p-4"
                            >

                              <div className="flex justify-between">

                                <div>

                                  <span className="rounded border border-emerald-900/40 bg-emerald-950/60 px-2 py-0.5 text-[10px] text-emerald-400">
                                    Approved
                                  </span>

                                  <h3 className="mt-2 text-sm text-slate-300 line-through">
                                    {
                                      task.title
                                    }
                                  </h3>

                                </div>

                                <span className="text-xs font-bold text-emerald-400">
                                  +
                                  {
                                    task.points
                                  }{' '}
                                  pts
                                </span>

                              </div>

                              <div className="mt-3 flex items-center justify-between border-t border-slate-800 pt-2">

                                <span className="text-xs text-slate-400">
                                  {
                                    assignee?.name
                                  }
                                </span>

                                {isAdmin && (
                                  <button
                                    onClick={() =>
                                      rejectTask(
                                        task.id
                                      )
                                    }
                                    className="text-[10px] text-slate-500 underline hover:text-white"
                                  >
                                    Re-open
                                  </button>
                                )}

                              </div>

                            </div>
                          );
                        }
                      )}

                    </div>

                  </section>
                )}

              </div>

              {/* =================================================
                  LEADERBOARD
                  ================================================= */}

              <aside>

                <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-300">
                  Live Leaderboard
                </h2>

                <div className="divide-y divide-slate-800/60 rounded-xl border border-slate-800 bg-slate-900 p-4">

                  {leaderboard.map(
                    (
                      member,
                      index
                    ) => (
                      <div
                        key={
                          member.id
                        }
                        className="flex items-center justify-between py-3"
                      >

                        <div className="flex items-center gap-3">

                          <span className="w-5 text-xs font-bold text-slate-500">
                            #
                            {index +
                              1}
                          </span>

                          <img
                            src={getAvatar(
                              member
                            )}
                            alt={
                              member.name
                            }
                            className="h-8 w-8 rounded-full bg-slate-800 object-cover"
                          />

                          <div>
                            <p className="text-xs font-semibold text-white">
                              {
                                member.name
                              }
                            </p>

                            <p className="text-[10px] text-slate-500">
                              {
                                member.role
                              }
                            </p>
                          </div>

                        </div>

                        <div className="text-right">

                          <p className="text-xs font-bold text-amber-400">
                            {
                              member.totalPoints
                            }{' '}
                            pts
                          </p>

                          <p className="text-[10px] text-slate-500">
                            {
                              member.doneCount
                            }{' '}
                            approved
                          </p>

                        </div>

                      </div>
                    )
                  )}

                </div>

              </aside>

            </div>

          </div>
        )}

      </div>

      {/* =====================================================
          ADMIN LOGIN MODAL
          ===================================================== */}

      {showLogin && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() =>
            setShowLogin(false)
          }
        >

          <div
            className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="mb-6">

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
                AUS IoT Club
              </p>

              <h2 className="mt-2 text-xl font-bold text-white">
                Admin Sign In
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Sign in to create and
                manage club tasks.
              </p>

            </div>

            <div className="space-y-4">

              <div>

                <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Username
                </label>

                <input
                  value={username}
                  onChange={(event) =>
                    setUsername(
                      event.target.value
                    )
                  }
                  onKeyDown={(event) => {
                    if (
                      event.key ===
                      'Enter'
                    ) {
                      handleAdminLogin();
                    }
                  }}
                  autoComplete="username"
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-500"
                  placeholder="Username"
                />

              </div>

              <div>

                <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value
                    )
                  }
                  onKeyDown={(event) => {
                    if (
                      event.key ===
                      'Enter'
                    ) {
                      handleAdminLogin();
                    }
                  }}
                  autoComplete="current-password"
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-500"
                  placeholder="Password"
                />

              </div>

              {loginError && (
                <div className="rounded-lg border border-red-900/60 bg-red-950/40 px-3 py-2 text-xs text-red-400">
                  {
                    loginError
                  }
                </div>
              )}

              <div className="flex gap-2 pt-2">

                <button
                  onClick={() =>
                    setShowLogin(
                      false
                    )
                  }
                  className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-400 transition hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  onClick={
                    handleAdminLogin
                  }
                  className="flex-1 rounded-lg bg-cyan-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-cyan-500"
                >
                  Sign In
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* =====================================================
          CREATE TASK MODAL
          ===================================================== */}

      {showCreateTask &&
        isAdmin && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={() =>
              setShowCreateTask(
                false
              )
            }
          >

            <div
              className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              <div className="mb-6 flex items-start justify-between">

                <div>

                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400">
                    Admin
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-white">
                    Create Task
                  </h2>

                </div>

                <button
                  onClick={() =>
                    setShowCreateTask(
                      false
                    )
                  }
                  className="text-slate-500 hover:text-white"
                >
                  ×
                </button>

              </div>

              <div className="space-y-4">

                {/* Title */}

                <div>

                  <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Task Title
                  </label>

                  <input
                    value={
                      newTaskTitle
                    }
                    onChange={(event) =>
                      setNewTaskTitle(
                        event.target
                          .value
                      )
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-500"
                    placeholder="e.g. Design Instagram post"
                  />

                </div>

                {/* Category */}

                <div>

                  <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Category
                  </label>

                  <select
                    value={
                      newTaskCategory
                    }
                    onChange={(event) =>
                      setNewTaskCategory(
                        event.target
                          .value
                      )
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-500"
                  >

                    {ADMIN_TABS.filter(
                      (item) =>
                        item !==
                        'ALL'
                    ).map(
                      (
                        category
                      ) => (
                        <option
                          key={
                            category
                          }
                          value={
                            category
                          }
                        >
                          {
                            category
                          }
                        </option>
                      )
                    )}

                  </select>

                </div>

                {/* Assignee */}

                <div>

                  <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Assign To
                  </label>

                  <select
                    value={
                      newTaskAssignee
                    }
                    onChange={(event) =>
                      setNewTaskAssignee(
                        event.target
                          .value
                      )
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-500"
                  >

                    <option value="">
                      Select member
                    </option>

                    {validMembers.map(
                      (
                        member
                      ) => (
                        <option
                          key={
                            member.id
                          }
                          value={
                            member.id
                          }
                        >
                          {
                            member.name
                          }
                        </option>
                      )
                    )}

                  </select>

                </div>

                {/* Due date */}

                <div>

                  <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Due Date
                  </label>

                  <input
                    type="date"
                    value={
                      newTaskDueDate
                    }
                    onChange={(event) =>
                      setNewTaskDueDate(
                        event.target
                          .value
                      )
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-500"
                  />

                </div>

                {/* Points / priority */}

                <div className="grid grid-cols-2 gap-3">

                  <div>

                    <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Points
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={
                        newTaskPoints
                      }
                      onChange={(
                        event
                      ) =>
                        setNewTaskPoints(
                          event.target
                            .value
                        )
                      }
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-500"
                    />

                  </div>

                  <div>

                    <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Priority
                    </label>

                    <select
                      value={
                        newTaskPriority
                      }
                      onChange={(
                        event
                      ) =>
                        setNewTaskPriority(
                          event.target
                            .value
                        )
                      }
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-500"
                    >

                      <option>
                        Low
                      </option>

                      <option>
                        Medium
                      </option>

                      <option>
                        High
                      </option>

                    </select>

                  </div>

                </div>

                {/* Checklist */}

                <div>

                  <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Checklist
                  </label>

                  <textarea
                    value={
                      newTaskChecklist
                    }
                    onChange={(event) =>
                      setNewTaskChecklist(
                        event.target
                          .value
                      )
                    }
                    rows={4}
                    className="w-full resize-none rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-500"
                    placeholder="Research topic, Create design, Submit final version"
                  />

                  <p className="mt-1 text-[9px] text-slate-600">
                    Separate checklist
                    items with commas.
                  </p>

                </div>

                {/* Create */}

                <button
                  onClick={
                    createTask
                  }
                  disabled={
                    !newTaskTitle.trim() ||
                    !newTaskAssignee
                  }
                  className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Create Task
                </button>

              </div>

            </div>

          </div>
        )}

      {/* =====================================================
          EVENT MODAL
          ===================================================== */}

      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() =>
            setSelectedEvent(
              null
            )
          }
        >

          <div
            className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="flex items-start justify-between border-b border-slate-800 p-5">

              <div>

                <div
                  className={`
                    mb-2 inline-flex rounded-full
                    border px-2 py-1
                    text-[9px] font-bold uppercase
                    ${getEventColor(
                      selectedEvent.type
                    )}
                  `}
                >
                  {
                    selectedEvent.type
                  }
                </div>

                <h2 className="text-xl font-bold">
                  {
                    selectedEvent.title
                  }
                </h2>

              </div>

              <button
                onClick={() =>
                  setSelectedEvent(
                    null
                  )
                }
                className="text-xl text-slate-500 hover:text-white"
              >
                ×
              </button>

            </div>

            <div className="space-y-4 p-5">

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

              {selectedEvent.location && (
                <div>

                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-600">
                    Location
                  </p>

                  <p className="mt-1 text-sm text-slate-300">
                    {
                      selectedEvent.location
                    }
                  </p>

                </div>
              )}

              {selectedEvent.description && (
                <div>

                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-600">
                    Description
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-300">
                    {
                      selectedEvent.description
                    }
                  </p>

                </div>
              )}

            </div>

          </div>

        </div>
      )}

    </main>
  );
}