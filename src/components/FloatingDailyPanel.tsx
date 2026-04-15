import { MotiView } from 'moti';
import { Text, View } from 'react-native';
import { useAppStore } from '@/store/useAppStore';
import { isToday } from '@/utils/date';

export const FloatingDailyPanel = () => {
  const { isSidebarOpen, tasks } = useAppStore();
  const todayTasks = tasks.filter((task) => isToday(task.deadline));

  return (
    <MotiView
      from={{ translateX: 280, opacity: 0 }}
      animate={{ translateX: isSidebarOpen ? 0 : 280, opacity: isSidebarOpen ? 1 : 0 }}
      transition={{ type: 'timing', duration: 300 }}
      className="absolute right-4 top-24 w-64 rounded-2xl border border-slate-700/50 bg-slate-900/95 p-4"
    >
      <Text className="mb-2 text-base font-semibold text-white">Today’s Work</Text>
      {todayTasks.length === 0 ? (
        <Text className="text-sm text-slate-400">No tasks due today.</Text>
      ) : (
        todayTasks.map((task) => (
          <View key={task.id} className="mb-2 rounded-xl bg-slate-800/60 p-2">
            <Text className="text-sm font-medium text-slate-100">{task.title}</Text>
            <Text className="text-xs text-slate-400">{task.status}</Text>
          </View>
        ))
      )}
    </MotiView>
  );
};
