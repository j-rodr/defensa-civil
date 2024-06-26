import { COLORS } from '../../utils/theme';
import Svg, { Path } from 'react-native-svg';

export default function ServicesIcon({ isActive }) {
  return (
    <Svg
      width='25'
      height='28'
      viewBox='0 0 25 28'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <Path
        d='M1.3375 7.19744L12.25 13.5099L23.1625 7.19744M12.25 26.0974V13.4974M23.5 18.4974V8.49744C23.4996 8.05903 23.3838 7.62845 23.1644 7.24889C22.945 6.86933 22.6297 6.55414 22.25 6.33494L13.5 1.33494C13.12 1.11552 12.6888 1 12.25 1C11.8112 1 11.38 1.11552 11 1.33494L2.25 6.33494C1.87033 6.55414 1.55498 6.86933 1.33558 7.24889C1.11618 7.62845 1.00045 8.05903 1 8.49744V18.4974C1.00045 18.9358 1.11618 19.3664 1.33558 19.746C1.55498 20.1255 1.87033 20.4407 2.25 20.6599L11 25.6599C11.38 25.8794 11.8112 25.9949 12.25 25.9949C12.6888 25.9949 13.12 25.8794 13.5 25.6599L22.25 20.6599C22.6297 20.4407 22.945 20.1255 23.1644 19.746C23.3838 19.3664 23.4996 18.9358 23.5 18.4974Z'
        stroke={isActive ? COLORS.ORANGE : COLORS.INACTIVE}
        strokeWidth={isActive ? 2.6 : 2.2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}
