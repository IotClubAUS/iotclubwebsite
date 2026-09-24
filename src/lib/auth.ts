// src/lib/auth.ts
import { RoleCategory } from './types';

export interface CommitteeAccount {
  username: string;
  password: string;
  committee: RoleCategory;
  role: 'admin' | 'committee';
  label: string;
}

export const ACCOUNTS: CommitteeAccount[] = [
  {
    username: 'exec_admin',
    password: 'admin123',
    committee: 'Executives',
    role: 'admin',
    label: 'Executives / Admin (Full Access)',
  },
  {
    username: 'tech_team',
    password: 'tech',
    committee: 'Technical',
    role: 'committee',
    label: 'Technical Committee',
  },
  {
    username: 'activities_team',
    password: 'activities',
    committee: 'Activities',
    role: 'committee',
    label: 'Activities Committee',
  },
  {
    username: 'pr_team',
    password: 'pr',
    committee: 'Public Relations',
    role: 'committee',
    label: 'Public Relations Committee',
  },
  {
    username: 'media_team',
    password: 'media',
    committee: 'Media',
    role: 'committee',
    label: 'Media Committee',
  },
];