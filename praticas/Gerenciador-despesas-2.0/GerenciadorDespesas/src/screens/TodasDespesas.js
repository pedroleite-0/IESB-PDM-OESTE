import { useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, Platform, StyleSheet, useColorScheme } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import SeletorCategoria from '../components/despesa/SeletorCategoria';
import { useExpenses } from '../store/expenses-context';
import { useDebounce } from '../hooks/useDebounce';
import { getTheme } from '../constants/theme';
import { CATEGORIES, FILTER_ALL } from '../constants/categories';

function TodasDespesas() {
  const colors = getTheme(useColorScheme());
  const { expenses, clearExpenses } = useExpenses();

  const [query, setQuery] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState(FILTER_ALL);

  // a busca só é aplicada 400 ms depois da última letra digitada
  const debouncedQuery = useDebounce(query, 400);

  // busca (sem diferenciar maiúsculas) + categoria; o total reflete os dois filtros
  const filtradas = useMemo(() => {
    const termo = debouncedQuery.trim().toLowerCase();
    return expenses.filter(
      (despesa) =>
        despesa.description.toLowerCase().includes(termo) &&
        (categoriaFiltro === FILTER_ALL || despesa.category === categoriaFiltro)
    );
  }, [expenses, debouncedQuery, categoriaFiltro]);

  function limparTudo() {
    if (Platform.OS === 'web') {
      if (window.confirm('Apagar todas as despesas? Esta ação não pode ser desfeita.')) {
        clearExpenses();
      }
      return;
    }
    Alert.alert('Limpar tudo', 'Apagar todas as despesas? Esta ação não pode ser desfeita.', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Apagar tudo', style: 'destructive', onPress: clearExpenses },
    ]);
  }

  const temDespesas = expenses.length > 0;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TextInput
        style={[
          styles.busca,
          { borderColor: colors.border, backgroundColor: colors.inputBackground, color: colors.text },
        ]}
        placeholder="Buscar despesa..."
        placeholderTextColor={colors.textSecondary}
        value={query}
        onChangeText={setQuery}
        autoCorrect={false}
      />

      <SeletorCategoria
        categorias={[FILTER_ALL, ...CATEGORIES]}
        selecionada={categoriaFiltro}
        onSelecionar={setCategoriaFiltro}
      />

      <DespesaSaida
        despesas={filtradas}
        periodo="Total"
        tituloVazio={temDespesas ? 'Nenhuma despesa encontrada.' : 'Nenhuma despesa.'}
        dicaVazia={temDespesas ? 'Tente outro termo ou categoria.' : 'Toque em + para adicionar.'}
      />

      {temDespesas && (
        <Pressable onPress={limparTudo} style={({ pressed }) => [styles.limpar, pressed && styles.pressionado]}>
          <Text style={[styles.limparTexto, { color: colors.danger }]}>Limpar tudo</Text>
        </Pressable>
      )}
    </View>
  );
}

export default TodasDespesas;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  busca: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 12,
  },
  limpar: { alignItems: 'center', paddingVertical: 10 },
  limparTexto: { fontWeight: '600' },
  pressionado: { opacity: 0.6 },
});
