// components/Button/Button.js
import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  fullWidth = false,
  className = ''
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`custom-button ${variant} ${size} ${fullWidth ? 'full-width' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;