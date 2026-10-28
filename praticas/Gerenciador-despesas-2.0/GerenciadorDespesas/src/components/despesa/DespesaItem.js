import { View, Text, Pressable, StyleSheet, Platform, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDataFormatada } from '../../util/data';
import { getTheme } from '../../constants/theme';

function DespesaItem({ item }) {
  const navigation = useNavigation();
  const colors = getTheme(useColorScheme());

  function handlePress() {
    navigation.navigate('GerenciarDespesa', { expenseId: item.id });
  }

  return (
    <Pressable onPress={handlePress} style={({ pressed }) => pressed && styles.pressionado}>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <View style={styles.info}>
          <Text style={[styles.descricao, { color: colors.text }]}>{item.description}</Text>
          <View style={styles.linhaMeta}>
            <Text style={[styles.data, { color: colors.textSecondary }]}>
              {getDataFormatada(item.date)}
            </Text>
            <View style={[styles.tag, { backgroundColor: colors.tag }]}>
              <Text style={[styles.tagTexto, { color: colors.tagText }]}>{item.category}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.valorBox, { backgroundColor: colors.background }]}>
          <Text style={[styles.valor, { color: colors.text }]}>R$ {item.amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default DespesaItem;

const styles = StyleSheet.create({
  pressionado: { opacity: 0.6 },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 4,
    marginBottom: 10,
    // sombra por plataforma
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
      },
      android: { elevation: 4 },
      default: { boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)' },
    }),
  },
  info: { flex: 1, marginRight: 8 },
  descricao: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  linhaMeta: { flexDirection: 'row', alignItems: 'center' },
  data: { fontSize: 12, marginRight: 8 },
  tag: {
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  tagTexto: { fontSize: 11 },
  valorBox: {
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  valor: { fontWeight: 'bold' },
});
