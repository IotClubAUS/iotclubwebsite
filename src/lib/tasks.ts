// src/lib/tasks.ts
import { Task } from './types';

export const INITIAL_TASKS: Task[] = [
  {
    id: "t1",
    title: "General: Attend IoT Club All-Hands Meeting",
    category: "General",
    assigneeId: 1, // Adam Serhan
    dueDate: "2026-10-05",
    points: 50,
    priority: "medium",
    status: "todo",
    checklist: [{ id: "c1", text: "Confirm attendance in Discord", completed: false }],
  },
  {
    id: "t2",
    title: "Order ESP32 & Sensor Kits for Workshop",
    category: "Technical",
    assigneeId: 12, // Adam Farag
    dueDate: "2026-10-12",
    points: 150,
    priority: "urgent",
    status: "in_progress",
    checklist: [
      { id: "c1", text: "Verify budget with Aseil", completed: true },
      { id: "c2", text: "Submit hardware list", completed: false },
    ],
  },
  {
    id: "t3",
    title: "Produce Instagram Reel for IoT Hackathon",
    category: "Media",
    assigneeId: 24, // Ahad Ali Suchedina
    dueDate: "2026-10-08",
    points: 120,
    priority: "high",
    status: "in_progress",
    checklist: [
      { id: "c1", text: "Film B-roll of microcontroller boards", completed: true },
      { id: "c2", text: "Edit video in Premiere", completed: false },
    ],
  },
  {
    id: "t4",
    title: "Book Engineering Hall B for Hands-on Demo",
    category: "Activities",
    assigneeId: 5, // Hashir Hameed
    dueDate: "2026-10-15",
    points: 100,
    priority: "medium",
    status: "todo",
    checklist: [{ id: "c1", text: "Submit hall reservation request", completed: false }],
  },
  {
    id: "t5",
    title: "Draft Sponsorship Proposal Pitch Deck",
    category: "Public Relations",
    assigneeId: 18, // Saachi Motwani
    dueDate: "2026-10-20",
    points: 200,
    priority: "high",
    status: "todo",
    checklist: [{ id: "c1", text: "Compile attendance stats", completed: true }],
  },
];