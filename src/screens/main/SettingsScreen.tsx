import { Alert, Text, View } from 'react-native';
import { GradientButton } from '@/components/GradientButton';
import { ScreenContainer } from '@/components/ScreenContainer';
import { supabase } from '@/services/supabase';
import { useAppStore } from '@/store/useAppStore';

export const SettingsScreen = () => {
  const { profile } = useAppStore();

  const onLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert('Logout error', error.message);
  };

  return (
    <ScreenContainer>
      <Text className="mb-3 mt-4 text-2xl font-bold text-white">Settings</Text>
      <View className="rounded-2xl border border-slate-700/40 bg-slate-900/60 p-4">
        <Text className="text-lg text-white">{profile?.full_name}</Text>
        <Text className="mb-5 text-slate-400">{profile?.email}</Text>
        <GradientButton label="Logout" onPress={onLogout} />
      </View>
    </ScreenContainer>
  );
};
