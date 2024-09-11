// VirtualizedList.jsx
import React, { useState, useEffect, useRef } from 'react';

//components
import { ListItem } from './ListItem';

const itemHeight = 28; // Fixed height for simplicity
const viewportHeight = 560;

//Candidate needs to implement Virtualization here without any external library usage, we will test by passing props.
const VirtualizedList = ({ items, scrollToIndex }) => {
  // Implement Logic for Virtualization here
  return (
    <div
      style={{
        height: viewportHeight,
        overflowY: 'scroll',
        position: 'relative',
      }}
      data-testid="virtualized-container"
      className="w-full h-96 bg-white border border-gray-300 rounded-lg shadow-sm overflow-y-auto"
    >
      {items.map((item, index) => (
        <ListItem key={index} item={item} />
        //We have created ListItem component, Do not use any other component to render each item.
      ))}
    </div>
  );
};

export default VirtualizedList;
