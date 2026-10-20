import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import SeletorCategoria from '../components/despesa/SeletorCategoria';
import { useDespesas } from '../store/DespesasContext';
import { getDataMenosDias } from '../util/data';
import { CATEGORIAS, FILTRO_TODAS, filtrarPorCategoria } from '../util/despesas';

function DespesasRecentes() {
  const { despesas } = useDespesas();
  const [categoriaFiltro, setCategoriaFiltro] = useState(FILTRO_TODAS);

  const limite = getDataMenosDias(new Date(), 7);
  const despesasRecentes = despesas.filter((despesa) => despesa.data >= limite);
  const despesasFiltradas = filtrarPorCategoria(despesasRecentes, categoriaFiltro);

  return (
    <View style={styles.container}>
      <SeletorCategoria
        categorias={[FILTRO_TODAS, ...CATEGORIAS]}
        selecionada={categoriaFiltro}
        onSelecionar={setCategoriaFiltro}
      />
      <DespesaSaida
        despesas={despesasFiltradas}
        periodo="Últimos 7 dias"
        textoVazio="Nenhuma despesa nos últimos 7 dias."
      />
    </View>
  );
}

export default DespesasRecentes;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});
