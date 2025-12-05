import { useEffect, useRef } from 'react';

const WrapperClickOutside = ({ closeCallback, children }) => {
  const ref = useRef();
  useEffect(
    () => {
      const listener = event => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        closeCallback();
      };
      document.addEventListener(`mousedown`, listener);
      document.addEventListener(`touchstart`, listener);
      return () => {
        document.removeEventListener(`mousedown`, listener);
        document.removeEventListener(`touchstart`, listener);
      };
    },
    [ref, closeCallback],
  );

  return (
    <div ref={ref}>
      {children}
    </div>
  );
};

export default WrapperClickOutside;
