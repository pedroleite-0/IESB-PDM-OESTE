import { createElement, useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import IconButton from '../components/IconButton';
import SeletorCategoria from '../components/despesa/SeletorCategoria';
import { useDespesas } from '../store/DespesasContext';
import { CATEGORIAS } from '../util/despesas';
import { getDataFormatada, dataParaInput, dataDeInput } from '../util/data';

function GerenciarDespesa({ route, navigation }) {
  const { despesas, adicionarDespesa, atualizarDespesa, excluirDespesa } = useDespesas();

  // se veio um despesaId pela navegação, é edição; senão, cadastro novo
  const despesaId = route.params?.despesaId;
  const despesaEditada = despesas.find((despesa) => despesa.id === despesaId);
  const editando = !!despesaEditada;

  const [descricao, setDescricao] = useState(despesaEditada ? despesaEditada.descricao : '');
  const [valor, setValor] = useState(despesaEditada ? despesaEditada.valor.toFixed(2) : '');
  const [data, setData] = useState(despesaEditada ? despesaEditada.data : new Date());
  const [categoria, setCategoria] = useState(despesaEditada ? despesaEditada.categoria : '');
  const [mostrarPicker, setMostrarPicker] = useState(false);
  const [erro, setErro] = useState('');

  // Regex: só aceita dígitos com no máximo 2 casas decimais.
  // A vírgula do teclado brasileiro é trocada por ponto antes do teste.
  function aoMudarValor(texto) {
    const normalizado = texto.replace(',', '.');
    if (/^\d*\.?\d{0,2}$/.test(normalizado)) {
      setValor(normalizado);
    }
  }

  function aoMudarData(evento, dataSelecionada) {
    if (Platform.OS === 'android') {
      setMostrarPicker(false);
    }
    if (evento.type !== 'dismissed' && dataSelecionada) {
      setData(dataSelecionada);
    }
  }

  function confirmar() {
    const valorNumerico = parseFloat(valor);

    if (descricao.trim().length === 0 || isNaN(valorNumerico) || valorNumerico <= 0 || categoria === '') {
      setErro('Preencha a descrição, um valor maior que zero e escolha uma categoria.');
      return;
    }

    const dados = { descricao: descricao.trim(), valor: valorNumerico, data, categoria };

    if (editando) {
      atualizarDespesa(despesaId, dados);
    } else {
      adicionarDespesa(dados);
    }
    navigation.goBack();
  }

  function excluir() {
    excluirDespesa(despesaId);
    navigation.goBack();
  }

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.rotulo}>Descrição</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Almoço"
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.rotulo}>Valor (R$)</Text>
      <TextInput
        style={styles.input}
        placeholder="0.00"
        keyboardType="decimal-pad"
        value={valor}
        onChangeText={aoMudarValor}
      />

      <Text style={styles.rotulo}>Data</Text>
      {Platform.OS === 'web' ? (
        // o datetimepicker não existe no navegador, então aqui vai um campo de data comum
        createElement('input', {
          type: 'date',
          value: dataParaInput(data),
          max: dataParaInput(new Date()),
          onChange: (evento) => {
            if (evento.target.value) {
              setData(dataDeInput(evento.target.value));
            }
          },
          style: { padding: 10, fontSize: 16, borderRadius: 8, border: '1px solid #cccccc' },
        })
      ) : (
        <>
          <Pressable style={styles.campoData} onPress={() => setMostrarPicker((aberto) => !aberto)}>
            <Text style={styles.textoData}>{getDataFormatada(data)}</Text>
          </Pressable>
          {mostrarPicker && (
            <DateTimePicker
              value={data}
              mode="date"
              display={Platform.OS === 'ios' ? 'inline' : 'default'}
              maximumDate={new Date()}
              onChange={aoMudarData}
            />
          )}
        </>
      )}

      <Text style={styles.rotulo}>Categoria</Text>
      <SeletorCategoria categorias={CATEGORIAS} selecionada={categoria} onSelecionar={setCategoria} />

      {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

      <View style={styles.botoes}>
        <Pressable
          style={({ pressed }) => [styles.botao, styles.botaoCancelar, pressed && styles.pressionado]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.textoCancelar}>Cancelar</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.botao, styles.botaoConfirmar, pressed && styles.pressionado]}
          onPress={confirmar}
        >
          <Text style={styles.textoConfirmar}>{editando ? 'Salvar' : 'Adicionar'}</Text>
        </Pressable>
      </View>

      {editando && (
        <View style={styles.areaExcluir}>
          <IconButton icon="trash" size={30} color="#d32f2f" onPress={excluir} />
        </View>
      )}
    </ScrollView>
  );
}

export default GerenciarDespesa;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  rotulo: { fontSize: 14, fontWeight: '600', marginTop: 12, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  campoData: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  textoData: { fontSize: 16 },
  erro: { color: '#d32f2f', marginTop: 8 },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  botao: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  botaoCancelar: { borderWidth: 1, borderColor: '#2f6fed', marginRight: 8 },
  botaoConfirmar: { backgroundColor: '#2f6fed', marginLeft: 8 },
  pressionado: { opacity: 0.6 },
  textoCancelar: { color: '#2f6fed', fontWeight: '600' },
  textoConfirmar: { color: '#ffffff', fontWeight: '600' },
  areaExcluir: { alignItems: 'center', marginTop: 20 },
});
