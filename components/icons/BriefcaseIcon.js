import { Svg, Path } from 'react-native-svg';
import { COLORS } from '../../utils/theme';

export default function BriefcaseIcon({ isActive }) {
  return (
    <Svg
      width='22'
      height='22'
      viewBox='0 0 22 22'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <Path
        d='M5.34615 11H16.6538M5.34615 15.8462H16.6538M2.11538 5.34615H19.8846C20.7768 5.34615 21.5 6.06939 21.5 6.96154V19.8846C21.5 20.7768 20.7768 21.5 19.8846 21.5H2.11538C1.22323 21.5 0.5 20.7768 0.5 19.8846V6.96154C0.5 6.06939 1.22323 5.34615 2.11538 5.34615ZM7.76923 0.5H14.2308C14.6592 0.5 15.0701 0.670192 15.373 0.973135C15.676 1.27608 15.8462 1.68696 15.8462 2.11538V5.34615H6.15385V2.11538C6.15385 1.68696 6.32404 1.27608 6.62698 0.973135C6.92992 0.670192 7.3408 0.5 7.76923 0.5Z'
        stroke={isActive ? COLORS.ORANGE : COLORS.INACTIVE}
        strokeWidth={isActive ? 2.6 : 2.2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}
