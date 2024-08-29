'use client';

import { ComponentPropsWithoutRef, forwardRef, Suspense } from 'react';
import { Button } from '../../components/ui/Button';
import { MouseFollowerEyeEmoji } from '../../components/ui/effect/MouseFollowerEyeEmoji';
import { ConnectWallet } from './ConnectWallet';
import { LensAccount } from './LensAccount';

export const ConnectWalletOrLenProfile = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<'button'>
>((props, ref) => {
  return (
    <ConnectWallet defaultFallback={<Fallback />} {...props} ref={ref}>
      <Suspense fallback={<div>load</div>}>
        <LensAccount size={28} anonymousFallback={<Fallback {...props} ref={ref} />} />
      </Suspense>
    </ConnectWallet>
  );
});

const Fallback = forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<'button'>>((props, ref) => {
  return (
    <Button ref={ref} size="icon" variant="ghost" {...props}>
      <MouseFollowerEyeEmoji />
    </Button>
  );
});
