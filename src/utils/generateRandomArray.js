export const generateRandomArray = (length, min, max) => {
  const set = new Set();

  // Keep adding random numbers until the set reaches the desired length
  while (set.size < length) {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    set.add(randomNum);
  }

  // Convert the set to an array and sort it
  return Array.from(set).sort((a, b) => a - b);
};
