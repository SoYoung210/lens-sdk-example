import { ExploreProfilesOrderByType } from '@lens-protocol/react-web';
import { useState } from 'react';
import { ArrowUpDownIcon } from 'lucide-react';
import { enumToArray } from '../../utils/array';
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
import { motion } from 'framer-motion';

export function ExploreProfilesSection() {
  const [orderBy, setOrderBy] = useState(ExploreProfilesOrderByType.MostPublication);

  return (
    <PageContent>
      <PageContent.Heading
        title="Profile"
        description="Explore New Profile"
        rightSlot={
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" leftSlot={<ArrowUpDownIcon className="h-4 w-4" />}>
                {ORDERBY_LABEL[orderBy]}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup
                value={orderBy}
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
      <PageContent.ScrollControl>
        <PageContent.ScrollControlContent>
          <motion.div
            key={orderBy}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
          >
            <ExploreProfilesContent orderBy={orderBy} />
          </motion.div>
        </PageContent.ScrollControlContent>
        <div className="flex gap-4">
          <PageContent.ScrollContainerPrevIconButton className="ml-auto" />
          <PageContent.ScrollContainerNextIconButton className="mr-6" />
        </div>
      </PageContent.ScrollControl>
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
