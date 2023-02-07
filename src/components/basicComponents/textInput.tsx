import React from 'react';
import style from './textInput.module.css';

interface TextInputProps {
  attributes: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
}

export const TextInput = ({ attributes }: TextInputProps) => {
  const { onChange, placeholder, className, type, disabled, value } = attributes;

  return (
    <input
      className={className ? `${style.input} ${className}` : style.input}
      type={type}
      disabled={disabled}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};
