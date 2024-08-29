'use client';

import { Profile } from '@lens-protocol/react-web';
import { VerticalImageCard } from '../../components/ui/VerticalImageCard';
import { getImageSrc } from '../../utils/lens';

import { getRandomColor, lighten } from '../../utils/color';
import { ProfileAvatar } from '../../components/ui/ProfileAvatar';
import { formatFallbackProfile } from '../auth/LensAccount';

interface VerticalUserCardProps {
  profile: Profile;
  children?: React.ReactNode;
}
export function VerticalUserCard(props: VerticalUserCardProps) {
  const { profile } = props;
  const title = profile.handle?.suggestedFormatted.localName ?? profile.id;
  const themeColor = getRandomColor(profile.id);

  return (
    <VerticalImageCard
      imageSrc={getImageSrc(profile, 'original')}
      title={title}
      description={<LensProfileDescription profile={profile} />}
      fallbackAvatar={
        <ProfileAvatar
          id={profile.id}
          fallback={formatFallbackProfile(profile.metadata?.displayName ?? title.replace('@', ''))}
          size="12rem"
          className="absolute top-10"
        />
      }
      themeColor={lighten(themeColor, 0.3)}
    />
  );
}

const LensProfileDescription = ({ profile }: VerticalUserCardProps) => {
  const getDescriptions = () => {
    const descriptions = [];

    if (profile.interests.length > 0) {
      const formattedInterests = formatInterests(profile.interests);
      descriptions.push(`interests: ${formattedInterests.join(', ')}.`);
    } else {
      descriptions.push(`They haven't listed any specific interests on their profile.`);
    }

    if (profile.onchainIdentity) {
      const { proofOfHumanity, ens, worldcoin } = profile.onchainIdentity;
      if (proofOfHumanity) {
        descriptions.push(`This user has completed Proof of Humanity verification.`);
      }
      if (ens) {
        descriptions.push(`They have an ENS name registered.`);
      }
      if (worldcoin?.isHuman) {
        descriptions.push(`They've been verified as human through Worldcoin.`);
      }
    }

    if (profile.signless === false) {
      descriptions.push(`This account uses traditional signing for transactions.`);
    } else {
      descriptions.push(`This account is set up for signless transactions.`);
    }

    return descriptions;
  };

  return (
    <span className="space-y-2">
      {getDescriptions().map((desc, index) => (
        <span key={index} className="text-sm">
          {desc}
        </span>
      ))}
    </span>
  );
};

const formatInterest = (interest: string): string => {
  const parts = interest.split('_');

  const formattedParts = parts.map((part) =>
    part.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())
  );

  return formattedParts.join(' ');
};

const formatInterests = (interests: string[]): string[] => {
  const formattedInterests = interests.map(formatInterest);

  return Array.from(new Set(formattedInterests));
};
