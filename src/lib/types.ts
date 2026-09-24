// src/lib/types.ts

export type RoleCategory = "Executives" | "Activities" | "Technical" | "Public Relations" | "Media" | "General";
export type TaskStatus = "todo" | "in_progress" | "review" | "done";
export type Priority = "low" | "medium" | "high" | "urgent";

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface Member {
  id: number;
  name: string;
  role: string;
  category: RoleCategory | RoleCategory[];
  bio: string;
  skills: string[];
  img: string;
  github?: string;
  linkedin?: string;
}

export interface Task {
  id: string;
  title: string;
  category: RoleCategory;
  assigneeId: number;
  dueDate: string;
  points: number;
  priority: Priority;
  status: TaskStatus;
  checklist: ChecklistItem[];
}

export interface UserSession {
  username: string;
  role: 'admin' | 'committee';
  committeeCategory: RoleCategory; // "Executives", "Technical", "General", etc.
}