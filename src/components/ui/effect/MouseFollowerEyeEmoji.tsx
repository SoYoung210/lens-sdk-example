'use client';

import React, { useState, useEffect, useRef } from 'react';

interface EyePosition {
  x: number;
  y: number;
}

export interface MouseFollowerEyeEmojiProps {
  size?: number;
}
export const MouseFollowerEyeEmoji = ({ size = 24 }: MouseFollowerEyeEmojiProps) => {
  const baseSize = 150; // The original size for which the hardcoded values were designed
  const scale = size / baseSize;

  const centerX = 37.5 * scale;
  const centerY = 25 * scale;
  const eyeDistance = 35 * scale;

  const [leftEyePosition, setLeftEyePosition] = useState<EyePosition>({
    x: centerX - eyeDistance / 2,
    y: centerY,
  });
  const [rightEyePosition, setRightEyePosition] = useState<EyePosition>({
    x: centerX + eyeDistance / 2,
    y: centerY,
  });

  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (svgRef.current) {
        const svgRect = svgRef.current.getBoundingClientRect();
        const svgCenterX = svgRect.left + svgRect.width / 2;
        const svgCenterY = svgRect.top + svgRect.height / 2;

        const angle = Math.atan2(event.clientY - svgCenterY, event.clientX - svgCenterX);
        const distance = Math.min(
          2.5 * scale,
          Math.sqrt(
            Math.pow(event.clientX - svgCenterX, 2) + Math.pow(event.clientY - svgCenterY, 2)
          ) /
            (20 / scale)
        );

        const newLeftX = centerX - eyeDistance / 2 + Math.cos(angle) * distance;
        const newLeftY = centerY + Math.sin(angle) * distance;
        const newRightX = centerX + eyeDistance / 2 + Math.cos(angle) * distance;
        const newRightY = centerY + Math.sin(angle) * distance;

        setLeftEyePosition({ x: newLeftX, y: newLeftY });
        setRightEyePosition({ x: newRightX, y: newRightY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [scale, centerX, centerY, eyeDistance]);

  const renderEye = (cx: number, cy: number, pupilX: number, pupilY: number): JSX.Element => (
    <>
      <ellipse
        cx={cx}
        cy={cy}
        rx={18 * scale}
        ry={22 * scale}
        fill="#FFFFFF"
        stroke="#D1D1D1"
        strokeWidth={2 * scale}
      />
      <circle cx={pupilX} cy={pupilY} r={7.5 * scale} fill="black" />
      <circle
        cx={pupilX - 2 * scale}
        cy={pupilY - 2 * scale}
        r={2 * scale}
        fill="#ffffff"
        opacity={0.7}
      />
      <ellipse cx={pupilX} cy={pupilY + 2.5 * scale} rx={3 * scale} ry={2 * scale} fill="#4a4a4a" />
    </>
  );

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${75 * scale} ${50 * scale}`}
      width={size}
      height={(size * 2) / 3}
    >
      {/* Left Eye */}
      {renderEye(centerX - eyeDistance / 2, centerY, leftEyePosition.x, leftEyePosition.y)}

      {/* Right Eye */}
      {renderEye(centerX + eyeDistance / 2, centerY, rightEyePosition.x, rightEyePosition.y)}
    </svg>
  );
};
