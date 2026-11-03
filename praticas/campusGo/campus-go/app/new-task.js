import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

/** Modal de nova tarefa. */
export default function NewTaskScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Nova tarefa</Text>
      <Text style={styles.subtitle}>Esta tela abriu como modal.</Text>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Fechar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#FFFFFF' },
  title: { fontSize: 22, fontWeight: 'bold' },
  subtitle: { color: '#5F6070', marginTop: 8, marginBottom: 24 },
  button: { backgroundColor: '#4757B8', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 32 },
  buttonText: { color: '#FFFFFF', fontWeight: '600', fontSize: 16 },
  pressed: { opacity: 0.6 },
});
