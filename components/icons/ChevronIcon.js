import { Svg, Path } from 'react-native-svg';

export default function ChevronIcon({
  direction = 'bottom',
  strokeColor = '#191919',
}) {
  const directions = {
    top: '180deg',
    bottom: '360deg',
    left: '90deg',
    right: '270deg',
  };

  return (
    <Svg
      xmlns='http://www.w3.org/2000/svg'
      width={12}
      height={8}
      fill='none'
      style={{
        transform: [{ rotate: directions[direction] }],
      }}
    >
      <Path strokeWidth={2.5} stroke={strokeColor} d='m1 1 5 5 5-5' />
    </Svg>
  );
}
