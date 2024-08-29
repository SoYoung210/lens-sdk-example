'use client';

import {
  HandleInfo,
  Profile,
  profileId,
  Session,
  SessionType,
  useLogin,
  useProfilesManaged,
  useSession,
} from '@lens-protocol/react-web';
import { injected } from 'wagmi/connectors';
import { toast } from 'sonner';
import { Flex, RadioCards, Text } from '@radix-ui/themes';
import { useAccount, useConnect } from 'wagmi';
import { Loader } from '../../components/ui/Loader';
import { cn } from '../../utils/style';
import { useEffect, useState } from 'react';
import { Button } from '../../components/ui/Button';
import { createContext } from '../../components/utils/react';

interface ProfileListContextType {
  address: string | undefined;
  selectedProfileId: string | undefined;
  setSelectedProfileId: (id: string | undefined) => void;
  handleLogin: () => Promise<void>;
}

const [ProfileListProvider, useProfileList] = createContext<ProfileListContextType>('ProfileList');

export function ProfileList({
  children,
  onSuccess,
}: React.PropsWithChildren<{ onSuccess?: () => void }>) {
  const { address } = useAccount();
  const { execute: login } = useLogin();
  const [selectedProfileId, setSelectedProfileId] = useState<string | undefined>(undefined);

  const handleLogin = async () => {
    if (!address || !selectedProfileId) return;

    const result = await login({
      address: address,
      profileId: profileId(selectedProfileId),
    });

    if (result.isSuccess()) {
      toast.success('Successfully logged in');
      onSuccess?.();
    } else {
      toast.error(result.error.message);
    }
  };

  const contextValue: ProfileListContextType = {
    selectedProfileId,
    setSelectedProfileId,
    handleLogin,
    address,
  };

  return <ProfileListProvider {...contextValue}>{children}</ProfileListProvider>;
}

export function ProfileListSelectButton() {
  const { handleLogin } = useProfileList('ProfileListSelectButton');

  return (
    <Button variant="ghost" size="sm" onClick={handleLogin}>
      Select
    </Button>
  );
}

export function ProfileListContent() {
  const { isDisconnected, isConnecting, isReconnecting } = useAccount();
  const { address } = useProfileList('ProfileListContent');
  const { connect } = useConnect();

  useEffect(() => {
    if (isDisconnected && !isConnecting && !isReconnecting) {
      connect({ connector: injected() });
    }
  }, [connect, isConnecting, isDisconnected, isReconnecting]);

  if (address == null) {
    console.log('@@ here?');
    return (
      <div className="min-h-32 flex items-center justify-center">
        <Loader className="text-gray-300" />
      </div>
    );
  }

  return <ProfileListContentInner address={address} />;
}

interface ProfileListContentInnerProps {
  address: string;
}
function ProfileListContentInner({ address }: ProfileListContentInnerProps) {
  const { selectedProfileId, setSelectedProfileId } = useProfileList('ProfileListContent');

  const {
    data: profiles,
    error,
    loading,
  } = useProfilesManaged({ for: address, includeOwned: true });
  const { data: session } = useSession();

  useEffect(() => {
    if (profiles && profiles.length > 0 && !selectedProfileId) {
      const defaultProfile =
        session != null
          ? profiles.find((p) => isMatchedProfileWithSession(p, session))
          : profiles[0];

      setSelectedProfileId(defaultProfile?.id);
    }
  }, [profiles, session, selectedProfileId, setSelectedProfileId]);

  if (loading || session == null || profiles == null) {
    return (
      <div className="min-h-32 flex items-center justify-center">
        <Loader className="text-gray-300" />
      </div>
    );
  }

  if (error) {
    return <div>error</div>;
  }

  if (profiles.length === 0) {
    return <p className="text-gray-300">No profiles on this wallet.</p>;
  }

  return (
    <RadioCards.Root
      name="id"
      color={undefined}
      columns="1"
      className="pt-2"
      value={selectedProfileId}
      onValueChange={setSelectedProfileId}
    >
      {profiles.map((profile) => {
        const isMatched =
          isMatchedProfileWithSession(profile, session) || selectedProfileId === profile.id;

        return (
          <RadioCards.Item
            className={cn(
              'indicator',
              isMatched && 'ring-2 ring-green-500 ring-offset-2',
              'transition-all duration-200 w-auto',
              // remove radix-ui/themes radio select style
              'data-[state=checked]:after:hidden'
            )}
            value={profile.id}
            key={profile.id}
          >
            <div
              className={cn(
                'w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                isMatched ? 'border-green-500' : 'border-gray-300',
                'mt-1 mr-2'
              )}
            >
              {isMatched && <div className="w-2 h-2 rounded-full bg-green-500" />}
            </div>
            <Flex direction="column" width="100%">
              <Text weight="bold">{formatProfileIdentifier(profile)}</Text>
              <Text>{profile.metadata?.bio}</Text>
            </Flex>
          </RadioCards.Item>
        );
      })}
    </RadioCards.Root>
  );
}

function formatHandle(handle: HandleInfo): string {
  return `@${handle.fullHandle}`;
}

export function formatProfileIdentifier(profile: Profile): string {
  return (
    profile?.metadata?.displayName ?? (profile.handle ? formatHandle(profile.handle) : profile.id)
  );
}

function isMatchedProfileWithSession(profile: Profile, session: Session): boolean {
  if (session.type !== SessionType.WithProfile) {
    return false;
  }

  return profile.id === session.profile.id;
}
