import { View, Text, Pressable, StyleSheet, useColorScheme } from 'react-native';
import { getTheme } from '../../constants/theme';

// Chips de categoria lado a lado, usados como filtro nas listas.
function SeletorCategoria({ categorias, selecionada, onSelecionar }) {
  const colors = getTheme(useColorScheme());

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
              { borderColor: colors.primary },
              ativa && { backgroundColor: colors.primary },
              pressed && styles.pressionado,
            ]}
          >
            <Text
              style={[
                styles.texto,
                { color: ativa ? colors.onPrimary : colors.primary },
                ativa && styles.textoAtivo,
              ]}
            >
              {categoria}
            </Text>
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
    flexWrap: 'wrap',
  },
  chip: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  pressionado: { opacity: 0.6 },
  texto: { fontSize: 13 },
  textoAtivo: { fontWeight: '600' },
});
