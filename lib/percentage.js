export const percentage = (text) => {
  if (text == null) {
    return '';
  }

  return text.replace(/%/g, ' ') + '%';
}