'use client';

import { ProfileSession, SessionType } from '@lens-protocol/react-web';
import { ComponentProps } from 'react';

import { WhenLoggedIn, LoggedInChildren } from './WhenLoggedIn';
import { ConnectWallet } from './ConnectWallet';
import { Button } from '../../components/ui/Button';

export type RequireProfileSessionProps = {
  children: LoggedInChildren<ProfileSession>;
  profileFallback: ComponentProps<typeof ConnectWallet>['children'];
  walletFallback?: ComponentProps<typeof ConnectWallet>['defaultFallback'];
  walletLoadingFallback?: ComponentProps<typeof ConnectWallet>['loadingFallback'];
};

export function RequireProfileSession(props: RequireProfileSessionProps) {
  const {
    children,
    profileFallback,
    walletFallback = <Button>connect</Button>,
    walletLoadingFallback,
  } = props;

  return (
    <WhenLoggedIn
      with={SessionType.WithProfile}
      fallback={
        <ConnectWallet defaultFallback={walletFallback} loadingFallback={walletLoadingFallback}>
          {typeof profileFallback === 'function'
            ? ({ address }) => profileFallback({ address })
            : profileFallback}
        </ConnectWallet>
      }
    >
      {children}
    </WhenLoggedIn>
  );
}
