import { useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';
import { GradientButton } from '@/components/GradientButton';
import { ScreenContainer } from '@/components/ScreenContainer';
import { supabase } from '@/services/supabase';

export const AuthScreen = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleAuth = async () => {
    if (isSignup) {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) return Alert.alert('Signup failed', error.message);
      if (data.user) {
        await supabase.from('users').upsert({
          id: data.user.id,
          full_name: fullName || 'New User',
          email,
        });
      }
      Alert.alert('Success', 'Account created. Check your email for verification if enabled.');
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return Alert.alert('Login failed', error.message);
  };

  return (
    <ScreenContainer>
      <View className="mt-12">
        <Text className="text-3xl font-bold text-white">ClientFlow Pro</Text>
        <Text className="mt-2 text-slate-400">Premium client ops for digital agencies.</Text>
      </View>

      <View className="mt-10 gap-4 rounded-2xl border border-slate-700/40 bg-slate-900/60 p-5">
        {isSignup && (
          <TextInput
            className="rounded-xl bg-slate-800 p-4 text-white"
            placeholder="Full name"
            placeholderTextColor="#64748b"
            value={fullName}
            onChangeText={setFullName}
          />
        )}
        <TextInput
          className="rounded-xl bg-slate-800 p-4 text-white"
          placeholder="Email"
          autoCapitalize="none"
          placeholderTextColor="#64748b"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="rounded-xl bg-slate-800 p-4 text-white"
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#64748b"
          value={password}
          onChangeText={setPassword}
        />
        <GradientButton label={isSignup ? 'Create Account' : 'Sign In'} onPress={handleAuth} />
        <Text className="text-center text-slate-400" onPress={() => setIsSignup((prev) => !prev)}>
          {isSignup ? 'Have an account? Sign in' : 'No account? Create one'}
        </Text>
      </View>
    </ScreenContainer>
  );
};
