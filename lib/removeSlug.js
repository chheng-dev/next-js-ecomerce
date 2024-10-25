export const removeSlug = (text) => {
  if (text == null) {
    return '';
  }

  return text
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}