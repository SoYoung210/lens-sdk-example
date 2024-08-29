import { Avatar, AvatarProps } from '@radix-ui/themes';
import { darken, getRandomColor, isLightColor, lighten } from '../../utils/color';
import { calcPercentageValue, cn } from '../../utils/style';

export interface ProfileAvatarProps extends Omit<AvatarProps, 'color' | 'size'> {
  id: string;
  color?: string;
  size?: string | number;
}
export function ProfileAvatar(props: ProfileAvatarProps) {
  const { style, id, color, fallback, size = 40, className, ...restProps } = props;
  const randomColor = getRandomColor(id);
  const backgroundColor = color ?? randomColor;
  const textColor = isLightColor(backgroundColor)
    ? darken(backgroundColor, 0.5)
    : lighten(backgroundColor, 0.5);

  const fontSize = calcPercentageValue(size, 0.54);

  return (
    <div className={cn(className, 'avatar')} style={{ height: size, width: size }}>
      <div className={`mask mask-squircle`} style={{ height: 'inherit', width: 'inherit' }}>
        <Avatar
          style={{ backgroundColor, height: 'inherit', width: 'inherit', fontSize, ...style }}
          // override radix-ui default style
          fallback={<div style={{ color: textColor }}>{fallback}</div>}
          {...restProps}
        />
      </div>
    </div>
  );
}
