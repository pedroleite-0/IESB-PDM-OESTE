import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import SeletorCategoria from '../components/despesa/SeletorCategoria';
import { useDespesas } from '../store/DespesasContext';
import { CATEGORIAS, FILTRO_TODAS, filtrarPorCategoria } from '../util/despesas';

function TodasDespesas() {
  const { despesas } = useDespesas();
  const [categoriaFiltro, setCategoriaFiltro] = useState(FILTRO_TODAS);

  // lista filtrada vai como prop pro DespesaSaida: a FlatList e o sumário
  // se atualizam sozinhos quando o filtro muda
  const despesasFiltradas = filtrarPorCategoria(despesas, categoriaFiltro);

  return (
    <View style={styles.container}>
      <SeletorCategoria
        categorias={[FILTRO_TODAS, ...CATEGORIAS]}
        selecionada={categoriaFiltro}
        onSelecionar={setCategoriaFiltro}
      />
      <DespesaSaida despesas={despesasFiltradas} periodo="Total" />
    </View>
  );
}

export default TodasDespesas;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});
