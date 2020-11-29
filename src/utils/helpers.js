export const sortByDescOrder = (arr, key) => {
  if (arr) {
    return arr.sort((a, b) => {
      return a[key] - b[key];
    });
  }
};
