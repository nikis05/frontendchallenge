import React from 'react';

interface Props {
  isHovered?: boolean;
  color?: string;
  className?: string;
}

const ArrowIcon: React.FC<Props> = ({ isHovered, color, className }) => (
  <svg
    className={className}
    width='8'
    height='4'
    viewBox='0 0 8 4'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M4 4L0 0L8 0L4 4Z'
      fill={isHovered ? '#148ffd' : color || '#a5b1c4'}
    />
  </svg>
);

export default ArrowIcon;
