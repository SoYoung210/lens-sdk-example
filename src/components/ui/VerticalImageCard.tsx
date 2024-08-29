import React, {
  useState,
  useEffect,
  ReactNode,
  forwardRef,
  ComponentPropsWithoutRef,
  ComponentProps,
} from 'react';
import { FastAverageColor } from 'fast-average-color';
import { Button } from './Button';
import { If } from '../utils/If';
import { Avatar } from '@radix-ui/themes';
import { cn } from '../../utils/style';
import { isLightColor } from '../../utils/color';
import { Skeleton } from './Skeleton';
import { ProgressiveBlur } from './ProgressiveBlur';

interface VerticalImageCardProps {
  title: ReactNode;
  subtitle?: string;
  description?: ReactNode;

  imageSrc?: string;
  fallbackAvatar: ComponentProps<typeof Avatar>['fallback'];
  themeColor: string;
  children?: ReactNode;
}
const fac = new FastAverageColor();
export const VerticalImageCard = (props: VerticalImageCardProps) => {
  const { title, subtitle, description, imageSrc, fallbackAvatar, themeColor, children } = props;
  const [backgroundColor, setBackgroundColor] = useState(themeColor);
  const [textColor, setTextColor] = useState(
    isLightColor(themeColor) ? 'text-black' : 'text-white'
  );
  const [gradientColor, setGradientColor] = useState('');

  useEffect(() => {
    if (imageSrc == null) {
      return;
    }

    fac
      .getColorAsync(imageSrc)
      .then((color) => {
        setBackgroundColor(`rgb(${color.value[0]}, ${color.value[1]}, ${color.value[2]})`);
        setTextColor(color.isLight ? 'text-black' : 'text-white');

        const colorEnd = [...color.value.slice(0, 3), 0].join(',');

        setGradientColor(`linear-gradient(to bottom, rgba(${colorEnd}) 0%, ${color.rgba} 100%)`);
      })
      .catch((e) => {
        // console.error('Error getting average color:', e);
      });
  }, [imageSrc]);

  return (
    <div className="w-full max-w-xs aspect-[3/4]">
      <div
        className="relative w-full h-full rounded-3xl overflow-hidden shadow-lg"
        style={{ backgroundColor }}
      >
        <Avatar
          src={imageSrc}
          fallback={fallbackAvatar}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Blur overlay for bottom portion */}
        <If condition={imageSrc != null}>
          <ProgressiveBlur
            style={{
              background: gradientColor,
            }}
          />
        </If>

        {/* Content */}
        <div className={`relative z-10 h-full flex flex-col justify-between ${textColor}`}>
          <div className="p-6 mt-auto max-h-[45%] scrollbar-hide">
            <div className="h-full overflow-y-auto scrollbar-hide">
              <div className="flex items-end mb-2">
                <div className="text-2xl font-bold">{title}</div>
                <If condition={subtitle != null}>
                  <div className="text-2xl font-semibold opacity-50 ml-1">{subtitle}</div>
                </If>
              </div>
              <If condition={description != null}>
                <p className="text-sm mb-4">{description}</p>
              </If>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface VerticalImageCardButtonProps extends ComponentPropsWithoutRef<typeof Button> {}
const VerticalImageCardButton = forwardRef<HTMLButtonElement, VerticalImageCardButtonProps>(
  (props, ref) => {
    const { children, className, ...restProps } = props;
    return (
      <Button ref={ref} variant="secondary" className={cn(className, 'w-2/6')} {...restProps}>
        {children}
      </Button>
    );
  }
);

export interface VerticalImageCardAvatarProps extends ComponentPropsWithoutRef<typeof Avatar> {}

const VerticalImageCardAvatar = (props: VerticalImageCardAvatarProps) => {
  const { className, ...restProps } = props;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt=""
      {...restProps}
      className={cn(className, 'absolute inset-0 w-full h-full object-cover object-center')}
    />
  );
};

const VerticalImageCardSkeleton = () => {
  return (
    <div className="w-full max-w-xs p-4 bg-gray-50 border-gray-100 rounded-3xl shadow-md flex flex-col aspect-[3/4] flex-shrink-0">
      <div className="mb-4 mt-auto">
        <Skeleton className="h-6 w-24 mb-2" />
        <Skeleton className="h-4 w-48 mb-2" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
};

VerticalImageCard.Button = VerticalImageCardButton;
VerticalImageCard.CoverAvatar = VerticalImageCardAvatar;
VerticalImageCard.Skeleton = VerticalImageCardSkeleton;
