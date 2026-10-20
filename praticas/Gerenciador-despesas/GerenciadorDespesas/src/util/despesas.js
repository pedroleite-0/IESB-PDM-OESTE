import { getDataMenosDias } from './data';

export const CATEGORIAS = ['Alimentação', 'Transporte', 'Lazer', 'Contas'];
export const FILTRO_TODAS = 'Todas';

// Filtro por categoria: devolve só as despesas da categoria escolhida.
export function filtrarPorCategoria(despesas, categoria) {
  if (categoria === FILTRO_TODAS) {
    return despesas;
  }
  return despesas.filter((despesa) => despesa.categoria === categoria);
}

const hoje = new Date();

export const DESPESAS_INICIAIS = [
  { id: 'd1', descricao: 'Supermercado', valor: 89.9, data: getDataMenosDias(hoje, 2), categoria: 'Alimentação' },
  { id: 'd2', descricao: 'Uber para a faculdade', valor: 23.5, data: getDataMenosDias(hoje, 1), categoria: 'Transporte' },
  { id: 'd3', descricao: 'Internet', valor: 99.9, data: getDataMenosDias(hoje, 3), categoria: 'Contas' },
  { id: 'd4', descricao: 'Cinema', valor: 38, data: getDataMenosDias(hoje, 5), categoria: 'Lazer' },
  { id: 'd5', descricao: 'Conta de luz', valor: 142.3, data: getDataMenosDias(hoje, 12), categoria: 'Contas' },
  { id: 'd6', descricao: 'Almoço no shopping', valor: 45, data: getDataMenosDias(hoje, 20), categoria: 'Alimentação' },
];
