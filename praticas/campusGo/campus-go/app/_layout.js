import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ExpensesContextProvider } from '../store/expenses-context';

/** Layout raiz: providers globais + pilha principal do app. */
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ExpensesContextProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerTintColor: '#4757B8' }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="task/[id]" options={{ title: 'Tarefa' }} />
          <Stack.Screen
            name="new-task"
            options={{ presentation: 'modal', title: 'Nova tarefa' }}
          />
        </Stack>
      </ExpensesContextProvider>
    </SafeAreaProvider>
  );
}
