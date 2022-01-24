import React from 'react';

function useMedia(query: 'max-width' | 'min-width', value: number | string) {
  const mediaQuery = `(${query}: ${value}px)`;

  const [matches, setMatches] = React.useState(
    window.matchMedia(mediaQuery).matches
  );

  React.useEffect(() => {
    let media = window.matchMedia(mediaQuery);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    let listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaQuery]);

  return matches;
}

export default useMedia;
