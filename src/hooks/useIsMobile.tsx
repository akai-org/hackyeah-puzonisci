import { useEffect, useState } from 'react';

export function useIsMobile() {
  const [windowSize, setWindowSize] = useState<number>(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowSize(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [window.innerWidth]);
  return windowSize < 768;
}
