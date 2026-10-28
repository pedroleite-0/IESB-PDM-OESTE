import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ExpensesContext = createContext(null);

const STORAGE_KEY = '@expenses';

// Reducer puro: nunca altera o estado antigo, sempre devolve um array novo.
export function expensesReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case 'ADD':
      return [{ id: Date.now().toString(), ...payload }, ...state];
    case 'UPDATE':
      return state.map((item) =>
        item.id === payload.id ? { ...item, ...payload.data } : item
      );
    case 'DELETE':
      return state.filter((item) => item.id !== payload);
    case 'SET':
      return payload;
    default:
      return state;
  }
}

export function ExpensesContextProvider({ children }) {
  const [expenses, dispatch] = useReducer(expensesReducer, []);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1) Ao abrir o app: lê o que estava salvo e restaura com SET.
  useEffect(() => {
    async function load() {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) {
          // o JSON guarda a data como texto, então voltamos para Date
          const saved = JSON.parse(json).map((item) => ({
            ...item,
            date: new Date(item.date),
          }));
          dispatch({ type: 'SET', payload: saved });
        }
      } catch (error) {
        console.error('Erro ao ler as despesas salvas:', error);
      } finally {
        // mesmo com erro de leitura, libera o salvamento
        setIsLoaded(true);
      }
    }
    load();
  }, []);

  // 2) A cada mudança: grava a lista. Só depois de carregar (isLoaded),
  // senão a lista vazia inicial apagaria os dados salvos.
  useEffect(() => {
    if (!isLoaded) return;

    async function save() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
      } catch (error) {
        console.error('Erro ao salvar as despesas:', error);
      }
    }
    save();
  }, [expenses, isLoaded]);

  const value = useMemo(() => {
    // mais recentes primeiro (cópia, para não alterar o estado)
    const sorted = [...expenses].sort((a, b) => b.date - a.date);

    return {
      expenses: sorted,
      addExpense: (data) => dispatch({ type: 'ADD', payload: data }),
      updateExpense: (id, data) => dispatch({ type: 'UPDATE', payload: { id, data } }),
      deleteExpense: (id) => dispatch({ type: 'DELETE', payload: id }),
      clearExpenses: () => dispatch({ type: 'SET', payload: [] }),
    };
  }, [expenses]);

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export function useExpenses() {
  const ctx = useContext(ExpensesContext);
  if (!ctx) {
    throw new Error('useExpenses precisa ser usado dentro do ExpensesContextProvider');
  }
  return ctx;
}
