import { cn } from '../../utils/style';

interface LoaderProps {
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  className?: string;
}

export function Loader(props: LoaderProps) {
  const { size = 'medium', className } = props;
  return <span className={cn(className, `loading loading-spinner ${sizeMap[size]}`)} />;
}

const sizeMap = {
  xsmall: 'loading-xs',
  small: 'loading-sm',
  medium: 'loading-md',
  large: 'loading-lg',
};
