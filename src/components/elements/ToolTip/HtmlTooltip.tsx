import * as React  from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

export const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => {
  const [leaveDelay, setLeaveDelay] = React.useState<number>(200)
  function onTooltipTouchStart(event: React.TouchEvent<HTMLDivElement>): void {
    setLeaveDelay(5000)
  }
  function onTooltipClose(event: Event | React.SyntheticEvent<Element, Event>): void {
    setLeaveDelay(200)
  }
  return (
    <Tooltip {...props} classes={{ popper: className }} leaveDelay={leaveDelay} onTouchStart={onTooltipTouchStart} onClose={onTooltipClose} />
    // <Tooltip {...props} classes={{ popper: className }} />
  );
})(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

// export default function HtmlTooltip() {
//   function onTooltipTouchStart(event: React.TouchEvent<HTMLDivElement>): void {
//     throw new Error('Function not implemented.');
//   }
//   function onTooltipClose(event: Event | React.SyntheticEvent<Element, Event>): void {
//     throw new Error('Function not implemented.');
//   }
//   return (
//     <>
//       {styled(({ className, ...props }: TooltipProps) => (
//         <Tooltip {...props} classes={{ popper: className }} onTouchStart={onTooltipTouchStart} onClose={onTooltipClose} />
//       ))(({ theme }) => ({
//         [`& .${tooltipClasses.tooltip}`]: {
//           backgroundColor: '#f5f5f9',
//           color: 'rgba(0, 0, 0, 0.87)',
//           maxWidth: 220,
//           fontSize: theme.typography.pxToRem(12),
//           border: '1px solid #dadde9',
//         },
//       }))}
//     </>

//   );
// }
