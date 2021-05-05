// from https://gist.github.com/nslocum/f147149a243069577a91f5e1beaa5776
import { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';

function useWindowWidth(delay = 700) {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    const debouncedHandleResize = debounce(handleResize, delay);
    window.addEventListener('resize', debouncedHandleResize);
    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    }
  }, [delay]);

  return width;
}

export default useWindowWidth;
