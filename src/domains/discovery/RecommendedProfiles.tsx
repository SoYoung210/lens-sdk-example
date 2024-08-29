'use client';

import {
  ProfileId,
  useDismissRecommendedProfiles,
  useRecommendedProfiles,
} from '@lens-protocol/react-web';
import { VerticalUserCard } from '../user/VerticalUserCard';
import { Button } from '../../components/ui/Button';
import { motion } from 'framer-motion';
import { item, itemTransition, list } from './motion';

export interface RecommendedProfilesContentProps {
  shuffle?: boolean;
  profileId: ProfileId;
}

export function RecommendedProfilesContent({
  profileId,
  shuffle,
}: RecommendedProfilesContentProps) {
  const { data: profiles } = useRecommendedProfiles({
    for: profileId,
    shuffle,
    suspense: true,
  });

  const { execute: dismiss, loading: dismissing } = useDismissRecommendedProfiles();

  const dismissRecommendation = (id: ProfileId) => {
    void dismiss({ profileIds: [id] });
  };

  return (
    <motion.ol className="flex space-x-4 pb-5" initial="hidden" animate="visible" variants={list}>
      {profiles?.map((p) => (
        <motion.li
          key={p.id}
          className="flex-shrink-0"
          transition={itemTransition}
          style={{
            listStyle: 'none',
          }}
          variants={item}
        >
          <VerticalUserCard profile={p}>
            <Button
              className="border-r-[1000px]"
              onClick={() => dismissRecommendation(p.id)}
              disabled={dismissing}
            >
              Dismiss recommendation
            </Button>
          </VerticalUserCard>
        </motion.li>
      ))}
    </motion.ol>
  );
}
