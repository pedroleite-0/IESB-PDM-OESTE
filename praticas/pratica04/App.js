import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import {
  rotulo_titulo_app,
  rotulo_input_disciplina,
  rotulo_btn_adicionar,
  rotulo_lista_disciplinas,
} from './labels';

// Lista estática (array fixo em JS), conforme permitido pelo enunciado.
// O foco desta atividade é layout e componentes, não gerenciamento de estado.
const disciplinas = [
  { id: '1', nome: 'Programação para Dispositivos Móveis' },
  { id: '2', nome: 'Banco de Dados II' },
  { id: '3', nome: 'Engenharia de Software' },
  { id: '4', nome: 'Redes de Computadores' },
];

export default function App() {
  return (
    // SafeAreaProvider mede as áreas seguras do aparelho; o SafeAreaView
    // dentro dele evita que o conteúdo fique atrás do notch, da câmera
    // frontal ou da barra de status/gestos (por isso não usamos o
    // SafeAreaView antigo de 'react-native').
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />

        {/* Cabeçalho */}
        <Text style={styles.headerTitle}>{rotulo_titulo_app}</Text>

        {/* Linha de cadastro: TextInput (~70%) + Botão (~28%) lado a lado */}
        <View style={styles.formRow}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder={rotulo_input_disciplina}
            />
          </View>
          <View style={styles.buttonWrapper}>
            {/* onPress vazio de propósito: cadastro dinâmico fica para uma
                próxima atividade, quando estado (useState) for o foco */}
            <Button title={rotulo_btn_adicionar} onPress={() => {}} />
          </View>
        </View>

        {/* Lista de disciplinas cadastradas */}
        <Text style={styles.listTitle}>{rotulo_lista_disciplinas}</Text>
        <View style={styles.list}>
          {disciplinas.map((disciplina) => (
            <View key={disciplina.id} style={styles.listItem}>
              <Text style={styles.listItemText}>{disciplina.nome}</Text>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // ocupa 100% do espaço de tela disponível (1º uso de flex)
    padding: 24,
    justifyContent: 'flex-start', // conteúdo começa no topo, empilhado na ordem de leitura
    alignItems: 'stretch', // cabeçalho, linha e lista ocupam toda a largura do container
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  formRow: {
    flexDirection: 'row', // input e botão lado a lado (eixo principal horizontal)
    justifyContent: 'space-between', // afasta o input do botão, sem colar um no outro
    alignItems: 'center', // centraliza os dois verticalmente no eixo transversal
    marginBottom: 20,
  },
  inputWrapper: {
    width: '70%', // largura percentual pedida no enunciado (1º uso de %)
  },
  buttonWrapper: {
    width: '28%', // segunda largura percentual (dentro da faixa de 25–30% pedida)
    justifyContent: 'center', // centraliza o botão verticalmente no espaço reservado
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  list: {
    flex: 1, // lista ocupa todo o espaço restante da tela (2º uso de flex)
  },
  listItem: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    marginBottom: 8,
    borderRadius: 6,
  },
  listItemText: {
    fontSize: 15,
  },
});
