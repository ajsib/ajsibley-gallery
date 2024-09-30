import React, { createContext, useContext, useState, useEffect } from 'react';

const HeaderContext = createContext<{ isScrolled: boolean; headerHeight: number }>({ isScrolled: false, headerHeight: 60 });

export const useHeaderContext = () => useContext(HeaderContext);

import { ReactNode } from 'react';

interface HeaderProviderProps {
  children: ReactNode;
}

export const HeaderProvider = ({ children }: HeaderProviderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(60); // Initial header height

  const initialHeight = 60;      // Height when not scrolled
  const scrolledHeight = 40;     // Height when scrolled
  const scrollThreshold = 50;    // Scroll distance before header shrinks

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > scrollThreshold) {
        if (!isScrolled) {
          setIsScrolled(true);
          setHeaderHeight(scrolledHeight);
        }
      } else {
        if (isScrolled) {
          setIsScrolled(false);
          setHeaderHeight(initialHeight);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled]);

  return (
    <HeaderContext.Provider value={{ isScrolled, headerHeight }}>
      {children}
    </HeaderContext.Provider>
  );
};
