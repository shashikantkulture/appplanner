import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Text } from 'react-native';

interface Props {
  label: string;
  onPress: () => void;
}

export const GradientButton = ({ label, onPress }: Props) => (
  <Pressable onPress={onPress}>
    <LinearGradient colors={['#2563eb', '#7c3aed']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} className="rounded-2xl px-4 py-3">
      <Text className="text-center font-semibold text-slate-50">{label}</Text>
    </LinearGradient>
  </Pressable>
);
