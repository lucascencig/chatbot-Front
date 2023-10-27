import React, { useState, useEffect, useRef } from 'react';

export const useFetchData = () => {
  const [scrollData, setScrollData] = useState(Array.from({ length: 10 }));
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    const newScrollData = Array.from({ length: 10 });
    setScrollData(scrollData.concat(newScrollData));
    if (scrollData.length > 30) {
      setHasMore(false);
    }
  };

}

