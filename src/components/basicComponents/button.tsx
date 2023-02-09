import React from 'react';
import style from './button.module.css';

interface ButtonProps {
  attributes: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
  children?: React.ReactNode;
}

export const Button = ({ attributes, children }: ButtonProps) => {
  const { onClick, className, type, disabled } = attributes;
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={className ? `${style.button} ${className}` : style.button}
      type={type ? 'submit' : 'button'}
    >
      {children}
    </button>
  );
};
