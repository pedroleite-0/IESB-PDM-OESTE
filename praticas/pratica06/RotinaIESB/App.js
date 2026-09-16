import { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as labels from './labels';
import CompromissoInput from './components/CompromissoInput';
import CompromissoList from './components/CompromissoList';

const CHAVE_STORAGE = '@rotina_iesb_compromissos';

export default function App() {
  const [textoInput, setTextoInput] = useState('');
  const [compromissos, setCompromissos] = useState([]);
  // Só vira true depois que a carga inicial termina — evita que o efeito de
  // salvar rode antes e sobrescreva o storage com uma lista vazia.
  const [carregado, setCarregado] = useState(false);

  // useEffect de CARGA: roda uma única vez, quando o app abre ([] no final).
  useEffect(() => {
    async function carregarCompromissos() {
      try {
        const dadosSalvos = await AsyncStorage.getItem(CHAVE_STORAGE);
        if (dadosSalvos) {
          setCompromissos(JSON.parse(dadosSalvos));
        }
      } catch (erro) {
        Alert.alert('Ops!', 'Não foi possível carregar seus compromissos salvos.');
      } finally {
        setCarregado(true);
      }
    }
    carregarCompromissos();
  }, []);

  // useEffect de SALVAMENTO: roda toda vez que `compromissos` muda.
  useEffect(() => {
    if (!carregado) return;
    async function salvarCompromissos() {
      try {
        await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(compromissos));
      } catch (erro) {
        Alert.alert('Ops!', 'Não foi possível salvar seus compromissos.');
      }
    }
    salvarCompromissos();
  }, [compromissos, carregado]);

  function adicionarCompromissoHandler() {
    if (textoInput.trim().length === 0) {
      Alert.alert('Compromisso vazio', 'Digite um compromisso antes de adicionar.');
      return;
    }
    const novoCompromisso = {
      id: Date.now().toString(),
      texto: textoInput.trim(),
      criadoEm: new Date().toISOString(),
    };
    setCompromissos((atuais) => [...atuais, novoCompromisso]);
    setTextoInput('');
  }

  function deletarCompromissoHandler(id) {
    setCompromissos((atuais) => atuais.filter((c) => c.id !== id));
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Image
            source={require('./assets/logo.png')}
            style={styles.headerImage}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>{labels.tituloApp}</Text>
        </View>

        <View style={styles.mainContainer}>
          <CompromissoInput
            value={textoInput}
            onChangeText={setTextoInput}
            onAdd={adicionarCompromissoHandler}
            labels={labels}
          />
          <View style={styles.listContainer}>
            <CompromissoList
              itens={compromissos}
              onDelete={deletarCompromissoHandler}
              tituloLista={labels.tituloLista}
              listaVazia={labels.listaVazia}
            />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row', // imagem e título lado a lado
    alignItems: 'center', // alinha os dois verticalmente
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  headerImage: {
    width: 36,
    height: 36,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  mainContainer: {
    flex: 1, // ocupa o espaço restante da tela (1º uso de flex)
    padding: 24,
  },
  listContainer: {
    flex: 1, // a lista ocupa o espaço que sobra abaixo do formulário (2º uso)
    marginTop: 16,
  },
});
