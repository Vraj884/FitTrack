export function formatDate(dateStr) {
  const [year, month, day] = dateStr.split('-').map(num => num.padStart(2, '0'));
  return `${year}-${month}-${day}`;
}
