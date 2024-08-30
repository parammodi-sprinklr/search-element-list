// App.jsx
import React, { useState, useEffect } from 'react';
import VirtualizedList from './components/VirtualizedList';
import SearchBar from './components/SearchBar';
import { search } from './utils/search';
import { comparator } from './utils/comparator';

//App Component
const App = () => {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('');
  const [scrollToIndex, setScrollToIndex] = useState(null);

  useEffect(() => {
    // Simulate fetching items
    //For Simplicity of comparision, we are generating strings which have numeric value
    const fetchItems = () => {
      const itemList = Array.from({ length: 1000 }, (_, i) => `${i + 1}`);
      setItems(itemList);
    };
    fetchItems();
  }, []);

  const handleSearch = () => {
    const index = search(items, query, comparator);
    setScrollToIndex(index === -1 ? null : index);
  };

  return (
    <div>
      <h1>Search Functionality</h1>
      <SearchBar
        query={query}
        onQueryChange={setQuery}
        onSearch={handleSearch}
      />
      <VirtualizedList items={items} scrollToIndex={scrollToIndex} />
    </div>
  );
};

export default App;
