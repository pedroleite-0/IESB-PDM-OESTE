import { View, Text, StyleSheet } from 'react-native';
import DespesaSumario from './DespesaSumario';
import DespesaLista from './DespesaLista';

function DespesaSaida({ despesas, periodo, textoVazio = 'Nenhuma despesa encontrada.' }) {
  let conteudo = <Text style={styles.textoVazio}>{textoVazio}</Text>;

  if (despesas.length > 0) {
    conteudo = <DespesaLista despesas={despesas} />;
  }

  return (
    <View style={styles.container}>
      <DespesaSumario despesas={despesas} periodo={periodo} />
      {conteudo}
    </View>
  );
}

export default DespesaSaida;

const styles = StyleSheet.create({
  container: {
    flex: 1, // ocupa o resto da tela abaixo do filtro
  },
  textoVazio: {
    textAlign: 'center',
    color: '#888888',
    marginTop: 24,
  },
});
