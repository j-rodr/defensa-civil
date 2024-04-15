import { Svg, Path } from 'react-native-svg';
import { COLORS } from '../../utils/theme';

export default function FolderIcon({ isActive }) {
  return (
    <Svg
      width='23'
      height='20'
      viewBox='0 0 23 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <Path
        d='M22.5 8.11538C22.5 7.44214 22.2326 6.79647 21.7565 6.32042C21.2804 5.84437 20.6348 5.57692 19.9615 5.57692H11.5L9.06308 0.5H3.03846C2.36522 0.5 1.71955 0.767444 1.2435 1.2435C0.767444 1.71955 0.5 2.36522 0.5 3.03846V16.5769C0.5 17.2502 0.767444 17.8958 1.2435 18.3719C1.71955 18.8479 2.36522 19.1154 3.03846 19.1154H19.9615C20.6348 19.1154 21.2804 18.8479 21.7565 18.3719C22.2326 17.8958 22.5 17.2502 22.5 16.5769V8.11538Z'
        stroke={isActive ? COLORS.ORANGE : COLORS.INACTIVE}
        strokeWidth={isActive ? 2.6 : 2.2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}
