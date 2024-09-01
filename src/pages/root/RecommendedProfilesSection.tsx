'use client';

import { forwardRef, ReactNode, Suspense, useState } from 'react';
import { PageContent } from '../../components/ui/layout/PageContent';
import { Button } from '../../components/ui/Button';
import { RequireProfileSession } from '../../domains/auth/RequireProfileSession';
import { RecommendedProfilesContent } from '../../domains/discovery/RecommendedProfiles';
import { CatIcon, ShuffleIcon, WalletMinimalIcon, LucideIcon } from 'lucide-react';
import { NOISE_BG_BASE_64 } from '../../utils/style';
import { createArray } from '../../utils/array';
import { VerticalImageCard } from '../../components/ui/VerticalImageCard';
import { AnimatePresence, motion } from 'framer-motion';

export function RecommendedProfilesSection() {
  const [shuffle, setShuffle] = useState(false);
  return (
    <PageContent>
      <PageContent.Heading
        title="Profile"
        description="Recommend"
        rightSlot={
          <Button
            variant={shuffle ? 'default' : 'secondary'}
            onClick={() => setShuffle((prev) => !prev)}
          >
            <ShuffleIcon className="h-4 w-4" />
            Shuffle
          </Button>
        }
      />
      <Suspense
        fallback={
          <AnimatePresence>
            <motion.div
              key={'loader'}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="pb-5"
            >
              <PageContent.ScrollControl>
                <PageContent.ScrollControlContent>
                  <div className="flex space-x-4 pb-5">
                    {createArray(5, (index) => {
                      return <VerticalImageCard.Skeleton key={index} />;
                    })}
                  </div>
                </PageContent.ScrollControlContent>
              </PageContent.ScrollControl>
            </motion.div>
          </AnimatePresence>
        }
      >
        <RequireProfileSession
          profileFallback={
            <FallbackContent
              title="Connect your Profile"
              description="Tap the eye emoji in the ActionBar!"
              Asset={CatIcon}
            />
          }
          walletFallback={<WalletFallbackContent />}
          walletLoadingFallback={
            <PageContent.ScrollControl>
              <PageContent.ScrollControlContent>
                <div className="flex space-x-4">
                  {createArray(5, (index) => {
                    return <VerticalImageCard.Skeleton key={index} />;
                  })}
                </div>
              </PageContent.ScrollControlContent>
            </PageContent.ScrollControl>
          }
        >
          {({ profile }) => (
            <PageContent.ScrollControl>
              <PageContent.ScrollControlContent>
                <AnimatePresence mode="wait">
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                  >
                    <RecommendedProfilesContent shuffle={shuffle} profileId={profile.id} />
                  </motion.div>
                </AnimatePresence>
              </PageContent.ScrollControlContent>
              <div className="flex gap-4">
                <PageContent.ScrollContainerPrevIconButton className="ml-auto" />
                <PageContent.ScrollContainerNextIconButton className="mr-6" />
              </div>
            </PageContent.ScrollControl>
          )}
        </RequireProfileSession>
      </Suspense>
    </PageContent>
  );
}

const WalletFallbackContent = forwardRef<HTMLButtonElement>((props, ref) => {
  return (
    <FallbackContent
      title="Connect your Wallet"
      description="Explore recommended profiles"
      Asset={WalletMinimalIcon}
    >
      <Button ref={ref} {...props}>
        Connect
      </Button>
    </FallbackContent>
  );
});

interface FallbackContentProps {
  title: ReactNode;
  description: ReactNode;
  children?: ReactNode;
  Asset?: LucideIcon;
}
const FallbackContent = (props: FallbackContentProps) => {
  const { children, title, description, Asset } = props;
  return (
    <PageContent.ScrollControl>
      <PageContent.ScrollControlContent>
        <div className="flex items-center justify-center overflow-hidden relative min-h-80 w-full mx-auto my-4 p-6 bg-white rounded-lg shadow-[0_0_0_1px_rgba(0,0,0,.06),0_2px_6px_1px_rgba(0,0,0,.06)]">
          {/* Noisy background */}
          <div
            className="absolute inset-0 z-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/webp;base64,${NOISE_BG_BASE_64}")`,
              backgroundRepeat: 'repeat',
              backgroundSize: '200px 200px',
            }}
            aria-hidden="true"
          />
          {/* Title and description */}
          <div className="flex flex-col items-center justify-center">
            {Asset != null ? (
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                {/* <WalletMinimalIcon className="w-8 h-8 text-gray-400" /> */}
                <FallbackContentAssetRoot>
                  <Asset className="w-full h-full" />
                </FallbackContentAssetRoot>
              </div>
            ) : null}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-sm text-gray-500 mb-6">{description}</p>
            {children}
          </div>
        </div>
      </PageContent.ScrollControlContent>
    </PageContent.ScrollControl>
  );
};

const FallbackContentAssetRoot = (props: { children: ReactNode }) => {
  return <div className="w-8 h-8 text-gray-400">{props.children}</div>;
};
