import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getTheme } from '../../constants/theme';

// Estado vazio: ícone + mensagem + orientação do que fazer.
function ListaVazia({ titulo, dica }) {
  const colors = getTheme(useColorScheme());

  return (
    <View style={styles.container}>
      <Ionicons name="wallet-outline" size={56} color={colors.textSecondary} />
      <Text style={[styles.titulo, { color: colors.text }]}>{titulo}</Text>
      <Text style={[styles.dica, { color: colors.textSecondary }]}>{dica}</Text>
    </View>
  );
}

export default ListaVazia;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 24,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    textAlign: 'center',
  },
  dica: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
});
