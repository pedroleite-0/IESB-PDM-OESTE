import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

// Componente de apresentação: quem controla o texto e o que acontece ao
// adicionar é o App.js, via props. Os textos vêm da prop "labels" (o
// módulo labels.js inteiro, importado em App.js com "import * as labels").
function CompromissoInput({ value, onChangeText, onAdd, labels }) {
  return (
    <View style={styles.row}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={labels.placeholderCompromisso}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Pressable
          onPress={onAdd}
          android_ripple={{ color: '#a9c6ff' }}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <Text style={styles.buttonText}>{labels.botaoAdicionar}</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default CompromissoInput;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row', // input e botão lado a lado
    justifyContent: 'space-between', // afasta os dois, sem colar
    alignItems: 'center', // alinha os dois verticalmente
    marginBottom: 12,
  },
  inputWrapper: {
    width: '68%', // ~65-70% pedido no enunciado
  },
  buttonWrapper: {
    width: '28%', // ~25-30% pedido no enunciado
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
  },
  button: {
    backgroundColor: '#2f6fed',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center', // centraliza o texto horizontalmente
    justifyContent: 'center', // centraliza o texto verticalmente
  },
  buttonPressed: {
    backgroundColor: '#1f4fbf', // feedback visual enquanto pressionado
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
