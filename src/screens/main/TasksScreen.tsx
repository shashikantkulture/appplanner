import * as ImagePicker from 'expo-image-picker';
import { useMemo, useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';
import { GradientButton } from '@/components/GradientButton';
import { ScreenContainer } from '@/components/ScreenContainer';
import { supabase } from '@/services/supabase';
import { useAppStore } from '@/store/useAppStore';

export const TasksScreen = () => {
  const { tasks, clients, setTasks, profile } = useAppStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('2026-12-31');
  const [clientId, setClientId] = useState('');

  const grouped = useMemo(
    () => ({
      pending: tasks.filter((task) => task.status === 'Pending'),
      inProgress: tasks.filter((task) => task.status === 'In Progress'),
      done: tasks.filter((task) => task.status === 'Done'),
    }),
    [tasks],
  );

  const addTask = async () => {
    if (!profile || !clientId) return Alert.alert('Missing fields', 'Select a client and fill fields.');
    const payload = { user_id: profile.id, client_id: clientId, title, description, deadline, status: 'Pending' };
    const { data, error } = await supabase.from('tasks').insert(payload).select('*').single();
    if (error) return Alert.alert('Error', error.message);

    setTasks([data as any, ...tasks]);
    await supabase.from('activity_logs').insert({ user_id: profile.id, type: 'task_added', message: `Task added: ${title}` });

    setTitle('');
    setDescription('');
  };

  const markDone = async (id: string) => {
    const { error } = await supabase.from('tasks').update({ status: 'Done' }).eq('id', id);
    if (error) return Alert.alert('Error', error.message);

    const updated = tasks.map((task) => (task.id === id ? { ...task, status: 'Done' as const } : task));
    setTasks(updated);

    const task = tasks.find((t) => t.id === id);
    if (task && profile) {
      await supabase.from('notifications').insert({
        user_id: profile.id,
        task_id: task.id,
        message: `Task updated: ${task.title} marked Done`,
        is_read: false,
      });
      await supabase.from('activity_logs').insert({ user_id: profile.id, type: 'task_completed', message: `Task completed: ${task.title}` });
    }
  };

  const moveToInProgress = async (id: string) => {
    const { error } = await supabase.from('tasks').update({ status: 'In Progress' }).eq('id', id);
    if (error) return Alert.alert('Error', error.message);
    const updated = tasks.map((task) => (task.id === id ? { ...task, status: 'In Progress' as const } : task));
    setTasks(updated);
  };

  const uploadAttachment = async (taskId: string) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 0.8,
    });
    if (result.canceled) return;

    const file = result.assets[0];
    const response = await fetch(file.uri);
    const blob = await response.blob();
    const ext = file.fileName?.split('.').pop() || 'jpg';
    const path = `${taskId}/${Date.now()}.${ext}`;

    const { error } = await supabase.storage.from('task-files').upload(path, blob, { upsert: true });
    if (error) return Alert.alert('Upload failed', error.message);
    Alert.alert('Upload complete', 'Attachment uploaded to Supabase Storage.');
  };

  const TaskColumn = ({ titleLabel, list }: { titleLabel: string; list: typeof tasks }) => (
    <View className="mb-4 rounded-2xl border border-slate-700/40 bg-slate-900/60 p-3">
      <Text className="mb-2 text-lg font-semibold text-white">{titleLabel}</Text>
      {list.map((task) => (
        <View key={task.id} className="mb-2 rounded-xl bg-slate-800/60 p-3">
          <Text className="font-semibold text-white">{task.title}</Text>
          <Text className="text-slate-400">{task.description}</Text>
          <Text className="text-xs text-slate-500">Deadline: {task.deadline}</Text>
          <View className="mt-2 flex-row gap-4">
            {task.status !== 'Done' && (
              <Text className="text-blue-400" onPress={() => markDone(task.id)}>
                Mark done
              </Text>
            )}
            {task.status === 'Pending' && (
              <Text className="text-cyan-400" onPress={() => moveToInProgress(task.id)}>
                Start
              </Text>
            )}
            <Text className="text-fuchsia-400" onPress={() => uploadAttachment(task.id)}>
              Upload file
            </Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <ScreenContainer>
      <Text className="mb-3 mt-4 text-2xl font-bold text-white">Task Tracker</Text>
      <View className="mb-4 gap-2 rounded-2xl border border-slate-700/40 bg-slate-900/60 p-4">
        <TextInput className="rounded-xl bg-slate-800 p-3 text-white" placeholder="Task title" placeholderTextColor="#64748b" value={title} onChangeText={setTitle} />
        <TextInput className="rounded-xl bg-slate-800 p-3 text-white" placeholder="Description" placeholderTextColor="#64748b" value={description} onChangeText={setDescription} />
        <TextInput className="rounded-xl bg-slate-800 p-3 text-white" placeholder="Deadline (YYYY-MM-DD)" placeholderTextColor="#64748b" value={deadline} onChangeText={setDeadline} />
        <TextInput
          className="rounded-xl bg-slate-800 p-3 text-white"
          placeholder="Client ID"
          placeholderTextColor="#64748b"
          value={clientId}
          onChangeText={setClientId}
        />
        <Text className="text-xs text-slate-500">Available clients: {clients.map((c) => c.name).join(', ') || 'none'}</Text>
        <GradientButton label="Add Task" onPress={addTask} />
      </View>

      <TaskColumn titleLabel="Pending" list={grouped.pending} />
      <TaskColumn titleLabel="In Progress" list={grouped.inProgress} />
      <TaskColumn titleLabel="Done" list={grouped.done} />
    </ScreenContainer>
  );
};
