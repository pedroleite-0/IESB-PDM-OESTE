import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { getTheme } from '../../constants/theme';

// Cabeçalho da lista: período, quantidade e total das despesas exibidas.
function DespesaSumario({ despesas, periodo }) {
  const colors = getTheme(useColorScheme());

  const total = despesas.reduce((acumulador, item) => acumulador + item.amount, 0);
  const quantidade = despesas.length;

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <View>
        <Text style={[styles.periodo, { color: colors.text }]}>{periodo}</Text>
        <Text style={[styles.quantidade, { color: colors.textSecondary }]}>
          {quantidade} {quantidade === 1 ? 'despesa' : 'despesas'}
        </Text>
      </View>
      <Text style={[styles.total, { color: colors.primary }]}>R$ {total.toFixed(2)}</Text>
    </View>
  );
}

export default DespesaSumario;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  periodo: { fontSize: 14, fontWeight: '600' },
  quantidade: { fontSize: 12, marginTop: 2 },
  total: { fontSize: 18, fontWeight: 'bold' },
});
