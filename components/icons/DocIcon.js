import { Svg, Path } from 'react-native-svg';
import { COLORS } from '../../utils/theme';

export default function DocIcon({ isActive }) {
  return (
    <Svg
      width='21'
      height='24'
      viewBox='0 0 21 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <Path
        d='M6.18182 7.90909H9.63636M6.18182 13.0909H14.8182M6.18182 18.2727H14.8182M20 21.7273C20 22.1854 19.818 22.6247 19.4941 22.9486C19.1702 23.2726 18.7308 23.4545 18.2727 23.4545H2.72727C2.26917 23.4545 1.82983 23.2726 1.50591 22.9486C1.18198 22.6247 1 22.1854 1 21.7273V2.72727C1 2.26917 1.18198 1.82983 1.50591 1.50591C1.82983 1.18198 2.26917 1 2.72727 1H11.3636L20 9.63636V21.7273Z'
        stroke={isActive ? COLORS.ORANGE : COLORS.INACTIVE}
        strokeWidth={isActive ? 2.6 : 2.2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}
