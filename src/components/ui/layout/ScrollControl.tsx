'use client';

import React, {
  useRef,
  useState,
  useEffect,
  ComponentPropsWithoutRef,
  forwardRef,
  useCallback,
} from 'react';
import { Primitive } from '@radix-ui/react-primitive';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { createContext } from '../../utils/react';
import { cn } from '../../../utils/style';
import { useCombinedRefs } from '../../../hooks/useCombinedRefs';

interface ScrollContextType {
  scrollRef: React.RefObject<HTMLDivElement>;
  showLeftArrow: boolean;
  showRightArrow: boolean;
  scroll: (direction: 'left' | 'right') => void;
}

const [ScrollControlProvider, useScrollControl] = createContext<ScrollContextType>('ScrollControl');

interface ScrollControlProps {
  children: React.ReactNode;
}
export const ScrollControl = ({ children }: ScrollControlProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
      }
    };

    scrollRef.current?.addEventListener('scroll', handleScroll);
    handleScroll();
    const contentRef = scrollRef.current;

    return () => contentRef?.removeEventListener('scroll', handleScroll);
  }, []);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const element = scrollRef.current;
      const computedStyle = window.getComputedStyle(element);

      const paddingLeft = parseFloat(computedStyle.paddingLeft);
      const paddingRight = parseFloat(computedStyle.paddingRight);

      const visibleWidth = element.clientWidth - paddingLeft - paddingRight;

      const scrollableWidth = element.scrollWidth - element.clientWidth;

      let scrollAmount = visibleWidth;

      if (direction === 'left') {
        const currentScrollPosition = element.scrollLeft;
        scrollAmount = currentScrollPosition - (currentScrollPosition % visibleWidth);
        if (scrollAmount === 0) scrollAmount = visibleWidth;
      } else {
        const remainingScroll = scrollableWidth - element.scrollLeft;
        if (remainingScroll < scrollAmount) scrollAmount = remainingScroll;
      }

      element.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <ScrollControlProvider
      scrollRef={scrollRef}
      showLeftArrow={showLeftArrow}
      showRightArrow={showRightArrow}
      scroll={scroll}
    >
      {children}
    </ScrollControlProvider>
  );
};

const ScrollControlContent = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
  ({ children, className, ...restProps }, forwardedRef) => {
    const { scrollRef } = useScrollControl('ScrollControlContent');
    const combinedRef = useCombinedRefs(scrollRef, forwardedRef);

    return (
      <div
        ref={combinedRef}
        className={cn(className, 'flex overflow-x-auto snap-x snap-mandatory scrollbar-hide')}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);
ScrollControlContent.displayName = 'ScrollControlContent';

const ScrollControlNextTrigger = forwardRef<
  React.ElementRef<typeof Primitive.button>,
  ComponentPropsWithoutRef<typeof Primitive.button>
>(({ children, ...props }, ref) => {
  const { scroll, showRightArrow } = useScrollControl('ScrollControlNextTrigger');

  return (
    <Primitive.button
      ref={ref}
      {...props}
      disabled={!showRightArrow}
      onClick={() => scroll('right')}
    >
      {children}
    </Primitive.button>
  );
});
ScrollControlNextTrigger.displayName = 'ScrollControlNextTrigger';

const ScrollControlPrevTrigger = forwardRef<
  React.ElementRef<typeof Primitive.button>,
  ComponentPropsWithoutRef<typeof Primitive.button>
>(({ children, ...props }, ref) => {
  const { scroll, showLeftArrow } = useScrollControl('ScrollControlPrevTrigger');

  return (
    <Primitive.button ref={ref} {...props} disabled={!showLeftArrow} onClick={() => scroll('left')}>
      {children}
    </Primitive.button>
  );
});
ScrollControlPrevTrigger.displayName = 'ScrollControlPrevTrigger';

const PAGINATION_INDICATOR_ICON_BUTTON_CLASS_NAME =
  'flex items-center justify-center bg-zinc-300 text-black/[0.56] hover:bg-black/[0.16] hover:text-black/[0.64] rounded-full w-9 h-9 transition-colors duration-100 disabled:opacity-45';
const ScrollControlNextIconButton = forwardRef<
  React.ElementRef<typeof ScrollControlNextTrigger>,
  ComponentPropsWithoutRef<typeof ScrollControlNextTrigger>
>(({ className, ...restProps }, ref) => {
  return (
    <ScrollControlNextTrigger
      ref={ref}
      className={cn(PAGINATION_INDICATOR_ICON_BUTTON_CLASS_NAME, className)}
      {...restProps}
    >
      <ChevronRight className="w-6 h-6 stroke-[2.5px]" />
    </ScrollControlNextTrigger>
  );
});
ScrollControlNextIconButton.displayName = 'ScrollControlNextIconButton';

const ScrollControlPrevIconButton = forwardRef<
  React.ElementRef<typeof ScrollControlPrevTrigger>,
  ComponentPropsWithoutRef<typeof ScrollControlPrevTrigger>
>(({ className, ...restProps }, ref) => {
  return (
    <ScrollControlPrevTrigger
      ref={ref}
      className={cn(PAGINATION_INDICATOR_ICON_BUTTON_CLASS_NAME, className)}
      {...restProps}
    >
      <ChevronLeft className="w-6 h-6 stroke-[2.5px]" />
    </ScrollControlPrevTrigger>
  );
});
ScrollControlPrevIconButton.displayName = 'ScrollControlPrevIconButton';

ScrollControl.Content = ScrollControlContent;
ScrollControl.NextTrigger = ScrollControlNextTrigger;
ScrollControl.PrevTrigger = ScrollControlPrevTrigger;
ScrollControl.NextIconButton = ScrollControlNextIconButton;
ScrollControl.PrevIconButton = ScrollControlPrevIconButton;
