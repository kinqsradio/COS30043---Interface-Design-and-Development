/**
 * Sorts an array of objects by a given key and direction.
 * @param {Array} data - The array to be sorted.
 * @param {String} key - The key to sort by.
 * @param {String} direction - The direction of sorting ("asc" or "desc").
 * @returns {Array} - The sorted array.
 */
export function sortData(data, key, direction) {
  const modifier = direction === "asc" ? 1 : -1;

  return [...data].sort((a, b) => {
    let valueA = a[key];
    let valueB = b[key];

    // Convert percentage strings (positive or negative) to numbers
    if (key === "changePercentage") {
      valueA = parseFloat(valueA.replace("%", ""));
      valueB = parseFloat(valueB.replace("%", ""));
    }

    // Sort numerically or lexicographically based on value type
    if (typeof valueA === "string") {
      return valueA.localeCompare(valueB) * modifier;
    } else {
      return (valueA - valueB) * modifier;
    }
  });
}
  