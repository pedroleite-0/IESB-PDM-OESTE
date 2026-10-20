import { View, Text, Pressable, StyleSheet } from 'react-native';

// Chips de categoria lado a lado. Serve tanto de filtro (com "Todas")
// quanto de seleção no formulário.
function SeletorCategoria({ categorias, selecionada, onSelecionar }) {
  return (
    <View style={styles.linha}>
      {categorias.map((categoria) => {
        const ativa = categoria === selecionada;
        return (
          <Pressable
            key={categoria}
            onPress={() => onSelecionar(categoria)}
            style={({ pressed }) => [
              styles.chip,
              ativa && styles.chipAtivo,
              pressed && styles.pressionado,
            ]}
          >
            <Text style={[styles.texto, ativa && styles.textoAtivo]}>{categoria}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default SeletorCategoria;

const styles = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    flexWrap: 'wrap', // quebra de linha se não couberem todos
  },
  chip: {
    borderWidth: 1,
    borderColor: '#2f6fed',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  chipAtivo: {
    backgroundColor: '#2f6fed',
  },
  pressionado: {
    opacity: 0.6,
  },
  texto: {
    fontSize: 13,
    color: '#2f6fed',
  },
  textoAtivo: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
