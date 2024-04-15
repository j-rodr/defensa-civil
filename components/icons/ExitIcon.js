import { Svg, Path } from 'react-native-svg';

export default function ExitIcon({
  strokeColor = '#191919',
  strokeWidth = 2.5,
}) {
  return (
    <Svg
      width='20'
      height='21'
      viewBox='0 0 20 21'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <Path
        d='M14.25 15V18.75C14.25 19.1478 14.092 19.5294 13.8107 19.8107C13.5294 20.092 13.1478 20.25 12.75 20.25H2.25C1.85218 20.25 1.47064 20.092 1.18934 19.8107C0.908035 19.5294 0.75 19.1478 0.75 18.75V2.25C0.75 1.85218 0.908035 1.47064 1.18934 1.18934C1.47064 0.908035 1.85218 0.75 2.25 0.75H12.75C13.1478 0.75 13.5294 0.908035 13.8107 1.18934C14.092 1.47064 14.25 1.85218 14.25 2.25V6M18.75 10.5H6.75M6.75 10.5L9.75 7.5M6.75 10.5L9.75 13.5'
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}
