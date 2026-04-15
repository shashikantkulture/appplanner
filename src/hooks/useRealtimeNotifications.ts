import { useEffect } from 'react';
import { supabase } from '@/services/supabase';
import { useAppStore } from '@/store/useAppStore';
import type { AppNotification } from '@/types/models';

export const useRealtimeNotifications = (userId?: string) => {
  const { setNotifications } = useAppStore();

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
          setNotifications((prev) => [payload.new as AppNotification, ...prev]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, setNotifications]);
};
