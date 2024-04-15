import Svg, { Path } from 'react-native-svg';
import { COLORS } from '../../utils/theme';

export default function MarkerIcon({ isActive }) {
  return (
    <Svg
      width='24'
      height='29'
      viewBox='0 0 24 29'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <Path
        d='M22.5 11.75C22.5 20.1111 11.75 27.2778 11.75 27.2778C11.75 27.2778 1 20.1111 1 11.75C1 8.89892 2.13259 6.16462 4.1486 4.1486C6.16462 2.13259 8.89892 1 11.75 1C14.6011 1 17.3354 2.13259 19.3514 4.1486C21.3674 6.16462 22.5 8.89892 22.5 11.75Z'
        stroke={isActive ? COLORS.ORANGE : COLORS.INACTIVE}
        strokeWidth={isActive ? 2.6 : 2.2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M11.75 15.3333C13.729 15.3333 15.3333 13.729 15.3333 11.75C15.3333 9.77098 13.729 8.16667 11.75 8.16667C9.77098 8.16667 8.16667 9.77098 8.16667 11.75C8.16667 13.729 9.77098 15.3333 11.75 15.3333Z'
        stroke={isActive ? COLORS.ORANGE : COLORS.INACTIVE}
        strokeWidth={isActive ? 2.6 : 2.2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}
