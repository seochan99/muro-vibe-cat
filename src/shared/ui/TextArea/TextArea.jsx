import React from 'react';
import './TextArea.css';

const TextArea = ({
  value,
  onChange,
  placeholder = '',
  label = '',
  error = '',
  disabled = false,
  className = '',
  rows = 4,
  showCatIcon = true,
  ...props
}) => {
  return (
    <div className={`textarea-container ${className}`}>
      {label && (
        <div className="textarea-label-container">
          {showCatIcon && <span className="textarea-cat-icon">🐱</span>}
          <label className="textarea-label">{label}</label>
        </div>
      )}
      <div className="textarea-field-wrapper">
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          className={`textarea-field ${error ? 'textarea-field--error' : ''}`}
          {...props}
        />
        <div className="textarea-decoration">
          <div className="textarea-cat-paw left"></div>
          <div className="textarea-cat-paw right"></div>
        </div>
      </div>
      {error && <span className="textarea-error">{error}</span>}
    </div>
  );
};

export default TextArea; 