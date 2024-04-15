import Svg, { Path } from 'react-native-svg';
import { COLORS } from '../../utils/theme';

export default function HomeIcon({ isActive = false }) {
  return (
    <Svg
      width='25'
      height='27'
      viewBox='0 0 25 27'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <Path
        d='M8.95833 25.5276V13.7221H16.0417V25.5276M1.875 10.1804L12.5 1.9165L23.125 10.1804V23.1665C23.125 23.7927 22.8762 24.3933 22.4334 24.8361C21.9907 25.2789 21.3901 25.5276 20.7639 25.5276H4.23611C3.60991 25.5276 3.00935 25.2789 2.56655 24.8361C2.12376 24.3933 1.875 23.7927 1.875 23.1665V10.1804Z'
        stroke={isActive ? COLORS.ORANGE : COLORS.INACTIVE}
        strokeWidth={isActive ? 2.6 : 2.2}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </Svg>
  );
}
