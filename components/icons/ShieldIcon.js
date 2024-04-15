import { COLORS } from '../../utils/theme';
import Svg, { Path } from 'react-native-svg';

export default function ShieldIcon({ isActive }) {
  return (
    <Svg
      width='21'
      height='26'
      viewBox='0 0 21 26'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <Path
        d='M10.5 24.75C10.5 24.75 20 20 20 12.875V4.5625L10.5 1L1 4.5625V12.875C1 20 10.5 24.75 10.5 24.75Z'
        stroke={isActive ? COLORS.ORANGE : COLORS.INACTIVE}
        strokeWidth={isActive ? 2.6 : 2.2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}
