'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to determine drawer direction based on viewport width
 * Returns 'bottom' for mobile (<768px) and 'right' for desktop
 */
export function useDrawerDirection(): 'right' | 'bottom' {
  const [drawerDirection, setDrawerDirection] = useState<'right' | 'bottom'>('right');

  useEffect(() => {
    const handleResize = () => {
      setDrawerDirection(window.innerWidth < 768 ? 'bottom' : 'right');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return drawerDirection;
}
