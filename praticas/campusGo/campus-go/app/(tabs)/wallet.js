import { FlatList, Pressable, Share, StyleSheet, Text, View } from 'react-native';
import { useExpenses } from '../../store/expenses-context';

const PRIMARY = '#4757B8';

/** Bolso: total das despesas da Aula 09, lido do contexto global. */
export default function WalletScreen() {
  const { expenses, addExpense, clearExpenses } = useExpenses();

  // lista vazia dá 0 (valor inicial do reduce), sem quebrar
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);

  async function shareSummary() {
    try {
      await Share.share({ message: `Gastei R$ ${total.toFixed(2)} neste semestre.` });
    } catch {
      // usuário fechou o menu ou o sistema recusou: nada a fazer
    }
  }

  // despesa de exemplo, só para testar o Bolso sem uma tela de cadastro
  function addSample() {
    addExpense({
      description: 'Almoço no campus',
      amount: 32.5,
      date: new Date(),
      category: 'Alimentação',
    });
  }

  return (
    <View style={styles.screen}>
      <View style={styles.totalBox}>
        <Text style={styles.totalLabel}>Total gasto</Text>
        <Text style={styles.total}>R$ {total.toFixed(2)}</Text>
        <Text style={styles.count}>
          {expenses.length} {expenses.length === 1 ? 'despesa' : 'despesas'}
        </Text>
      </View>

      <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={shareSummary}>
        <Text style={styles.buttonText}>Compartilhar resumo</Text>
      </Pressable>

      <FlatList
        style={styles.list}
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.rowText}>{item.description}</Text>
            <Text style={styles.rowValue}>R$ {item.amount.toFixed(2)}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Nenhuma despesa ainda.</Text>}
      />

      <View style={styles.footer}>
        <Pressable style={({ pressed }) => [styles.outline, pressed && styles.pressed]} onPress={addSample}>
          <Text style={styles.outlineText}>+ Despesa de exemplo</Text>
        </Pressable>
        {expenses.length > 0 && (
          <Pressable onPress={clearExpenses} style={({ pressed }) => [styles.clear, pressed && styles.pressed]}>
            <Text style={styles.clearText}>Limpar despesas</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16, backgroundColor: '#FFFFFF' },
  totalBox: { backgroundColor: '#EBECF9', borderRadius: 8, padding: 16, alignItems: 'center', marginBottom: 12 },
  totalLabel: { color: '#5F6070' },
  total: { fontSize: 32, fontWeight: 'bold', color: PRIMARY, marginVertical: 4 },
  count: { color: '#5F6070', fontSize: 12 },
  button: { backgroundColor: PRIMARY, borderRadius: 8, paddingVertical: 12, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontWeight: '600', fontSize: 16 },
  pressed: { opacity: 0.6 },
  list: { marginTop: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#C9CBE0' },
  rowText: { fontSize: 15 },
  rowValue: { fontWeight: 'bold' },
  empty: { textAlign: 'center', color: '#5F6070', marginTop: 24 },
  footer: { paddingTop: 8 },
  outline: { borderWidth: 1, borderColor: PRIMARY, borderRadius: 8, paddingVertical: 10, alignItems: 'center' },
  outlineText: { color: PRIMARY, fontWeight: '600' },
  clear: { alignItems: 'center', paddingVertical: 10 },
  clearText: { color: '#E31E24', fontWeight: '600' },
});
