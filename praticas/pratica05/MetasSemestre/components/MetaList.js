import { StyleSheet, Text, FlatList, Pressable, View } from 'react-native';

// props.metas: array de { id, texto, criadaEm }
// props.onDelete: function(id) — chamada ao tocar em um item
function MetaList({ metas, onDelete }) {
  return (
    <FlatList
      data={metas}
      keyExtractor={(meta) => meta.id}
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
      ListEmptyComponent={
        <Text style={styles.empty}>Nenhuma meta cadastrada ainda.</Text>
      }
    />
  );
}

export default MetaList;

const styles = StyleSheet.create({
  item: {
    marginBottom: 8, // separa um item do outro
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
    overflow: 'hidden', // mantém o ripple dentro dos cantos arredondados
  },
  pressable: {
    padding: 12, // a área de toque cobre o item inteiro (visto na Aula 06)
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
