'use client';

import { ActionBar } from '../components/ui/ActionBar';
import Link from 'next/link';
import {
  PageHeading,
  PageHeadingDescription,
  PageHeadingTitle,
} from '../components/ui/PageHeading';
import { Button } from '../components/ui/Button';
import {
  ProfileListContent,
  ProfileListSelectButton,
  ProfileList,
} from '../domains/auth/ProfileList';
import { Separator } from '../components/ui/Separator';
import { ConnectWalletOrLenProfile } from '../domains/auth/ConnectWalletAndProfileList';
import { forwardRef, useState } from 'react';

import { ExploreProfilesSection } from '../page-contents/root/ExploreProfilesSection';
import { RecommendedProfilesSection } from '../page-contents/root/RecommendedProfilesSection';
import { BookOpenIcon, CompassIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { If } from '../components/utils/If';
import { useUpdate } from '../hooks/useUpdate';
import { cn } from '../utils/style';

export default function Home() {
  const [activeBarMenu, setActiveBarMenu] = useState('default');
  return (
    <div className="min-h-screen bg-[#f4f5f6]">
      <div
        className="pointer-events-none fixed inset-0 z-1 w-full"
        style={{
          height: 180,
          background: `linear-gradient(rgba(66, 144, 243, 0.2) 0%, rgba(206, 127, 243, 0.1) 52.58%, rgba(248, 236, 215, 0) 100%)`,
        }}
      />
      <main>
        <PageHeading>
          <PageHeadingTitle>
            <h1>Discover</h1>
          </PageHeadingTitle>
          <PageHeadingDescription>
            <div>
              Explore Lens Profiles by sorting them based on various criteria. Discover recommended
              profiles tailored to your interests.
            </div>
          </PageHeadingDescription>
        </PageHeading>

        <div className="flex flex-col gap-7 pb-24">
          <ExploreProfilesSection />
          <RecommendedProfilesSection />
        </div>
      </main>
      {/* Fixed ActionBar */}
      <ActionBar value={activeBarMenu} onValueChange={setActiveBarMenu}>
        <ActionBar.List>
          <ActionBar.Item value="navbar-link-home" label="home" itemOnly>
            <NavBarLinkButton href="/">
              <CompassIcon size={24} />
            </NavBarLinkButton>
          </ActionBar.Item>
          <ActionBar.Item value="nav-bar-item-publication" label="Coming Soon!" itemOnly>
            <NavBarLinkButton wip href="">
              <BookOpenIcon />
            </NavBarLinkButton>
          </ActionBar.Item>
          <Separator />
          <ActionBar.Item value="connect-wallet" label="Connect the Wallet!">
            <ConnectWalletOrLenProfile />
          </ActionBar.Item>
        </ActionBar.List>
        <ProfileList onSuccess={() => setActiveBarMenu('default')}>
          <ActionBar.Content value="connect-wallet" bottomRightSlot={<ProfileListSelectButton />}>
            <ActionBar.ContentHeader>All Profiles</ActionBar.ContentHeader>
            <ActionBar.ContentMain>
              <ProfileListContent />
            </ActionBar.ContentMain>
          </ActionBar.Content>
        </ProfileList>
      </ActionBar>
    </div>
  );
}

interface NavBarLinkButtonProps {
  href: string;
  children: React.ReactNode;
  wip?: boolean;
  className?: string;
}

const activeClassName = 'bg-black/[.03] border border-[rgba(0,0,0,0.03)]';
const commonButtonClass =
  'relative rounded-[10px] hover:border hover:bg-black/[.03] hover:border-[rgba(0,0,0,0.03)]';
const NavBarLinkButton = forwardRef<HTMLButtonElement, NavBarLinkButtonProps>((props, ref) => {
  const { href, children, wip, className, ...restProps } = props;
  const pathname = usePathname();
  const isActive = pathname === href;

  const [key, update] = useUpdate(-1);

  if (wip) {
    return (
      <Button
        key={key}
        ref={ref}
        {...restProps}
        onClick={update}
        className={cn(
          className,
          commonButtonClass,
          `text-[#131517A3] ${key !== -1 ? 'animate-shake-x' : ''}`
        )}
        variant="ghost"
        size="icon"
      >
        {children}
      </Button>
    );
  }

  return (
    <Button
      ref={ref}
      className={cn(className, commonButtonClass, isActive ? activeClassName : '')}
      variant={isActive ? 'secondary' : 'ghost'}
      size="icon"
      asChild
    >
      <Link href={href} {...restProps}>
        {children}
        <If condition={isActive}>
          <span className="absolute bottom-[2px] left-1/2 -translate-x-1/2 w-[0.21rem] h-[0.21rem] bg-sky-600 rounded-full" />
        </If>
      </Link>
    </Button>
  );
});
