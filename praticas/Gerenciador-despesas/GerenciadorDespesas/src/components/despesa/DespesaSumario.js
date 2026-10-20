import { View, Text, StyleSheet } from 'react-native';

const LIMITE = 200;

function DespesaSumario({ despesas, periodo }) {
  const somaDespesas = despesas.reduce((acumulador, item) => acumulador + item.valor, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.periodo}>{periodo}</Text>
      <Text style={[styles.soma, somaDespesas > LIMITE && styles.somaAlerta]}>
        R$ {somaDespesas.toFixed(2)}
      </Text>
    </View>
  );
}

export default DespesaSumario;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e8efff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  periodo: {
    fontSize: 14,
    color: '#333333',
  },
  soma: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222222',
  },
  // bônus: soma acima de R$ 200,00 fica vermelha
  somaAlerta: {
    color: '#d32f2f',
  },
});
