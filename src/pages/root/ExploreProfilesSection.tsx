import { ExploreProfilesOrderByType } from '@lens-protocol/react-web';
import { Suspense, useState } from 'react';
import { ArrowUpDownIcon } from 'lucide-react';
import { createArray, enumToArray } from '../../utils/array';
import { PageContent } from '../../components/ui/layout/PageContent';
import { ExploreProfilesContent } from '../../domains/discovery/ExploreProfiles';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '../../components/ui/Dropdown';
import { Button } from '../../components/ui/Button';
import { VerticalImageCard } from '../../components/ui/VerticalImageCard';
import { AnimatePresence, motion } from 'framer-motion';

export function ExploreProfilesSection() {
  const [orderBy, setOrderBy] = useState(ExploreProfilesOrderByType.MostPublication);

  return (
    <PageContent>
      <PageContent.Heading
        title="Profile"
        description="Explore New Profile"
        rightSlot={
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="secondary">
                <ArrowUpDownIcon className="mr-2 h-4 w-4" />
                {ORDERBY_LABEL[orderBy]}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup
                onValueChange={(v) => {
                  setOrderBy(v as ExploreProfilesOrderByType);
                }}
              >
                {enumToArray(ExploreProfilesOrderByType).map((value) => {
                  return (
                    <DropdownMenuRadioItem key={value} value={value}>
                      {ORDERBY_LABEL[value]}
                    </DropdownMenuRadioItem>
                  );
                })}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        }
      />
      <Suspense
        fallback={
          <AnimatePresence mode="wait">
            <motion.div
              key={`${orderBy}-loader`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="pb-5"
            >
              <PageContent.ScrollControl>
                <PageContent.ScrollControlContent>
                  <div className="flex space-x-4">
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
        <PageContent.ScrollControl>
          <PageContent.ScrollControlContent>
            <AnimatePresence mode="wait">
              <motion.div
                key={orderBy}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
              >
                <ExploreProfilesContent orderBy={orderBy} />
              </motion.div>
            </AnimatePresence>
          </PageContent.ScrollControlContent>
          <div className="flex gap-4">
            <PageContent.ScrollContainerPrevIconButton className="ml-auto" />
            <PageContent.ScrollContainerNextIconButton className="mr-6" />
          </div>
        </PageContent.ScrollControl>
      </Suspense>
    </PageContent>
  );
}

const ORDERBY_LABEL: Record<ExploreProfilesOrderByType, string> = {
  [ExploreProfilesOrderByType.CreatedOn]: 'Created On',
  [ExploreProfilesOrderByType.LatestCreated]: 'Latest Created',
  [ExploreProfilesOrderByType.MostCollects]: 'Most Collects',
  [ExploreProfilesOrderByType.MostComments]: 'Most Comments',
  [ExploreProfilesOrderByType.MostFollowers]: 'Most Followers',
  [ExploreProfilesOrderByType.MostMirrors]: 'Most Mirrors',
  [ExploreProfilesOrderByType.MostPosts]: 'Most Posts',
  [ExploreProfilesOrderByType.MostPublication]: 'Most Publications',
};
