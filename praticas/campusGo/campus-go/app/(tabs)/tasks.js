import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { getCurrentPlace } from '../../services/location';
import { scheduleReminder } from '../../services/notifications';
import { DoneIcon } from '../../components/DoneIcon';

const PRIMARY = '#4757B8';

const TASKS = [
  { id: '42', title: 'Lista de PDM', when: 'Hoje, 19h' },
  { id: '7', title: 'Resumo de Cálculo', when: 'Amanhã' },
  { id: '12', title: 'Projeto CampusGo', when: 'Sexta' },
];

/** Tarefas: navegação, check-in, lembrete local e conclusão com vibração. */
export default function TasksScreen() {
  const [label, setLabel] = useState('Sem check-in');
  const [doneCount, setDoneCount] = useState(0);

  async function handleCheckIn() {
    try {
      const place = await getCurrentPlace();
      if (!place) {
        Alert.alert('Sem localização', 'Permissão negada. Libere a localização nos ajustes para fazer check-in.');
        return;
      }
      setLabel(place.label);
    } catch {
      Alert.alert('Sem localização', 'Não foi possível obter sua posição agora. Verifique o GPS e tente de novo.');
    }
  }

  async function handleReminder() {
    try {
      const scheduled = await scheduleReminder('Estudar', 10);
      if (scheduled) {
        Alert.alert('Lembrete agendado', 'Uma notificação chega em cerca de 10 segundos.');
      } else {
        Alert.alert('Sem permissão', 'Libere as notificações nos ajustes para receber lembretes.');
      }
    } catch {
      Alert.alert('Erro', 'Não foi possível agendar o lembrete.');
    }
  }

  async function handleComplete() {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {
      // sem vibração (emulador, web): segue sem quebrar
    }
    setDoneCount((count) => count + 1);
    Alert.alert('Tarefa concluída');
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.section}>Próximas tarefas</Text>
      {TASKS.map((task) => (
        <Link key={task.id} href={`/task/${task.id}`} asChild>
          <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
            <View>
              <Text style={styles.cardTitle}>{task.title}</Text>
              <Text style={styles.cardWhen}>{task.when}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#5F6070" />
          </Pressable>
        </Link>
      ))}

      <Link href="/new-task" asChild>
        <Pressable style={({ pressed }) => [styles.outline, pressed && styles.pressed]}>
          <Text style={styles.outlineText}>+ Nova tarefa</Text>
        </Pressable>
      </Link>

      <Text style={styles.section}>Check-in</Text>
      <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={handleCheckIn}>
        <Text style={styles.buttonText}>Estudei aqui</Text>
      </Pressable>
      <Text style={styles.label}>{label}</Text>

      <Text style={styles.section}>Lembrete e conclusão</Text>
      <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={handleReminder}>
        <Text style={styles.buttonText}>Lembrar em 10 s</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [styles.button, styles.buttonSpaced, pressed && styles.pressed]}
        onPress={handleComplete}
      >
        <Text style={styles.buttonText}>Concluir</Text>
      </Pressable>

      <View style={styles.doneRow}>
        <DoneIcon trigger={doneCount}>
          <Ionicons name="checkmark-circle" size={32} color={doneCount > 0 ? '#2E9E5B' : '#B4B4C0'} />
        </DoneIcon>
        <Text style={styles.doneText}>Concluídas nesta sessão: {doneCount}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { padding: 16, paddingBottom: 32 },
  section: { fontSize: 16, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EBECF9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  cardWhen: { color: '#5F6070', marginTop: 2 },
  outline: { borderWidth: 1, borderColor: PRIMARY, borderRadius: 8, paddingVertical: 10, alignItems: 'center', marginTop: 4 },
  outlineText: { color: PRIMARY, fontWeight: '600' },
  button: { backgroundColor: PRIMARY, borderRadius: 8, paddingVertical: 12, alignItems: 'center' },
  buttonSpaced: { marginTop: 10 },
  buttonText: { color: '#FFFFFF', fontWeight: '600', fontSize: 16 },
  pressed: { opacity: 0.6 },
  label: { marginTop: 10, fontSize: 15, color: '#1E1E24' },
  doneRow: { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
  doneText: { marginLeft: 10, color: '#5F6070' },
});
