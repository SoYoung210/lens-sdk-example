import { ComponentPropsWithRef, forwardRef } from 'react';
import { cn } from '../../utils/style';

interface PageHeadingProps extends ComponentPropsWithRef<'div'> {}

export const PageHeading = forwardRef<HTMLDivElement, PageHeadingProps>((props, ref) => {
  const { className, ...restProps } = props;
  return <div {...restProps} ref={ref} className={cn(className, 'mb-5 pt-11 section-content')} />;
});

export const PageHeadingTitle = forwardRef<HTMLHeadingElement, PageHeadingProps>((props, ref) => {
  const { className, ...restProps } = props;
  return (
    <div className={cn(className, 'prose prose-page-heading', 'mb-2')} {...restProps} ref={ref} />
  );
});

export const PageHeadingDescription = forwardRef<HTMLDivElement, PageHeadingProps>((props, ref) => {
  const { className, ...restProps } = props;
  return (
    <div
      {...restProps}
      ref={ref}
      className={cn(className, 'prose prose-page-description', 'pb-6 pt-2 mb-2')}
    />
  );
});
