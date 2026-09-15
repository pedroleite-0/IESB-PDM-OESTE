import { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MetaInput from './components/MetaInput';
import MetaList from './components/MetaList';

const CHAVE_STORAGE = '@metas_semestre';

export default function App() {
  const [textoInput, setTextoInput] = useState('');
  const [metas, setMetas] = useState([]);
  // Só vira true depois que a carga inicial termina — evita que o efeito de
  // salvar rode antes e sobrescreva o storage com uma lista vazia.
  const [carregado, setCarregado] = useState(false);

  // useEffect de CARGA: roda uma única vez, quando o app abre ([] no final).
  useEffect(() => {
    async function carregarMetas() {
      try {
        const dadosSalvos = await AsyncStorage.getItem(CHAVE_STORAGE);
        if (dadosSalvos) {
          setMetas(JSON.parse(dadosSalvos));
        }
      } catch (erro) {
        Alert.alert('Ops!', 'Não foi possível carregar suas metas salvas.');
      } finally {
        setCarregado(true);
      }
    }
    carregarMetas();
  }, []);

  // useEffect de SALVAMENTO: roda toda vez que `metas` muda.
  useEffect(() => {
    if (!carregado) return;
    async function salvarMetas() {
      try {
        await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(metas));
      } catch (erro) {
        Alert.alert('Ops!', 'Não foi possível salvar suas metas.');
      }
    }
    salvarMetas();
  }, [metas, carregado]);

  function adicionarMetaHandler() {
    if (textoInput.trim().length === 0) {
      Alert.alert('Meta vazia', 'Digite uma meta antes de adicionar.');
      return;
    }
    const novaMeta = {
      id: Date.now().toString(),
      texto: textoInput.trim(),
      criadaEm: new Date().toISOString(),
    };
    setMetas((metasAtuais) => [...metasAtuais, novaMeta]);
    setTextoInput('');
  }

  function deletarMetaHandler(id) {
    setMetas((metasAtuais) => metasAtuais.filter((meta) => meta.id !== id));
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Image
            source={require('./assets/favicon.png')}
            style={styles.headerImage}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>Metas do Semestre</Text>
        </View>

        <View style={styles.mainContainer}>
          <MetaInput
            value={textoInput}
            onChangeText={setTextoInput}
            onAdd={adicionarMetaHandler}
          />
          <View style={styles.listContainer}>
            <MetaList metas={metas} onDelete={deletarMetaHandler} />
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
    alignItems: 'center',
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
    flex: 1, // ocupa o espaço restante da tela
    padding: 24,
  },
  listContainer: {
    flex: 1, // a lista ocupa o espaço que sobra abaixo do input
    marginTop: 16,
  },
});
