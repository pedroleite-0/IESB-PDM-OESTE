import { useMemo } from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { useExpenses } from '../store/expenses-context';
import { getDataMenosDias } from '../util/data';
import { getTheme } from '../constants/theme';

function DespesasRecentes() {
  const colors = getTheme(useColorScheme());
  const { expenses } = useExpenses();

  // só os últimos 7 dias, calculados a partir da lista global
  const recentes = useMemo(() => {
    const limite = getDataMenosDias(new Date(), 7);
    return expenses.filter((despesa) => despesa.date >= limite);
  }, [expenses]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <DespesaSaida
        despesas={recentes}
        periodo="Últimos 7 dias"
        tituloVazio="Nenhuma despesa nos últimos 7 dias."
        dicaVazia="Toque em + para adicionar."
      />
    </View>
  );
}

export default DespesasRecentes;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});
