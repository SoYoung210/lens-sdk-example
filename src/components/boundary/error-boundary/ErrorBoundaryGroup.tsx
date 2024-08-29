'use client';

import { createContext, ReactNode, useContext, useEffect, useMemo } from 'react';
import { useUpdate } from '../../../hooks/useUpdate';
import { useIsChanged } from '../../../hooks/useIsChanged';

export const ErrorBoundaryGroupContext = createContext<
  { reset: () => void; resetKey: number } | undefined
>(undefined);
if (process.env.NODE_ENV !== 'production') {
  ErrorBoundaryGroupContext.displayName = 'ErrorBoundaryGroupContext';
}

export const ErrorBoundaryGroup = ({
  blockOutside = false,
  children,
}: {
  blockOutside?: boolean;
  children?: ReactNode;
}) => {
  const [resetKey, reset] = useUpdate();
  const parentGroup = useContext(ErrorBoundaryGroupContext);
  const isParentGroupResetKeyChanged = useIsChanged(parentGroup?.resetKey);

  useEffect(() => {
    if (!blockOutside && isParentGroupResetKeyChanged) {
      reset();
    }
  }, [isParentGroupResetKeyChanged, reset, blockOutside]);

  const value = useMemo(() => ({ reset, resetKey }), [reset, resetKey]);

  return (
    <ErrorBoundaryGroupContext.Provider value={value}>
      {children}
    </ErrorBoundaryGroupContext.Provider>
  );
};

/**
 * useErrorBoundaryGroup need ErrorBoundaryGroup in parent. if no ErrorBoundaryGroup, this hook will throw Error to prevent that case.
 */
export const useErrorBoundaryGroup = () => {
  const group = useContext(ErrorBoundaryGroupContext);

  if (group === undefined) {
    throw new Error('useErrorBoundaryGroup must be used within an ErrorBoundaryGroup');
  }

  return useMemo(
    () => ({
      /**
       * When you want to reset multiple ErrorBoundaries as children of ErrorBoundaryGroup, You can use this reset
       */
      reset: group.reset,
    }),
    [group.reset]
  );
};
