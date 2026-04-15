import { Text, View } from 'react-native';
import { FloatingDailyPanel } from '@/components/FloatingDailyPanel';
import { NotificationBell } from '@/components/NotificationBell';
import { ScreenContainer } from '@/components/ScreenContainer';
import { StatCard } from '@/components/StatCard';
import { useAppStore } from '@/store/useAppStore';

export const DashboardScreen = () => {
  const { profile, clients, tasks, activity, notifications, toggleSidebar } = useAppStore();
  const activeTasks = tasks.filter((t) => t.status !== 'Done').length;
  const completedTasks = tasks.filter((t) => t.status === 'Done').length;
  const unread = notifications.filter((n) => !n.is_read).length;

  return (
    <View className="flex-1 bg-bg">
      <ScreenContainer>
        <View className="mb-6 mt-4 flex-row items-center justify-between">
          <View>
            <Text className="text-sm text-slate-400">Welcome back</Text>
            <Text className="text-2xl font-bold text-white">{profile?.full_name || 'Agency Owner'}</Text>
          </View>
          <NotificationBell unreadCount={unread} onPress={toggleSidebar} />
        </View>

        <View className="mb-5 flex-row gap-3">
          <StatCard label="Total Clients" value={clients.length} />
          <StatCard label="Active Tasks" value={activeTasks} />
        </View>
        <View className="mb-6">
          <StatCard label="Completed Tasks" value={completedTasks} />
        </View>

        <Text className="mb-3 text-lg font-semibold text-white">Recent Activity</Text>
        {activity.slice(0, 8).map((item) => (
          <View key={item.id} className="mb-2 rounded-xl bg-slate-800/55 p-3">
            <Text className="text-slate-100">{item.message}</Text>
            <Text className="text-xs text-slate-400">{new Date(item.created_at).toLocaleString()}</Text>
          </View>
        ))}
      </ScreenContainer>
      <FloatingDailyPanel />
    </View>
  );
};
