// VirtualizedList.jsx
import React, { useState, useEffect, useRef } from 'react';

//components
import { ListItem } from './ListItem';

const itemHeight = 28; // Fixed height for simplicity
const viewportHeight = 560;

const VirtualizedList = ({ items, scrollToIndex }) => {
  const [startIndex, setStartIndex] = useState(0);
  const containerRef = useRef(null);

  const endIndex = Math.min(
    items.length,
    startIndex + Math.ceil(viewportHeight / itemHeight)
  );

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollTop = containerRef.current.scrollTop;
        const newStartIndex = Math.floor(scrollTop / itemHeight);
        setStartIndex(newStartIndex);
      }
    };

    containerRef.current?.addEventListener('scroll', handleScroll);
    return () => {
      containerRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollToIndex !== null && containerRef.current) {
      containerRef.current.scrollTop = scrollToIndex * itemHeight;
      setStartIndex(scrollToIndex);
    }
  }, [scrollToIndex]);

  return (
    <div
      ref={containerRef}
      style={{
        height: viewportHeight,
        overflowY: 'scroll',
        position: 'relative',
      }}
      data-testid="virtualized-container"
      className="w-full h-96 bg-white border border-gray-300 rounded-lg shadow-sm overflow-y-auto"
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${startIndex * itemHeight}px)` }}>
          {items.slice(startIndex, endIndex).map((item, index) => (
            <ListItem key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VirtualizedList;
