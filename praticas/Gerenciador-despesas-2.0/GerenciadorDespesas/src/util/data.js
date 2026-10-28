export function getDataFormatada(data) {
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  return `${dia}/${mes}/${data.getFullYear()}`;
}

export function getDataMenosDias(data, dias) {
  return new Date(data.getFullYear(), data.getMonth(), data.getDate() - dias);
}

// As duas funções abaixo só são usadas no <input type="date"> da versão web
// (formato aaaa-mm-dd), já que o datetimepicker não funciona no navegador.
export function dataParaInput(data) {
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${data.getFullYear()}-${mes}-${dia}`;
}

export function dataDeInput(texto) {
  const [ano, mes, dia] = texto.split('-').map(Number);
  return new Date(ano, mes - 1, dia);
}
