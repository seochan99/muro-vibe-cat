import React from 'react';
import './Input.css';

const Input = ({
  value,
  onChange,
  placeholder = '',
  type = 'text',
  label = '',
  error = '',
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <div className={`input-container ${className}`}>
      {label && <label className="input-label">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`input-field ${error ? 'input-field--error' : ''}`}
        {...props}
      />
      {error && <span className="input-error">{error}</span>}
    </div>
  );
};

export default Input; 