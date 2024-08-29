/* eslint-disable @typescript-eslint/ban-types */
import { Profile, Session, SessionType } from '@lens-protocol/react-web';
import { ConstantOrString } from './type';

type ResolutionOption = 'original' | 'optimized';
export function getImageSrc(profile: Profile, option: ResolutionOption = 'optimized') {
  const picture = profile.metadata?.picture;

  if (picture?.__typename === 'ImageSet') {
    const raw = picture.raw.uri;
    const optimized = picture.optimized?.uri;

    return option === 'optimized' ? (optimized ?? raw) : raw;
  }

  const optimized = picture?.image.optimized?.uri;
  const raw = picture?.image.raw.uri;

  return option === 'optimized' ? (optimized ?? raw) : raw;
}

type DisplayName = string & {};

export function getDisplayNameFromSession(session: Session): ConstantOrString<'A'> {
  if (session?.type === SessionType.WithProfile) {
    return (session.profile.metadata?.displayName ?? session.address) as DisplayName;
  }

  if (session?.type === SessionType.JustWallet) {
    return session.address as DisplayName;
  }

  // Anonymous session
  return 'A';
}

type GatewayConfig = {
  primary: string;
  fallback: string;
};
const DEFAULT_GATEWAYS: GatewayConfig = {
  primary: 'https://ipfs.io/ipfs/',
  fallback: 'https://cloudflare-ipfs.com/ipfs/',
};
