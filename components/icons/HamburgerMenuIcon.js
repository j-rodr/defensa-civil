import { Svg, Path } from 'react-native-svg';
import { COLORS } from '../../utils/theme';

export default function HamburgerMenuIcon() {
  return (
    <Svg xmlns='http://www.w3.org/2000/svg' width={26} height={17} fill='none'>
      <Path
        stroke={COLORS.BLUE}
        strokeLinecap='square'
        strokeLinejoin='round'
        strokeWidth={1.8}
        d='M1 16h24M1 8.5h24M1 1h24'
      />
    </Svg>
  );
}
