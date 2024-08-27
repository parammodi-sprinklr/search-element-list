// search.js
export function search(arr, target, comparator) {
  //candidate will implement this
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (comparator(arr, mid, target)) return mid;
    if (arr[mid].toLowerCase() < target.toLowerCase()) low = mid + 1;
    else high = mid - 1;
  }

  return -1; // Not found
}
