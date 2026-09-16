import { StyleSheet, Text, FlatList, Pressable, View } from 'react-native';

// itens: array de { id, texto, criadoEm }
// onDelete: function(id) — chamada ao tocar em um item
function CompromissoList({ itens, onDelete, tituloLista, listaVazia }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{tituloLista}</Text>
      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Pressable
              android_ripple={{ color: '#ffe08a' }}
              onPress={() => onDelete(item.id)}
              style={styles.pressable}
            >
              <Text style={styles.text}>{item.texto}</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>{listaVazia}</Text>}
      />
    </View>
  );
}

export default CompromissoList;

const styles = StyleSheet.create({
  container: {
    flex: 1, // ocupa o espaço restante da tela
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  item: {
    marginBottom: 8,
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
    overflow: 'hidden', // mantém o ripple dentro dos cantos arredondados
  },
  pressable: {
    padding: 12, // área de toque cobre o item inteiro
  },
  text: {
    fontSize: 15,
  },
  empty: {
    textAlign: 'center',
    color: '#888888',
    marginTop: 24,
  },
});
