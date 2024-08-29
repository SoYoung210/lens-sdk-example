'use client';

import { useExploreProfiles, UseExploreProfilesArgs } from '@lens-protocol/react-web';
import { VerticalUserCard } from '../user/VerticalUserCard';
import { motion } from 'framer-motion';
import { item, list, itemTransition } from './motion';

export function ExploreProfilesContent(props: UseExploreProfilesArgs) {
  const { data: profiles } = useExploreProfiles({
    ...props,
    suspense: true,
  });

  return (
    <motion.ol className="flex space-x-4 pb-5" initial="hidden" animate="visible" variants={list}>
      {profiles.map((profile) => (
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
