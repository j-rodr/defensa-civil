import { Svg, Path } from 'react-native-svg';
import { COLORS } from '../../utils/theme';

export default function XIcon({ strokeColor = COLORS.BASE }) {
  return (
    <Svg xmlns='http://www.w3.org/2000/svg' width={18} height={18} fill='none'>
      <Path
        stroke={strokeColor}
        strokeLinecap='square'
        strokeLinejoin='round'
        strokeWidth={2.6}
        d='M16 2 2 16M2 2l14 14'
      />
    </Svg>
  );
}
