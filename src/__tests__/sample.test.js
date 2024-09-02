import App from '../App';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// search.test.js
import { search } from '../utils/search';
// VirtualizedList.test.js
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

  test('finds the index of an existing item', () => {
    expect(search(items, 'cherry', comparator)).toBe(2);
  });
});

describe('VirtualizedList Component', () => {
  const items = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`);

  test('scrolls to the correct item', () => {
    const { getByText } = render(
      <VirtualizedList items={items} scrollToIndex={100} />
    );
    const targetItem = getByText('Item 101');
    expect(targetItem).toBeInTheDocument();
  });
});
