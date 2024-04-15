import Svg, { Path } from 'react-native-svg';
import { COLORS } from '../../utils/theme';

export default function PersonIcon({ isActive }) {
  return (
    <Svg
      width='25'
      height='27'
      viewBox='0 0 25 27'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <Path
        d='M12.5023 13.0955C15.8424 13.0955 18.55 10.3878 18.55 7.04773C18.55 3.70766 15.8424 1 12.5023 1C9.16221 1 6.45455 3.70766 6.45455 7.04773C6.45455 10.3878 9.16221 13.0955 12.5023 13.0955Z'
        stroke={isActive ? COLORS.ORANGE : COLORS.INACTIVE}
        strokeWidth={isActive ? 2.6 : 2.2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M24 25.1907C23.2188 22.7546 21.6841 20.6295 19.6173 19.1218C17.5505 17.6141 15.0583 16.8017 12.5 16.8017C9.94171 16.8017 7.4495 17.6141 5.38268 19.1218C3.31587 20.6295 1.78122 22.7546 1 25.1907H24Z'
        stroke={isActive ? COLORS.ORANGE : COLORS.INACTIVE}
        strokeWidth={isActive ? 2.6 : 2.2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}
