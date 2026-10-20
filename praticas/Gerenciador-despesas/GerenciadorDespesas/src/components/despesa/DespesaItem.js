import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDataFormatada } from '../../util/data';

function DespesaItem({ id, descricao, valor, data, categoria }) {
  const navigation = useNavigation();

  function aoPressionar() {
    navigation.navigate('GerenciarDespesa', { despesaId: id });
  }

  return (
    <Pressable onPress={aoPressionar} style={({ pressed }) => pressed && styles.pressionado}>
      <View style={styles.item}>
        <View style={styles.info}>
          <Text style={styles.descricao}>{descricao}</Text>
          <View style={styles.linhaMeta}>
            <Text style={styles.data}>{getDataFormatada(data)}</Text>
            <View style={styles.tag}>
              <Text style={styles.tagTexto}>{categoria}</Text>
            </View>
          </View>
        </View>
        <View style={styles.valorBox}>
          <Text style={styles.valor}>R$ {valor.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default DespesaItem;

const styles = StyleSheet.create({
  pressionado: {
    opacity: 0.6,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between', // info de um lado, valor do outro
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  info: {
    flex: 1,
    marginRight: 8,
  },
  descricao: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  linhaMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  data: {
    fontSize: 12,
    color: '#666666',
    marginRight: 8,
  },
  // tag da categoria: fundo cinza claro e bordas arredondadas
  tag: {
    backgroundColor: '#d9d9d9',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  tagTexto: {
    fontSize: 11,
    color: '#333333',
  },
  valorBox: {
    backgroundColor: '#ffffff',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  valor: {
    fontWeight: 'bold',
  },
});
