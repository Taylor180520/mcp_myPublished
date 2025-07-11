import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'px-4 py-2 font-medium rounded-lg transition-colors text-base';
  const variantStyles = {
    primary: 'bg-purple-600 hover:bg-purple-700 text-white disabled:bg-purple-600/50',
    secondary: 'border border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white',
    ghost: 'text-gray-400 hover:text-white',
  };
  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;