import { useEffect, useState } from 'react';
import { animated, useSpring, config } from '@react-spring/web';

/**
 * A simple parallax wrapper that can be used to slow down / speed up scroll on
 * an element based on window scroll position.
 * NOTE: Initially planned for use with the map, but performance is not great.
 */
const ParallaxWrapper = ({ speed = 0.25, children }) => {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    function handleScroll() {
      setOffset(window.pageYOffset);
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const springProps = useSpring({
    y: offset * speed,
    position: 'absolute',
    inset: 0,
    height: '100%',
    config: config.stiff,
  });

  return <animated.div style={springProps}>{children}</animated.div>;
};

export default ParallaxWrapper;
