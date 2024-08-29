import { ComponentPropsWithoutRef } from 'react';
import { cn } from '../../utils/style';

// TODO: add horizontal separator
export function Separator(props: ComponentPropsWithoutRef<'div'>) {
  const { className, style, ...restProps } = props;
  return (
    <hr
      {...restProps}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.09)',
        ...style,
      }}
      className={cn(className, 'mx-1 h-4 w-px shrink-0 border-none')}
    />
  );
}
