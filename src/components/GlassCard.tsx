import { BlurView } from 'expo-blur';
import { ReactNode } from 'react';
import { View } from 'react-native';

interface Props {
  children: ReactNode;
  className?: string;
}

export const GlassCard = ({ children, className = '' }: Props) => {
  return (
    <BlurView intensity={35} tint="dark" className={`overflow-hidden rounded-2xl border border-slate-700/40 ${className}`}>
      <View className="bg-slate-800/40 p-4">{children}</View>
    </BlurView>
  );
};
