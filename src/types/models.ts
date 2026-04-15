export type ClientStatus = 'Active' | 'Inactive';
export type TaskStatus = 'Pending' | 'In Progress' | 'Done';

export interface Profile {
  id: string;
  full_name: string;
  email: string;
}

export interface Client {
  id: string;
  user_id: string;
  name: string;
  business_name: string;
  contact_info: string;
  status: ClientStatus;
  created_at: string;
}

export interface TaskItem {
  id: string;
  client_id: string;
  user_id: string;
  title: string;
  description: string;
  deadline: string;
  status: TaskStatus;
  created_at: string;
}

export interface AppNotification {
  id: string;
  user_id: string;
  task_id: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  type: 'task_added' | 'task_completed' | 'client_added' | 'task_updated';
  message: string;
  created_at: string;
}
