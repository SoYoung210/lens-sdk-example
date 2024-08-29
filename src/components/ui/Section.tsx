import { ComponentPropsWithRef, forwardRef } from 'react';
import { cn } from '../../utils/style';

interface SectionProps extends ComponentPropsWithRef<'div'> {}

export const Section = forwardRef<HTMLDivElement, SectionProps>((props, ref) => {
  return <div {...props} ref={ref} />;
});

export const SectionTitle = forwardRef<HTMLHeadingElement, SectionProps>((props, ref) => {
  const { className, ...restProps } = props;
  return (
    <div
      className={cn(
        className,
        'prose prose-content-heading-1',
        'text-gray-900 font-semibold text-xl'
      )}
      {...restProps}
      ref={ref}
    />
  );
});

export const SectionDescription = forwardRef<HTMLDivElement, SectionProps>((props, ref) => {
  const { className, ...restProps } = props;
  return (
    <div
      {...restProps}
      ref={ref}
      className={cn(
        className,
        'pt-1',
        'prose prose-content-description-1',
        'text-gray-500 font-normal text-xl'
      )}
    />
  );
});
