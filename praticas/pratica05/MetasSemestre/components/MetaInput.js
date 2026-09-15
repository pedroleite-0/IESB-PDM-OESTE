import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

// Componente "burro" (apenas apresentação): quem controla o texto e o que
// acontece ao adicionar é o App.js, através das props.
function MetaInput({ value, onChangeText, onAdd }) {
  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        placeholder="Digite a meta"
        value={value}
        onChangeText={onChangeText}
      />
      <Pressable
        onPress={onAdd}
        android_ripple={{ color: '#a9c6ff' }}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      >
        <Text style={styles.buttonText}>Adicionar</Text>
      </Pressable>
    </View>
  );
}

export default MetaInput;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row', // input e botão lado a lado
    alignItems: 'center', // alinha os dois verticalmente
  },
  input: {
    flex: 1, // ocupa o espaço restante ao lado do botão
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  button: {
    backgroundColor: '#2f6fed',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  buttonPressed: {
    backgroundColor: '#1f4fbf', // feedback visual enquanto pressionado
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
