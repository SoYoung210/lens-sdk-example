import { CSSProperties } from 'react';
import { cn } from '../../utils/style';

interface ProgressiveBlurProps {
  className?: string;
  style?: CSSProperties;
  height?: string;
}

// TODO: add direction prop
export const ProgressiveBlur = ({ className, height = '65%', style }: ProgressiveBlurProps) => {
  const blurLayers = [
    { zIndex: 1, blur: '0.5px', mask: '0%, 12.5%, 25%, 37.5%' },
    { zIndex: 2, blur: '1px', mask: '12.5%, 25%, 37.5%, 50%' },
    { zIndex: 3, blur: '2px', mask: '25%, 37.5%, 50%, 62.5%' },
    { zIndex: 4, blur: '4px', mask: '37.5%, 50%, 62.5%, 75%' },
    { zIndex: 5, blur: '8px', mask: '50%, 62.5%, 75%, 87.5%' },
    { zIndex: 6, blur: '16px', mask: '62.5%, 75%, 87.5%, 100%' },
    { zIndex: 7, blur: '32px', mask: '75%, 87.5%, 100%' },
    { zIndex: 8, blur: '64px', mask: '87.5%, 100%' },
  ];

  const createMaskGradient = (mask: string) => {
    const [start, startMid, endMid, end] = mask.split(', ');
    return `linear-gradient(to bottom,
      rgba(0, 0, 0, 0) ${start},
      rgba(0, 0, 0, 1) ${startMid || start},
      rgba(0, 0, 0, 1) ${endMid || startMid || start},
      rgba(0, 0, 0, 0) ${end || endMid || startMid || start}
    )`;
  };

  return (
    <div
      className={cn(className, `absolute z-10 inset-x-0 bottom-0 pointer-events-none`)}
      style={{ height, ...style }}
    >
      {blurLayers.map((layer, index) => (
        <div
          key={index}
          className="absolute inset-0"
          style={{
            zIndex: layer.zIndex,
            backdropFilter: `blur(${layer.blur})`,
            WebkitBackdropFilter: `blur(${layer.blur})`,
            maskImage: createMaskGradient(layer.mask),
            WebkitMaskImage: createMaskGradient(layer.mask),
          }}
        />
      ))}
    </div>
  );
};
