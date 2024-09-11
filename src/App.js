// App.jsx
import React, { useState, useEffect } from 'react';
import VirtualizedList from './components/VirtualizedList';
import SearchBar from './components/SearchBar';
import { search } from './utils/search';
import { comparator } from './utils/comparator';

const App = () => {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('');
  const [scrollToIndex, setScrollToIndex] = useState(null);

  useEffect(() => {
    // Simulate fetching items
    const fetchItems = () => {
      const itemList = Array.from({ length: 10000 }, (_, i) => i + 1);
      setItems(itemList);
    };
    fetchItems();
  }, []);

  const handleSearch = () => {
    // candidate needs to implement this search function
    // comparator is already defined, which checks for strict equal to comparision
    const index = search(items, +query, comparator);
    setScrollToIndex(index === -1 ? null : index);
  };

  return (
    <div className="h-full w-full flex flex-col items-center gap-6 m-auto my-10 border rounded-xl pt-4 shadow-xl bg-gray-100 max-w-md">
      <h1 className="text-xl font-bold text-gray-700">
        Virtualization with Search
      </h1>
      <SearchBar
        query={query}
        onQueryChange={setQuery}
        onSearch={handleSearch}
      />
      {/* User needs to implement this VirtualizedList Component */}
      <VirtualizedList items={items} scrollToIndex={scrollToIndex} />
    </div>
  );
};

export default App;
