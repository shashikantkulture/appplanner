import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { ActivityLog, AppNotification, Client, Profile, TaskItem } from '@/types/models';

interface AppState {
  profile: Profile | null;
  clients: Client[];
  tasks: TaskItem[];
  notifications: AppNotification[];
  activity: ActivityLog[];
  isSidebarOpen: boolean;
  setProfile: (profile: Profile | null) => void;
  setClients: (clients: Client[]) => void;
  setTasks: (tasks: TaskItem[]) => void;
  setNotifications: (notifications: AppNotification[] | ((prev: AppNotification[]) => AppNotification[])) => void;
  setActivity: (activity: ActivityLog[]) => void;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      profile: null,
      clients: [],
      tasks: [],
      notifications: [],
      activity: [],
      isSidebarOpen: false,
      setProfile: (profile) => set({ profile }),
      setClients: (clients) => set({ clients }),
      setTasks: (tasks) => set({ tasks }),
      setNotifications: (notifications) =>
        set((state) => ({
          notifications: typeof notifications === 'function' ? notifications(state.notifications) : notifications,
        })),
      setActivity: (activity) => set({ activity }),
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    }),
    {
      name: 'clientflow-cache',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        profile: state.profile,
        clients: state.clients,
        tasks: state.tasks,
        notifications: state.notifications,
        activity: state.activity,
      }),
    },
  ),
);
