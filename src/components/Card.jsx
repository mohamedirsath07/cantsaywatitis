import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  padding = 'p-6',
  hover = false,
  onClick = null 
}) => {
  let cardClass = 'card ';
  if (hover) cardClass += 'hover:shadow-lg ';
  if (onClick) cardClass += 'cursor-pointer ';
  cardClass += className;

  return (
    <div className={cardClass} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
