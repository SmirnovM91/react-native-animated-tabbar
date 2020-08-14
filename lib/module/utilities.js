import { useRef, useCallback, useEffect } from 'react';
export const noop = () => {};
/**
 * Provide a stable version of useCallback
 * https://gist.github.com/JakeCoxon/c7ebf6e6496f8468226fd36b596e1985
 */

export const useStableCallback = callback => {
  const callbackRef = useRef();
  const memoCallback = useCallback((...args) => callbackRef.current && callbackRef.current(...args), []);
  useEffect(() => {
    callbackRef.current = callback;
    return () => callbackRef.current = undefined;
  });
  return memoCallback;
};
//# sourceMappingURL=utilities.js.map