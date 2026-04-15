import { useEffect, useState } from 'react';
import { supabase } from '@/services/supabase';
import { useAppStore } from '@/store/useAppStore';

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const { profile, setProfile } = useAppStore();

  useEffect(() => {
    supabase.auth.getSession().finally(() => setLoading(false));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_, session) => {
      if (!session?.user) {
        setProfile(null);
        return;
      }

      const { data } = await supabase
        .from('users')
        .select('id,full_name,email')
        .eq('id', session.user.id)
        .single();

      if (data) {
        setProfile(data);
      }
    });

    return () => subscription.unsubscribe();
  }, [setProfile]);

  return { loading, profile };
};
