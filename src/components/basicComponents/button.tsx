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
  const { onClick, className, type } = attributes;
  return (
    <button
      onClick={onClick}
      className={className ? `${style.button} ${className}` : style.button}
      type={type ? 'submit' : 'button'}
    >
      {children}
    </button>
  );
};
