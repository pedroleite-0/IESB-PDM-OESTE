import { FlatList, View, StyleSheet, useWindowDimensions } from 'react-native';
import DespesaItem from './DespesaItem';
import ListaVazia from './ListaVazia';

function DespesaLista({ despesas, tituloVazio, dicaVazia }) {
  const { width } = useWindowDimensions();
  // bônus: tablet ou celular deitado mostra 2 colunas
  const numColumns = width > 600 ? 2 : 1;

  return (
    <FlatList
      // a FlatList não aceita trocar numColumns em tempo real: a key remonta a lista
      key={numColumns}
      data={despesas}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      // o item é um componente (não renderItem={DespesaItem}), senão o useNavigation quebra
      renderItem={({ item }) => (
        <View style={numColumns > 1 ? styles.celula : null}>
          <DespesaItem item={item} />
        </View>
      )}
      ListEmptyComponent={<ListaVazia titulo={tituloVazio} dica={dicaVazia} />}
      contentContainerStyle={styles.conteudo}
      keyboardShouldPersistTaps="handled"
    />
  );
}

export default DespesaLista;

const styles = StyleSheet.create({
  conteudo: { paddingBottom: 16 },
  celula: { flex: 0.5 },
});
