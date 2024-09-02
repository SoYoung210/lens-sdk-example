'use client';

import React, { ReactNode, ComponentPropsWithoutRef } from 'react';
import { Button } from './Button';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Primitive } from '@radix-ui/react-primitive';
import { composeEventHandlers } from '@radix-ui/primitive';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './Tooltip';
import { createContext } from '../utils/react';
import { cn } from '../../utils/style';

const [ActionBarProvider, useActionBarContext] = createContext<{
  activeValue: string | undefined;
  setActiveValue: (value: string | undefined) => void;
}>('ActionBar');

export interface ActionBarProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
}
export const ActionBar = (props: ActionBarProps) => {
  const { children, value: valueFromProps, defaultValue, onValueChange } = props;
  const [activeValue, setActiveValue] = useControllableState({
    prop: valueFromProps,
    onChange: onValueChange,
    defaultProp: defaultValue,
  });

  return (
    <ActionBarProvider activeValue={activeValue} setActiveValue={setActiveValue}>
      <div className="fixed z-50 bottom-5 left-0 right-0 flex justify-center items-center">
        <motion.div
          layout
          className="bg-white rounded-2xl overflow-hidden"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            boxShadow: `rgba(0, 0, 0, 0.24) 0px 8px 30px 0px, rgba(0, 0, 0, 0.12) 0px 6px 16px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.02) 0px 1px 0px 0px`,
          }}
        >
          {children}
        </motion.div>
      </div>
    </ActionBarProvider>
  );
};

export const ActionBarList = ({ children }: { children: ReactNode }) => {
  const { activeValue } = useActionBarContext('ActionBarList');

  if (activeValue !== 'default') {
    return null;
  }

  return (
    <motion.div
      initial={{
        opacity: 1,
      }}
      animate={{
        opacity: 1,
      }}
      layout="position"
      exit={{ opacity: 0 }}
      className="grid grid-flow-col w-auto items-center py-2 pl-2.5 pr-[0.8rem] gap-1"
    >
      {children}
    </motion.div>
  );
};

export interface ActionBarItemProps extends ComponentPropsWithoutRef<'button'> {
  value: string;
  label: string;
  itemOnly?: boolean;
}

export const ActionBarItem = (props: ActionBarItemProps) => {
  const { value, children, onClick, label, itemOnly, className, ...restProps } = props;
  const { setActiveValue } = useActionBarContext('ActionBarItem');

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Primitive.button
            asChild
            className={cn(className, 'mx-1')}
            onClick={composeEventHandlers(onClick, () => {
              if (!itemOnly) {
                setActiveValue(value);
              }
            })}
            {...restProps}
          >
            {children}
          </Primitive.button>
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export interface ActionBarContentProps {
  value: string;
  children: ReactNode;
  bottomRightSlot?: ReactNode;
}

export const ActionBarContent = ({ value, children, bottomRightSlot }: ActionBarContentProps) => {
  const { setActiveValue, activeValue } = useActionBarContext('ActionBarItem');

  if (activeValue !== value) {
    return null;
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      layout="position"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div>{children}</div>
      <hr className="h-px w-full justify-self-end border-none bg-black/[.09]" />
      <div className="flex shrink-0 items-center justify-between gap-1.5 overflow-hidden p-2 w-full min-w-[520px]">
        <Button
          aria-label="Back To Page Navigation Menu"
          variant="ghost"
          size="icon"
          onClick={() => setActiveValue('default')}
          className="text-gray-500 hover:text-gray-800"
        >
          <ArrowLeft width={16} height={16} />
        </Button>
        {bottomRightSlot}
      </div>
    </motion.div>
  );
};

export function ActionBarContentHeader({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center space-x-1 px-3.5 pb-1 pt-2.5 text-xs font-semibold text-gray-500">
      {children}
    </div>
  );
}

export function ActionBarContentMain({ children }: { children: ReactNode }) {
  return <div className="px-3.5 pb-4 pt-2">{children}</div>;
}

ActionBar.List = ActionBarList;
ActionBar.Item = ActionBarItem;
ActionBar.Content = ActionBarContent;
ActionBar.ContentHeader = ActionBarContentHeader;
ActionBar.ContentMain = ActionBarContentMain;
