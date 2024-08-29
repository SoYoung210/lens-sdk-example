import { colord } from 'colord';

export function isLightColor(color: string) {
  return colord(color).isLight();
}

export function lighten(color: string, amount: number) {
  return colord(color).lighten(amount).toHex();
}

export function darken(color: string, amount: number) {
  return colord(color).darken(amount).toHex();
}

const colorSet = [
  '#4A90E2',
  '#F5A623',
  '#D0021B',
  '#E29797',
  '#BD10E0',
  '#E19C4F',
  '#9B9B9B',
  '#50E3C2',
  '#E9B730',
  '#4A90E2',
  '#D87861',
  '#7ED321',
  '#B8E986',
  '#417505',
  '#4A4A4A',
  '#9013FE',
  '#F8E71C',
  '#8B572A',
];

export function getRandomColor(uniqId: string, colors = colorSet) {
  const numericId = parseInt(uniqId.slice(Math.min(uniqId.length - 1, 15)), 16);

  const colorIndex = numericId % colors.length;
  return colors[colorIndex];
}
