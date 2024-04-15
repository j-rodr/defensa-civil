import { COLORS } from '../../utils/theme';
import Svg, { Path } from 'react-native-svg';

export default function AboutIcon({ isActive }) {
  return (
    <Svg
      width='26'
      height='26'
      viewBox='0 0 26 26'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <Path
        d='M9.33075 9.225C9.607 8.43971 10.1523 7.77753 10.8699 7.35573C11.5876 6.93394 12.4315 6.77975 13.2519 6.92049C14.0724 7.06122 14.8166 7.48779 15.3527 8.12465C15.8888 8.7615 16.1822 9.56754 16.181 10.4C16.181 12.75 12.656 13.925 12.656 13.925M12.75 18.625H12.7617M24.5 12.75C24.5 19.2393 19.2393 24.5 12.75 24.5C6.26065 24.5 1 19.2393 1 12.75C1 6.26065 6.26065 1 12.75 1C19.2393 1 24.5 6.26065 24.5 12.75Z'
        stroke={isActive ? COLORS.ORANGE : COLORS.INACTIVE}
        strokeWidth={isActive ? 2.6 : 2.2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}
