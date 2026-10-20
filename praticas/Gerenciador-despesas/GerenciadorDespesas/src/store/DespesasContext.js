import { createContext, useContext, useState } from 'react';
import { DESPESAS_INICIAIS } from '../util/despesas';

const DespesasContext = createContext(null);

// Guarda a lista de despesas num useState e deixa as telas lerem/alterarem
// sem precisar passar props por cima dos navegadores.
export function DespesasProvider({ children }) {
  const [despesas, setDespesas] = useState(DESPESAS_INICIAIS);

  function adicionarDespesa(dados) {
    const nova = { ...dados, id: Date.now().toString() };
    setDespesas((atuais) => [nova, ...atuais]);
  }

  function atualizarDespesa(id, dados) {
    setDespesas((atuais) =>
      atuais.map((despesa) => (despesa.id === id ? { ...despesa, ...dados } : despesa))
    );
  }

  function excluirDespesa(id) {
    setDespesas((atuais) => atuais.filter((despesa) => despesa.id !== id));
  }

  // mais recentes primeiro
  const despesasOrdenadas = [...despesas].sort((a, b) => b.data - a.data);

  const valor = {
    despesas: despesasOrdenadas,
    adicionarDespesa,
    atualizarDespesa,
    excluirDespesa,
  };

  return <DespesasContext.Provider value={valor}>{children}</DespesasContext.Provider>;
}

export function useDespesas() {
  return useContext(DespesasContext);
}
