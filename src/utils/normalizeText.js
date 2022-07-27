const normalizeText = (string) =>
  string
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

export default normalizeText;
