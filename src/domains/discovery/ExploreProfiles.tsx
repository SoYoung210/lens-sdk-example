'use client';

import { LimitType, useExploreProfiles, UseExploreProfilesArgs } from '@lens-protocol/react-web';
import { VerticalUserCard } from '../user/VerticalUserCard';
import { motion } from 'framer-motion';
import { item, list, itemTransition } from './motion';
import { createArray } from '../../utils/array';
import { VerticalImageCard } from '../../components/ui/VerticalImageCard';

export function ExploreProfilesContent(props: UseExploreProfilesArgs) {
  const { data: profiles, loading } = useExploreProfiles({
    limit: LimitType.TwentyFive,
    ...props,
  });

  if (loading) {
    return (
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: [4, 0] }}
        exit={{ opacity: 0, y: 4 }}
        className="pb-5"
      >
        <div className="flex space-x-4 pb-5">
          {createArray(5, (index) => {
            return <VerticalImageCard.Skeleton key={index} />;
          })}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.ol className="flex space-x-4 pb-5" initial="hidden" animate="visible" variants={list}>
      {profiles?.map((profile) => (
        <motion.li
          key={profile.id}
          className="flex-shrink-0"
          transition={itemTransition}
          variants={item}
        >
          <VerticalUserCard profile={profile} />
        </motion.li>
      ))}
    </motion.ol>
  );
}
