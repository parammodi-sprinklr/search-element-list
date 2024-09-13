import App from '../App';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { search } from '../utils/search';
import { generateRandomArray } from '../utils/generateRandomArray';

import VirtualizedList from '../components/VirtualizedList';

const optimalSearch = (arr, target) => {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }

  return -1;
};

describe('Basic Search Functionality', () => {
  const items = [10, 12, 14, 16, 18, 20, 22];

  //finds the index of an existing item
  test('Test #1', () => {
    expect(search(items, 14)).toBe(2);
  });

  //returns -1 for an item not found
  test('Test #2', () => {
    expect(search(items, 100)).toBe(-1);
  });

  //returns -1 for an empty array
  test('Test #3', () => {
    expect(search([], 14)).toBe(-1);
  });
});

describe('Advanced Search Functionality', () => {
  // Large array for the test
  const target = 950120;
  let largeArray = generateRandomArray(100000, 1, 1000000);

  if (!largeArray.find((_item) => _item === 950120)) {
    largeArray.push(950120);
    largeArray = largeArray.sort((a, b) => a - b);
  }

  const optimalStartItem = process.hrtime(); // Record optimal start time

  const index = optimalSearch(largeArray, target);

  const optimalTimeTaken = process.hrtime(optimalStartItem); // Record optimal end time

  const optimalTimeTakenMicroseconds =
    optimalTimeTaken[0] * 1e6 + optimalTimeTaken[1] / 1e3 + 50; // Allow some leeway for comparisons due to edge cases, e.g., adding 1 or 2 to the log2 result

  //search should implement efficient algorithm to minimize comparistions
  test('Test #1', () => {
    const startTime = process.hrtime(); // Record start time

    const index = search(largeArray, target);

    const timeTaken = process.hrtime(startTime); // Record end time

    const timeTakenMicroseconds = timeTaken[0] * 1e6 + timeTaken[1] / 1e3;

    const expectedIndex = largeArray.indexOf(target);

    // Verify the item was found correctly
    expect(index).toBe(expectedIndex);

    expect(timeTakenMicroseconds).toBeLessThanOrEqual(
      optimalTimeTakenMicroseconds
    );
  });
});

describe('VirtualizedList Component', () => {
  const items = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`);

  //renders the correct number of items initially
  test('Test #1', () => {
    const { getAllByText } = render(
      <VirtualizedList items={items} scrollToIndex={null} />
    );
    const renderedItems = getAllByText(/Item \d+/);
    expect(renderedItems.length).toBe(Math.ceil(400 / 20)); // Number of items that fit in the viewport
  });

  //scrolls to the correct item
  test('Test #2', () => {
    const { getByText, queryByText } = render(
      <VirtualizedList items={items} scrollToIndex={100} />
    );
    const targetExpectedItem = getByText('Item 101');
    expect(targetExpectedItem).toBeVisible();

    const targetStartItem = queryByText('Item 5');
    expect(targetStartItem).toBeNull();
  });

  //renders more items when scrolling down
  test('Test #3', () => {
    const { getByTestId, getAllByText, getByText } = render(
      <VirtualizedList items={items} scrollToIndex={null} />
    );

    const container = getByTestId('virtualized-container');
    fireEvent.scroll(container, { target: { scrollTop: 1000 } });

    const renderedItems = getAllByText(/Item \d+/);
    expect(renderedItems.length).toBe(Math.ceil(560 / 28)); // Number of items that fit in the viewport

    const targetStartItem = getByText('Item 37');
    expect(targetStartItem).toBeVisible();

    const targetEndItem = getByText('Item 54');
    expect(targetEndItem).toBeVisible();
  });
});
