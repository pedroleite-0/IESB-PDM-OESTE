import { View, StyleSheet } from 'react-native';
import DespesaSumario from './DespesaSumario';
import DespesaLista from './DespesaLista';

function DespesaSaida({
  despesas,
  periodo,
  tituloVazio = 'Nenhuma despesa.',
  dicaVazia = 'Toque em + para adicionar.',
}) {
  return (
    <View style={styles.container}>
      <DespesaSumario despesas={despesas} periodo={periodo} />
      <DespesaLista despesas={despesas} tituloVazio={tituloVazio} dicaVazia={dicaVazia} />
    </View>
  );
}

export default DespesaSaida;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
