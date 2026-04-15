import { useEffect } from 'react';
import { supabase } from '@/services/supabase';
import { useAppStore } from '@/store/useAppStore';

export const useBootstrapData = (userId?: string) => {
  const { setClients, setTasks, setNotifications, setActivity } = useAppStore();

  useEffect(() => {
    if (!userId) return;

    const loadData = async () => {
      const [clientsRes, tasksRes, notificationsRes, activityRes] = await Promise.all([
        supabase.from('clients').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
        supabase.from('tasks').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
        supabase.from('notifications').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
        supabase.from('activity_logs').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
      ]);

      if (clientsRes.data) setClients(clientsRes.data as any);
      if (tasksRes.data) setTasks(tasksRes.data as any);
      if (notificationsRes.data) setNotifications(notificationsRes.data as any);
      if (activityRes.data) setActivity(activityRes.data as any);
    };

    loadData();
  }, [userId, setClients, setTasks, setNotifications, setActivity]);
};
