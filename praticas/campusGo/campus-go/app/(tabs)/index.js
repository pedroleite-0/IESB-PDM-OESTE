import { ActivityIndicator, Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNotices } from '../../hooks/useNotices';
import { FadeIn } from '../../components/FadeIn';
import { api } from '../../services/api';

const PRIMARY = '#4757B8';

/** Mural de avisos: carregando, erro e sucesso. */
export default function HomeScreen() {
  const { notices, isLoading, error, reload } = useNotices();

  // bônus: cria um aviso (o JSONPlaceholder responde, mas não grava de verdade)
  async function handleCreate() {
    try {
      const created = await api.create('posts', {
        title: 'Novo aviso',
        body: 'Aviso criado pelo CampusGo.',
        userId: 1,
      });
      Alert.alert('Aviso criado', `A API devolveu o id ${created.id}.`);
    } catch (err) {
      Alert.alert('Não foi possível criar', err.message);
    }
  }

  // 1) carregando
  if (isLoading && notices.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={PRIMARY} />
        <Text style={styles.muted}>Carregando avisos...</Text>
      </View>
    );
  }

  // 2) erro
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Não foi possível carregar</Text>
        <Text style={styles.muted}>{error}</Text>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          onPress={reload}
        >
          <Text style={styles.buttonText}>Tentar novamente</Text>
        </Pressable>
      </View>
    );
  }

  // 3) sucesso
  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.listContent}
      data={notices}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => <NoticeCard notice={item} />}
      refreshing={isLoading}
      onRefresh={reload}
      ListHeaderComponent={
        <Pressable
          style={({ pressed }) => [styles.createButton, pressed && styles.pressed]}
          onPress={handleCreate}
        >
          <Text style={styles.createText}>+ Criar aviso</Text>
        </Pressable>
      }
      ListEmptyComponent={<Text style={styles.empty}>Nenhum aviso por enquanto.</Text>}
    />
  );
}

/** Cartão de um aviso, com surgimento suave. */
function NoticeCard({ notice }) {
  return (
    <FadeIn>
      <View style={styles.card}>
        <Text style={styles.title}>{notice.title}</Text>
        <Text numberOfLines={2} style={styles.body}>
          {notice.body}
        </Text>
      </View>
    </FadeIn>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#FFFFFF' },
  muted: { color: '#5F6070', marginTop: 8, textAlign: 'center' },
  errorTitle: { fontSize: 18, fontWeight: 'bold', color: '#E31E24' },
  button: { backgroundColor: PRIMARY, borderRadius: 8, paddingVertical: 12, paddingHorizontal: 24, marginTop: 20 },
  buttonText: { color: '#FFFFFF', fontWeight: '600', fontSize: 16 },
  pressed: { opacity: 0.6 },
  list: { backgroundColor: '#FFFFFF' },
  listContent: { padding: 16 },
  createButton: { borderWidth: 1, borderColor: PRIMARY, borderRadius: 8, paddingVertical: 10, alignItems: 'center', marginBottom: 12 },
  createText: { color: PRIMARY, fontWeight: '600' },
  card: { backgroundColor: '#EBECF9', borderRadius: 8, padding: 12, marginBottom: 10 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  body: { color: '#1E1E24' },
  empty: { textAlign: 'center', color: '#5F6070', marginTop: 32 },
});
