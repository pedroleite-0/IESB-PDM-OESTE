import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Como a notificação aparece com o app aberto.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

/** Cria o canal no Android e pede permissão. Devolve true se liberada. */
async function ensurePermission() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Lembretes',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }

  const { granted } = await Notifications.requestPermissionsAsync();
  return granted;
}

/**
 * Agenda uma notificação LOCAL (não é push) para daqui a `seconds` segundos.
 * Devolve true se agendou e false se a permissão foi negada.
 */
export async function scheduleReminder(title, seconds) {
  if (!(await ensurePermission())) return false;

  const { TIME_INTERVAL } = Notifications.SchedulableTriggerInputTypes;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'CampusGo',
      body: `Não esqueça: ${title}`,
    },
    trigger: { type: TIME_INTERVAL, seconds, channelId: 'default' },
  });
  return true;
}
