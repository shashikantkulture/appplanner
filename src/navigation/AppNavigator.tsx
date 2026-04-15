import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, View } from 'react-native';
import { AuthScreen } from '@/screens/auth/AuthScreen';
import { ClientsScreen } from '@/screens/main/ClientsScreen';
import { DashboardScreen } from '@/screens/main/DashboardScreen';
import { SettingsScreen } from '@/screens/main/SettingsScreen';
import { TasksScreen } from '@/screens/main/TasksScreen';
import { useAuth } from '@/hooks/useAuth';
import { useBootstrapData } from '@/hooks/useBootstrapData';
import { useRealtimeNotifications } from '@/hooks/useRealtimeNotifications';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: { backgroundColor: '#0b1222', borderTopColor: '#1e293b' },
      tabBarActiveTintColor: '#60a5fa',
      tabBarInactiveTintColor: '#64748b',
      tabBarIcon: ({ color, size }) => {
        const map: Record<string, keyof typeof Ionicons.glyphMap> = {
          Home: 'grid-outline',
          Clients: 'people-outline',
          Tasks: 'checkbox-outline',
          Settings: 'settings-outline',
        };
        return <Ionicons name={map[route.name]} color={color} size={size} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={DashboardScreen} />
    <Tab.Screen name="Clients" component={ClientsScreen} />
    <Tab.Screen name="Tasks" component={TasksScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);

export const AppNavigator = () => {
  const { loading, profile } = useAuth();
  useBootstrapData(profile?.id);
  useRealtimeNotifications(profile?.id);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-bg">
        <ActivityIndicator color="#60a5fa" />
      </View>
    );
  }

  return (
    <NavigationContainer
      theme={{
        ...DarkTheme,
        colors: { ...DarkTheme.colors, background: '#0f172a' },
      }}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {profile ? <Stack.Screen name="Main" component={MainTabs} /> : <Stack.Screen name="Auth" component={AuthScreen} />}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
