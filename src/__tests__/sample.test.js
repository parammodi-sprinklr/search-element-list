import App from '../App';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// search.test.js
import { search } from '../utils/search';
// VirtualizedList.test.js
import VirtualizedList from '../components/VirtualizedList';

const forbiddenLibraries = [
  'react-window',
  'react-virtualized',
  'react-virtual',
  'react-tiny-virtual-list',
  'react-infinite',
  'react-infinite-scroller',
  'react-lazyload',
  'react-list',
  '@tanstack/react-virtual',
  'react-infinite-grid',
];

describe('Virtualized List External Libraries', () => {
  test('should fail if any external library for virtualization is used', () => {
    forbiddenLibraries.forEach((lib) => {
      try {
        require(lib);
        throw new Error(
          `External virtualization library "${lib}" is not allowed.`
        );
      } catch (error) {
        if (error.code !== 'MODULE_NOT_FOUND') {
          throw error;
        }
      }
    });
  });
});

describe('Basic Search Functionality', () => {
  const items = [10, 12, 14, 16, 18, 20, 22];

  test('finds the index of an existing item', () => {
    expect(search(items, 14)).toBe(2);
  });
});

describe('Virtualized List Functionality', () => {
  const items = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`);

  test('scrolls to the correct item', () => {
    const { getByText, queryByText } = render(
      <VirtualizedList items={items} scrollToIndex={100} />
    );
    const targetExpectedItem = getByText('Item 101');
    expect(targetExpectedItem).toBeVisible();

    const targetStartItem = queryByText('Item 20');
    expect(targetStartItem).toBeNull();
  });
});
