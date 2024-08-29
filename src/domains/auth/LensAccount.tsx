'use client';

import { SessionType, useSession } from '@lens-protocol/react-web';
import { useConnect } from 'wagmi';
import { ProfileAvatar } from '../../components/ui/ProfileAvatar';
import { getDisplayNameFromSession, getImageSrc } from '../../utils/lens';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { Primitive } from '@radix-ui/react-primitive';
import { injected } from 'wagmi/connectors';
import { Loader } from '../../components/ui/Loader';
import { composeEventHandlers } from '@radix-ui/primitive';

export interface LensAccountProps extends ComponentPropsWithoutRef<'button'> {
  size?: number | string;
  anonymousFallback?: React.ReactNode;
}
export const LensAccount = forwardRef<HTMLButtonElement, LensAccountProps>((props, ref) => {
  const { size, anonymousFallback, onClick, ...restProps } = props;
  const { data: session } = useSession({ suspense: true });
  const { connect } = useConnect();

  if (session == null) {
    return (
      <ProfileAvatar
        size={size}
        id="A"
        fallback={<Loader className="text-gray-50" size="xsmall" />}
      />
    );
  }

  if (session.type === SessionType.Anonymous || !session.authenticated) {
    return (
      <Primitive.button
        asChild
        ref={ref}
        onClick={composeEventHandlers(onClick, () => {
          connect({ connector: injected() });
        })}
        {...restProps}
      >
        {anonymousFallback}
      </Primitive.button>
    );
  }

  const imageSrc =
    session.type === SessionType.WithProfile ? getImageSrc(session.profile) : undefined;

  return (
    <ProfileAvatar
      id={session.address}
      src={imageSrc}
      size={size}
      fallback={
        <ProfileAvatar
          id={session.address}
          fallback={formatFallbackProfile(getDisplayNameFromSession(session))}
          size={size}
        />
      }
    />
  );
});

export function formatFallbackProfile(input: string) {
  if (input.startsWith('0x')) {
    return input.slice(2, 4);
  } else {
    return input.slice(0, 2).toUpperCase();
  }
}
