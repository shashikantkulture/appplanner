import { useEffect } from 'react';
import { supabase } from '@/services/supabase';
import { useAppStore } from '@/store/useAppStore';

export const useRealtimeNotifications = (userId?: string) => {
  const { notifications, setNotifications } = useAppStore();

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel('notifications-channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          setNotifications([payload.new as any, ...notifications]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, notifications, setNotifications]);
};
