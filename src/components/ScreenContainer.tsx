import { ReactNode } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

export const ScreenContainer = ({ children }: { children: ReactNode }) => (
  <SafeAreaView className="flex-1 bg-bg">
    <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  </SafeAreaView>
);
