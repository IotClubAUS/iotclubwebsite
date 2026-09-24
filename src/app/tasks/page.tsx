// src/app/tasks/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { team } from '@/lib/team';
import { Task, Member, RoleCategory, Priority, UserSession } from '@/lib/types';
import AuthGate from '../components/AuthGate';
import TaskModal from '../components/TaskModal';

const ADMIN_TABS: (RoleCategory | 'ALL')[] = [
  'ALL',
  'General',
  'Technical',
  'Activities',
  'Public Relations',
  'Media',
  'Executives',
];

export default function TasksPage() {
  const [session, setSession] = useState<UserSession | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdminTab, setSelectedAdminTab] = useState<RoleCategory | 'ALL'>('ALL');

  const validMembers = (team as Member[]).filter((m) => m.name.trim().length > 0);

  // Load user session locally
  useEffect(() => {
    const savedSession = localStorage.getItem('iot_user_session');
    if (savedSession) setSession(JSON.parse(savedSession));
  }, []);

  // 🌐 UNIVERSAL REAL-TIME SYNC WITH SUPABASE
  useEffect(() => {
    // Initial fetch from Supabase
    const fetchTasks = async () => {
      const { data, error } = await supabase.from('tasks').select('*');
      if (data && !error) setTasks(data as Task[]);
    };

    fetchTasks();

    // Subscribe to live database changes
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tasks' },
        () => {
          fetchTasks(); // Refetch updated task list when any user makes a change
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleLogin = (userSession: UserSession) => {
    setSession(userSession);
    localStorage.setItem('iot_user_session', JSON.stringify(userSession));
  };

  const handleLogout = () => {
    setSession(null);
    localStorage.removeItem('iot_user_session');
  };

  const getMember = (id: number) => validMembers.find((m) => m.id === id);

  const getAvatar = (member?: Member) => {
    if (member?.img && member.img.trim().length > 1 && member.img !== "/team/default_0.webp") {
      return member.img;
    }
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${member?.name || 'IoT'}`;
  };

  // Toggle checklist item in Supabase
  const toggleChecklist = async (taskId: string, checkId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const updatedChecklist = task.checklist.map((c) =>
      c.id === checkId ? { ...c, completed: !c.completed } : c
    );

    await supabase.from('tasks').update({ checklist: updatedChecklist }).eq('id', taskId);
  };

  // Submit task for review
  const submitForApproval = async (taskId: string) => {
    await supabase.from('tasks').update({ status: 'review' }).eq('id', taskId);
  };

  // Admin Approve task
  const approveTask = async (taskId: string) => {
    await supabase.from('tasks').update({ status: 'done' }).eq('id', taskId);
  };

  // Admin Reject task
  const rejectTask = async (taskId: string) => {
    await supabase.from('tasks').update({ status: 'todo' }).eq('id', taskId);
  };

  // Admin Delete task
  const deleteTask = async (taskId: string) => {
    if (session?.role !== 'admin') return;
    await supabase.from('tasks').delete().eq('id', taskId);
  };

  // Admin Create new task
  const handleCreateTask = async (taskData: {
    title: string;
    category: RoleCategory;
    assigneeId: number;
    dueDate: string;
    points: number;
    priority: Priority;
    checklistText: string;
  }) => {
    const taskId = `t_${Date.now()}`;
    const checklistItems = taskData.checklistText
      .split(',')
      .map((str) => str.trim())
      .filter((str) => str.length > 0)
      .map((text, idx) => ({ id: `c_${Date.now()}_${idx}`, text, completed: false }));

    const newTask: Task = {
      id: taskId,
      title: taskData.title,
      category: taskData.category,
      assigneeId: taskData.assigneeId,
      dueDate: taskData.dueDate,
      points: taskData.points,
      priority: taskData.priority,
      status: 'todo',
      checklist: checklistItems,
    };

    await supabase.from('tasks').insert([newTask]);
    setIsModalOpen(false);
  };

  if (!session) {
    return (
      <div className="pt-20 min-h-screen bg-slate-950">
        <AuthGate onLogin={handleLogin} />
      </div>
    );
  }

  const isAdmin = session.role === 'admin' || session.committeeCategory === 'Executives';

  const visibleTasks = tasks.filter((t) => {
    if (isAdmin) {
      if (selectedAdminTab === 'ALL') return true;
      return t.category === selectedAdminTab;
    }
    return t.category === session.committeeCategory || t.category === 'General';
  });

  const activeTasks = visibleTasks.filter((t) => t.status === 'todo' || t.status === 'in_progress');
  const pendingReviewTasks = visibleTasks.filter((t) => t.status === 'review');
  const completedTasks = visibleTasks.filter((t) => t.status === 'done');

  const leaderboard = validMembers
    .map((member) => {
      const doneTasks = tasks.filter((t) => t.assigneeId === member.id && t.status === 'done');
      const totalPoints = doneTasks.reduce((acc, curr) => acc + curr.points, 0);
      return { ...member, totalPoints, doneCount: doneTasks.length };
    })
    .sort((a, b) => b.totalPoints - a.totalPoints);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 pt-24 max-w-6xl mx-auto font-sans">
      {/* Header */}
      <header className="mb-6 border-b border-slate-800 pb-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">
              {session.committeeCategory} Portal
            </span>
            <span
              className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                isAdmin
                  ? 'bg-amber-950 text-amber-400 border-amber-800'
                  : 'bg-emerald-950 text-emerald-400 border-emerald-800'
              }`}
            >
              {isAdmin ? 'Executive Admin' : 'Committee Member'}
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">
            {isAdmin ? 'Executive Oversight Portal' : `${session.committeeCategory} & General Tasks`}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {isAdmin && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium px-4 py-2 rounded-lg transition shadow-lg shadow-indigo-600/20"
            >
              + Create Task
            </button>
          )}

          <button
            onClick={handleLogout}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-lg border border-slate-700"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Admin Tabs */}
      {isAdmin && (
        <div className="mb-6 flex flex-wrap gap-2 border-b border-slate-800/80 pb-4">
          <span className="text-xs font-semibold text-slate-400 self-center mr-2">Filter View:</span>
          {ADMIN_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedAdminTab(tab)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition ${
                selectedAdminTab === tab
                  ? 'bg-indigo-600 text-white border-indigo-500 font-semibold shadow-md'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* Pending Approval Section */}
          {pendingReviewTasks.length > 0 && (
            <div className="space-y-4 bg-amber-950/20 border border-amber-900/50 p-4 rounded-2xl">
              <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center justify-between">
                <span>⏳ Pending Admin Approval ({pendingReviewTasks.length})</span>
                <span className="text-[10px] text-amber-500/80 font-normal normal-case">
                  Points awarded upon approval
                </span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pendingReviewTasks.map((task) => {
                  const assignee = getMember(task.assigneeId);
                  return (
                    <div
                      key={task.id}
                      className="bg-slate-900 border border-amber-800/60 rounded-xl p-4 flex flex-col justify-between shadow-lg"
                    >
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                            {task.category} • Under Review
                          </span>
                          <span className="text-xs font-bold text-amber-400">
                            +{task.points} pts
                          </span>
                        </div>

                        <h3 className="text-sm font-semibold text-white mb-1">{task.title}</h3>
                        <p className="text-[11px] text-slate-400 mb-3">Submitted by {assignee?.name}</p>

                        <ul className="text-xs text-slate-400 space-y-1 mb-4">
                          {task.checklist.map((c) => (
                            <li key={c.id} className="flex items-center gap-1.5 text-slate-300">
                              <span className="text-emerald-400 font-bold">✓</span> {c.text}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={getAvatar(assignee)}
                            alt={assignee?.name || 'Member'}
                            className="w-6 h-6 rounded-full bg-slate-800 object-cover"
                          />
                          <span className="text-xs text-slate-300 font-medium">{assignee?.name}</span>
                        </div>

                        {isAdmin ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => rejectTask(task.id)}
                              className="text-[11px] px-2.5 py-1 bg-red-950 hover:bg-red-900 text-red-300 rounded border border-red-800 transition"
                            >
                              ✕ Reject
                            </button>
                            <button
                              onClick={() => approveTask(task.id)}
                              className="text-[11px] font-bold px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded shadow transition"
                            >
                              ✓ Approve
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] text-amber-400 italic bg-amber-950/60 px-2 py-1 rounded">
                            Awaiting Admin
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Active Tasks */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
              Active Work ({activeTasks.length})
            </h2>

            {activeTasks.length === 0 ? (
              <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-8 text-center text-slate-500 text-xs">
                No active tasks pending. All caught up!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeTasks.map((task) => {
                  const assignee = getMember(task.assigneeId);
                  const allChecklistDone =
                    task.checklist.length > 0 && task.checklist.every((c) => c.completed);

                  return (
                    <div
                      key={task.id}
                      className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition"
                    >
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <span
                            className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded border ${
                              task.category === 'General'
                                ? 'bg-sky-950 text-sky-300 border-sky-800'
                                : 'bg-slate-800 text-indigo-300 border-slate-700'
                            }`}
                          >
                            {task.category}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/50">
                              +{task.points} pts
                            </span>
                            {isAdmin && (
                              <button
                                onClick={() => deleteTask(task.id)}
                                className="text-slate-500 hover:text-red-400 text-xs px-1"
                                title="Delete Task"
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        </div>

                        <h3 className="text-sm font-semibold text-white mb-1">{task.title}</h3>
                        <p className="text-[11px] text-slate-400 mb-3">Due: {task.dueDate}</p>

                        <div className="space-y-1.5 mb-4">
                          {task.checklist.map((item) => (
                            <label
                              key={item.id}
                              className="flex items-start gap-2 text-xs text-slate-300 cursor-pointer select-none"
                            >
                              <input
                                type="checkbox"
                                checked={item.completed}
                                onChange={() => toggleChecklist(task.id, item.id)}
                                className="mt-0.5 rounded bg-slate-800 border-slate-700 text-indigo-500 focus:ring-0"
                              />
                              <span className={item.completed ? 'line-through text-slate-500' : ''}>
                                {item.text}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-800 flex justify-between items-center gap-2">
                        <div className="flex items-center gap-2">
                          <img
                            src={getAvatar(assignee)}
                            alt={assignee?.name || 'Member'}
                            className="w-6 h-6 rounded-full bg-slate-800 object-cover"
                          />
                          <span className="text-xs text-slate-300 font-medium truncate max-w-[100px]">
                            {assignee ? assignee.name : 'Unassigned'}
                          </span>
                        </div>

                        <button
                          onClick={() => submitForApproval(task.id)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition shadow-lg ${
                            allChecklistDone
                              ? 'bg-amber-600 hover:bg-amber-500 text-white border-amber-500 shadow-amber-900/30 animate-pulse'
                              : 'bg-indigo-950 hover:bg-indigo-600 text-indigo-300 hover:text-white border-indigo-800'
                          }`}
                        >
                          Submit for Approval
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Approved Tasks */}
          {completedTasks.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-800/80">
              <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
                Approved & Completed ({completedTasks.length})
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {completedTasks.map((task) => {
                  const assignee = getMember(task.assigneeId);
                  return (
                    <div
                      key={task.id}
                      className="bg-slate-900/60 border border-emerald-950/60 rounded-xl p-4 flex flex-col justify-between opacity-85 hover:opacity-100 transition"
                    >
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-900/40">
                            {task.category} • Approved
                          </span>
                          <span className="text-xs font-bold text-emerald-400">
                            +{task.points} pts credited
                          </span>
                        </div>

                        <h3 className="text-sm font-semibold text-slate-300 line-through mb-1">
                          {task.title}
                        </h3>
                      </div>

                      <div className="pt-2 border-t border-slate-800/60 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <img
                            src={getAvatar(assignee)}
                            alt={assignee?.name || 'Member'}
                            className="w-5 h-5 rounded-full bg-slate-800 object-cover"
                          />
                          <span className="text-xs text-slate-400">{assignee?.name}</span>
                        </div>

                        {isAdmin && (
                          <button
                            onClick={() => rejectTask(task.id)}
                            className="text-[10px] text-slate-500 hover:text-slate-300 underline"
                          >
                            Re-open
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Live Leaderboard */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
            Live Leaderboard
          </h2>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 divide-y divide-slate-800/60 max-h-[600px] overflow-y-auto">
            {leaderboard.map((member, idx) => (
              <div
                key={member.id}
                className="py-3 first:pt-0 last:pb-0 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-bold w-4 ${
                      idx === 0
                        ? 'text-amber-400'
                        : idx === 1
                        ? 'text-slate-300'
                        : idx === 2
                        ? 'text-amber-600'
                        : 'text-slate-600'
                    }`}
                  >
                    #{idx + 1}
                  </span>
                  <img
                    src={getAvatar(member)}
                    alt={member.name}
                    className="w-8 h-8 rounded-full bg-slate-800 object-cover"
                  />
                  <div>
                    <p className="text-xs font-semibold text-white">{member.name}</p>
                    <p className="text-[10px] text-slate-400">{member.role}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs font-bold text-amber-400">{member.totalPoints} pts</p>
                  <p className="text-[10px] text-slate-500">{member.doneCount} approved</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Task Modal */}
      {isModalOpen && (
        <TaskModal
          members={validMembers}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateTask}
        />
      )}
    </div>
  );
}