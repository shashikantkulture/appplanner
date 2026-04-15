import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

interface Props {
  unreadCount: number;
  onPress: () => void;
}

export const NotificationBell = ({ unreadCount, onPress }: Props) => (
  <Pressable onPress={onPress} className="relative">
    <Ionicons name="notifications-outline" size={24} color="#f8fafc" />
    {unreadCount > 0 && (
      <View className="absolute -right-2 -top-2 h-5 min-w-5 items-center justify-center rounded-full bg-fuchsia-500 px-1">
        <Text className="text-xs font-semibold text-white">{unreadCount}</Text>
      </View>
    )}
  </Pressable>
);
