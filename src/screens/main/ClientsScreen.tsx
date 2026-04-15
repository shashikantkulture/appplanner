import { useMemo, useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';
import { GradientButton } from '@/components/GradientButton';
import { ScreenContainer } from '@/components/ScreenContainer';
import { supabase } from '@/services/supabase';
import { useAppStore } from '@/store/useAppStore';

export const ClientsScreen = () => {
  const { clients, setClients, profile } = useAppStore();
  const [search, setSearch] = useState('');
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  const filtered = useMemo(
    () => clients.filter((c) => `${c.name} ${c.business_name}`.toLowerCase().includes(search.toLowerCase())),
    [clients, search],
  );

  const addClient = async () => {
    if (!profile) return;
    const payload = {
      user_id: profile.id,
      name,
      business_name: businessName,
      contact_info: contactInfo,
      status: 'Active',
    };

    const { data, error } = await supabase.from('clients').insert(payload).select('*').single();
    if (error) return Alert.alert('Error', error.message);
    setClients([data as any, ...clients]);
    await supabase.from('activity_logs').insert({ user_id: profile.id, type: 'client_added', message: `Client added: ${name}` });
    setName('');
    setBusinessName('');
    setContactInfo('');
  };

  const removeClient = async (id: string) => {
    await supabase.from('clients').delete().eq('id', id);
    setClients(clients.filter((client) => client.id !== id));
  };

  return (
    <ScreenContainer>
      <Text className="mb-3 mt-4 text-2xl font-bold text-white">Clients</Text>
      <TextInput
        className="mb-3 rounded-xl bg-slate-800 p-3 text-white"
        placeholder="Search clients"
        placeholderTextColor="#64748b"
        value={search}
        onChangeText={setSearch}
      />
      <View className="mb-4 gap-2 rounded-2xl border border-slate-700/40 bg-slate-900/60 p-4">
        <TextInput className="rounded-xl bg-slate-800 p-3 text-white" placeholder="Client name" placeholderTextColor="#64748b" value={name} onChangeText={setName} />
        <TextInput className="rounded-xl bg-slate-800 p-3 text-white" placeholder="Business name" placeholderTextColor="#64748b" value={businessName} onChangeText={setBusinessName} />
        <TextInput className="rounded-xl bg-slate-800 p-3 text-white" placeholder="Contact info" placeholderTextColor="#64748b" value={contactInfo} onChangeText={setContactInfo} />
        <GradientButton label="Add Client" onPress={addClient} />
      </View>
      {filtered.map((client) => (
        <View key={client.id} className="mb-2 rounded-xl bg-slate-800/60 p-3">
          <Text className="font-semibold text-white">{client.name}</Text>
          <Text className="text-slate-400">{client.business_name}</Text>
          <Text className="text-slate-400">{client.contact_info}</Text>
          <Text className="mt-2 text-fuchsia-400" onPress={() => removeClient(client.id)}>
            Delete
          </Text>
        </View>
      ))}
    </ScreenContainer>
  );
};
