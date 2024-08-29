'use client';

import { Primitive } from '@radix-ui/react-primitive';
import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { composeEventHandlers } from '@radix-ui/primitive';
import { injected } from 'wagmi/connectors';
import { useSession } from '@lens-protocol/react-web';

type RenderFunction = (props: { address: `0x${string}` | undefined }) => ReactNode;
interface RequireConnectedWalletProps extends Omit<ComponentPropsWithoutRef<'button'>, 'children'> {
  children: ReactNode | RenderFunction;
  defaultFallback: ReactNode;
  loadingFallback?: ReactNode;
}
export const ConnectWallet = forwardRef<HTMLButtonElement, RequireConnectedWalletProps>(
  (props, ref) => {
    const { children, defaultFallback, onClick, loadingFallback, ...restProps } = props;
    const { address, isConnected } = useAccount();
    const { data: session, loading: sessionLoading } = useSession();
    const { connect } = useConnect();

    if (sessionLoading) {
      return loadingFallback;
    }

    const isNotConnected = !session?.authenticated && (!isConnected || address == null);
    if (isNotConnected) {
      return (
        <Primitive.button
          asChild
          ref={ref}
          onClick={composeEventHandlers(onClick, () => {
            connect({ connector: injected() });
          })}
          {...restProps}
        >
          {defaultFallback}
        </Primitive.button>
      );
    }

    return (
      <Primitive.button asChild ref={ref} onClick={onClick} {...restProps}>
        {typeof children === 'function' ? children({ address }) : children}
      </Primitive.button>
    );
  }
);
