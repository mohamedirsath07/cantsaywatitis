import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  className = '',
  icon = null
}) => {
  let buttonClass = 'btn ';
  
  // Add variant classes
  if (variant === 'primary') buttonClass += 'btn-primary ';
  else if (variant === 'outline') buttonClass += 'btn-outline ';
  else if (variant === 'secondary') buttonClass += 'btn-secondary ';
  
  // Add size classes
  if (size === 'lg') buttonClass += 'btn-lg ';
  
  // Add custom classes
  buttonClass += className;

  const buttonStyle = {
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClass}
      style={buttonStyle}
    >
      {icon && <span style={{ marginRight: '0.5rem' }}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
