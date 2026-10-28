import { createElement, useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Modal,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useExpenses } from '../store/expenses-context';
import { getTheme } from '../constants/theme';
import { CATEGORIES } from '../constants/categories';
import { getDataFormatada, dataParaInput, dataDeInput } from '../util/data';

// Regras do formulário. Devolve um objeto só com os campos inválidos.
function validate(values) {
  const errors = {};
  const amount = parseFloat(values.amount);

  const fimDeHoje = new Date();
  fimDeHoje.setHours(23, 59, 59, 999);

  if (values.description.trim().length < 3) {
    errors.description = 'Mínimo de 3 caracteres';
  }
  if (isNaN(amount) || amount <= 0) {
    errors.amount = 'Informe um valor maior que zero';
  }
  if (values.date > fimDeHoje) {
    errors.date = 'A data não pode ser futura';
  }
  if (!values.category) {
    errors.category = 'Escolha uma categoria';
  }
  return errors;
}

function GerenciarDespesa({ route, navigation }) {
  const colors = getTheme(useColorScheme());
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();

  // com expenseId é edição; sem, é cadastro novo
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const selected = expenses.find((item) => item.id === expenseId);

  const [form, setForm] = useState({
    description: selected?.description ?? '',
    amount: selected ? selected.amount.toFixed(2) : '',
    date: selected?.date ?? new Date(),
    category: selected?.category ?? '',
  });
  const [errors, setErrors] = useState({});
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Editar despesa' : 'Nova despesa',
    });
  }, [navigation, isEditing]);

  // atualiza um campo e apaga só a mensagem de erro dele
  function handleChange(field, value) {
    setForm((atual) => ({ ...atual, [field]: value }));
    setErrors((atual) => ({ ...atual, [field]: undefined }));
  }

  // máscara: só dígitos, com no máximo 2 casas decimais (vírgula vira ponto)
  function handleAmountChange(texto) {
    const normalizado = texto.replace(',', '.');
    if (/^\d*\.?\d{0,2}$/.test(normalizado)) {
      handleChange('amount', normalizado);
    }
  }

  function handleDateChange(evento, dataSelecionada) {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (evento.type !== 'dismissed' && dataSelecionada) {
      handleChange('date', dataSelecionada);
    }
  }

  function selectCategory(category) {
    handleChange('category', category);
    setIsPickerOpen(false);
  }

  function handleSubmit() {
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return; // com erro, não salva

    const data = {
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      date: form.date,
      category: form.category,
    };

    if (isEditing) {
      updateExpense(expenseId, data);
    } else {
      addExpense(data);
    }
    navigation.goBack();
  }

  function doDelete() {
    deleteExpense(expenseId);
    navigation.goBack();
  }

  function confirmDelete() {
    // Alert com botões não funciona no navegador, então lá usamos o confirm
    if (Platform.OS === 'web') {
      if (window.confirm('Excluir despesa? Esta ação não pode ser desfeita.')) {
        doDelete();
      }
      return;
    }
    Alert.alert('Excluir despesa', 'Esta ação não pode ser desfeita.', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: doDelete },
    ]);
  }

  function inputStyle(field) {
    return [
      styles.input,
      { borderColor: colors.border, backgroundColor: colors.inputBackground, color: colors.text },
      errors[field] && { borderColor: colors.danger, borderWidth: 2 },
    ];
  }

  function renderError(field) {
    return !!errors[field] && <Text style={[styles.erro, { color: colors.danger }]}>{errors[field]}</Text>;
  }

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
        <Text style={[styles.rotulo, { color: colors.text }]}>Descrição</Text>
        <TextInput
          style={inputStyle('description')}
          placeholder="Ex: Almoço"
          placeholderTextColor={colors.textSecondary}
          value={form.description}
          onChangeText={(texto) => handleChange('description', texto)}
        />
        {renderError('description')}

        <Text style={[styles.rotulo, { color: colors.text }]}>Valor (R$)</Text>
        <TextInput
          style={inputStyle('amount')}
          placeholder="0.00"
          placeholderTextColor={colors.textSecondary}
          keyboardType="decimal-pad"
          value={form.amount}
          onChangeText={handleAmountChange}
        />
        {renderError('amount')}

        <Text style={[styles.rotulo, { color: colors.text }]}>Data</Text>
        {Platform.OS === 'web' ? (
          // o datetimepicker não existe no navegador: aqui vai um campo de data comum
          createElement('input', {
            type: 'date',
            value: dataParaInput(form.date),
            onChange: (evento) => {
              if (evento.target.value) {
                handleChange('date', dataDeInput(evento.target.value));
              }
            },
            style: {
              padding: 10,
              fontSize: 16,
              borderRadius: 8,
              border: errors.date ? `2px solid ${colors.danger}` : `1px solid ${colors.border}`,
              backgroundColor: colors.inputBackground,
              color: colors.text,
            },
          })
        ) : (
          <>
            <Pressable style={inputStyle('date')} onPress={() => setShowDatePicker((aberto) => !aberto)}>
              <Text style={[styles.textoCampo, { color: colors.text }]}>{getDataFormatada(form.date)}</Text>
            </Pressable>
            {showDatePicker && (
              <DateTimePicker
                value={form.date}
                mode="date"
                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                onChange={handleDateChange}
              />
            )}
          </>
        )}
        {renderError('date')}

        <Text style={[styles.rotulo, { color: colors.text }]}>Categoria</Text>
        <Pressable style={inputStyle('category')} onPress={() => setIsPickerOpen(true)}>
          <Text
            style={[
              styles.textoCampo,
              { color: form.category ? colors.text : colors.textSecondary },
            ]}
          >
            {form.category || 'Escolha a categoria'} ▾
          </Text>
        </Pressable>
        {renderError('category')}

        <Pressable
          style={({ pressed }) => [
            styles.botao,
            { backgroundColor: colors.primary },
            pressed && styles.pressionado,
          ]}
          onPress={handleSubmit}
        >
          <Text style={[styles.botaoTexto, { color: colors.onPrimary }]}>Salvar</Text>
        </Pressable>

        {isEditing && (
          <Pressable
            style={({ pressed }) => [
              styles.botao,
              styles.botaoExcluir,
              { borderColor: colors.danger },
              pressed && styles.pressionado,
            ]}
            onPress={confirmDelete}
          >
            <Text style={[styles.botaoTexto, { color: colors.danger }]}>Excluir</Text>
          </Pressable>
        )}
      </ScrollView>

      <Modal
        visible={isPickerOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsPickerOpen(false)}
      >
        <View style={[styles.backdrop, { backgroundColor: colors.overlay }]}>
          <Pressable style={styles.flex} onPress={() => setIsPickerOpen(false)} />
          <View style={[styles.sheet, { backgroundColor: colors.background }]}>
            <Text style={[styles.sheetTitulo, { color: colors.text }]}>Categoria</Text>
            {CATEGORIES.map((category) => (
              <Pressable
                key={category}
                style={({ pressed }) => [
                  styles.opcao,
                  { borderBottomColor: colors.border },
                  pressed && styles.pressionado,
                ]}
                onPress={() => selectCategory(category)}
              >
                <Text
                  style={[
                    styles.opcaoTexto,
                    { color: category === form.category ? colors.primary : colors.text },
                    category === form.category && styles.opcaoSelecionada,
                  ]}
                >
                  {category}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

export default GerenciarDespesa;

const styles = StyleSheet.create({
  flex: { flex: 1 },
  conteudo: { padding: 16, paddingBottom: 32 },
  rotulo: { fontSize: 14, fontWeight: '600', marginTop: 12, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  textoCampo: { fontSize: 16 },
  erro: { fontSize: 12, marginTop: 4 },
  botao: {
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  botaoExcluir: { backgroundColor: 'transparent', borderWidth: 1, marginTop: 12 },
  botaoTexto: { fontWeight: '600', fontSize: 16 },
  pressionado: { opacity: 0.6 },
  backdrop: { flex: 1, justifyContent: 'flex-end' },
  sheet: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    paddingBottom: 32,
  },
  sheetTitulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  opcao: { paddingVertical: 14, borderBottomWidth: StyleSheet.hairlineWidth },
  opcaoTexto: { fontSize: 16 },
  opcaoSelecionada: { fontWeight: 'bold' },
});
