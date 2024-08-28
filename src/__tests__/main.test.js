import App from '../App';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// search.test.js
import { search } from '../utils/search';
// VirtualizedList.test.js
import VirtualizedList from '../components/VirtualizedList';

describe('Basic Search Functionality', () => {
  const comparator = (arr, indexToCheck, target) => {
    return arr[indexToCheck].toLowerCase() === target.toLowerCase();
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

  test('finds the index of an existing item', () => {
    expect(search(items, 'cherry', comparator)).toBe(2);
  });

  test('returns -1 for an item not found', () => {
    expect(search(items, 'kiwi', comparator)).toBe(-1);
  });

  test('returns -1 for an empty array', () => {
    expect(search([], 'cherry', comparator)).toBe(-1);
  });
});

describe('Advanced Search Functionality', () => {
  // Large array for the test
  const largeArray = Array.from({ length: 1024 }, (_, i) => `Item ${i + 1}`);
  const target = 'Item 512';

  test('search should implement binary search with limited comparisons', () => {
    let compareCount = 0;

    const comparator = (arr, indexToCheck, target) => {
      compareCount++;
      return arr[indexToCheck].toLowerCase() === target.toLowerCase();
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
  });
});

describe('VirtualizedList Component', () => {
  const items = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`);

  test('renders the correct number of items initially', () => {
    const { getAllByText } = render(
      <VirtualizedList items={items} scrollToIndex={null} />
    );
    const renderedItems = getAllByText(/Item \d+/);
    expect(renderedItems.length).toBe(Math.ceil(400 / 20)); // Number of items that fit in the viewport
  });

  test('scrolls to the correct item', () => {
    const { getByText } = render(
      <VirtualizedList items={items} scrollToIndex={100} />
    );
    const targetItem = getByText('Item 101');
    expect(targetItem).toBeInTheDocument();
  });

  test('renders more items when scrolling down', () => {
    const { getByTestId, getAllByText } = render(
      <VirtualizedList items={items} scrollToIndex={null} />
    );

    const container = getByTestId('virtualized-container');
    fireEvent.scroll(container, { target: { scrollTop: 1000 } });

    const renderedItems = getAllByText(/Item \d+/);
    expect(renderedItems.length).toBe(Math.ceil(400 / 20)); // Number of items that fit in the viewport
  });
});
