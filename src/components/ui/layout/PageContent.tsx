import { Flex } from '@radix-ui/themes';
import { Section, SectionDescription, SectionTitle } from '../Section';
import { If } from '../../utils/If';
import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react';
import { cn } from '../../../utils/style';
import { ScrollControl } from './ScrollControl';

export interface PageContentProps {
  children: React.ReactNode;
}
export function PageContent(props: PageContentProps) {
  return <Section>{props.children}</Section>;
}

export interface PageContentHeadingProps {
  rightSlot?: React.ReactNode;
  title: ReactNode;
  description?: ReactNode;
}

export function PageContentHeading(props: PageContentHeadingProps) {
  const { rightSlot, title, description } = props;
  return (
    <Flex className="section-content">
      <h2>
        <SectionTitle>{title}</SectionTitle>
        <SectionDescription>{description}</SectionDescription>
      </h2>
      <If condition={rightSlot != null}>
        <div className="ml-auto">{rightSlot}</div>
      </If>
    </Flex>
  );
}

export interface PageContentScrollContainerProps extends ComponentPropsWithoutRef<'div'> {
  paddingInline?: 'start' | 'end' | 'both';
}

export const PageContentScrollContent = forwardRef<HTMLDivElement, PageContentScrollContainerProps>(
  (props, ref) => {
    const { paddingInline = 'start', className, style, children, ...restProps } = props;

    const paddingValue = 'calc(50% - var(--viewport-content)/2)';

    const containerStyle = {
      ...style,
      scrollPaddingInlineStart: paddingInline !== 'end' ? paddingValue : undefined,
      scrollPaddingInlineEnd: paddingInline !== 'start' ? paddingValue : undefined,
      paddingInlineStart: paddingInline !== 'end' ? paddingValue : undefined,
      paddingInlineEnd: paddingInline !== 'start' ? paddingValue : undefined,
    };

    return (
      <ScrollControl.Content
        ref={ref}
        className={cn(className, 'section-content-main-viewport my-4')}
        style={containerStyle}
        {...restProps}
      >
        {children}
      </ScrollControl.Content>
    );
  }
);

PageContent.Heading = PageContentHeading;
PageContent.ScrollControl = ScrollControl;
PageContent.ScrollControlContent = PageContentScrollContent;
PageContent.ScrollContainerNextIconButton = ScrollControl.NextIconButton;
PageContent.ScrollContainerPrevIconButton = ScrollControl.PrevIconButton;
