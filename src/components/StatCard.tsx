import { Text } from 'react-native';
import { GlassCard } from './GlassCard';

interface Props {
  label: string;
  value: number;
}

export const StatCard = ({ label, value }: Props) => (
  <GlassCard className="flex-1">
    <Text className="text-slate-400">{label}</Text>
    <Text className="mt-2 text-2xl font-bold text-white">{value}</Text>
  </GlassCard>
);
