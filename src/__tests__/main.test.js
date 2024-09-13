import App from '../App';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { search } from '../utils/search';
import { generateRandomArray } from '../utils/generateRandomArray';

import VirtualizedList from '../components/VirtualizedList';

describe('Basic Search Functionality', () => {
  const comparator = (arr, indexToCheck, target) => {
    return arr[indexToCheck] === target;
  };

  const items = [
    'apple',
    'banana',
    'cherry',
    'date',
    'elderberry',
    'fig',
    'grape',
  ];

  //finds the index of an existing item
  test('Test #1', () => {
    expect(search(items, 'cherry', comparator)).toBe(2);
  });

  //returns -1 for an item not found
  test('Test #2', () => {
    expect(search(items, 'kiwi', comparator)).toBe(-1);
  });

  //returns -1 for an empty array
  test('Test #3', () => {
    expect(search([], 'cherry', comparator)).toBe(-1);
  });
});

describe('Advanced Search Functionality', () => {
  // Large array for the test
  const target = 50120;
  let largeArray = generateRandomArray(10000, 1, 100000);

  if (!largeArray.find((_item) => _item === 50120)) {
    largeArray.push(50120);
    largeArray = largeArray.sort((a, b) => a - b);
  }

  //search should implement efficient algorithm to minimize comparistions
  test('Test #1', () => {
    let compareCount = 0;

    const comparator = (arr, indexToCheck, target) => {
      compareCount++;
      return arr[indexToCheck] === target;
    };
    // Execute the search
    const index = search(largeArray, target, comparator);
    const expectedIndex = largeArray.indexOf(target);

    // Verify the item was found correctly
    expect(index).toBe(expectedIndex);

    // Calculate log2(n)
    const maxLogComparisons = Math.log2(largeArray.length);

    // Allow some leeway for comparisons due to edge cases, e.g., adding 1 or 2 to the log2 result
    const comparisonThreshold = maxLogComparisons + 2;

    // Ensure the comparison count does not exceed the threshold
    expect(compareCount).toBeLessThanOrEqual(comparisonThreshold);
    expect(compareCount).toBeGreaterThan(0);
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
