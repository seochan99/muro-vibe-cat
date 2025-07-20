import React from 'react';
import './Error.css';

const Error = ({ 
  message = '오류가 발생했습니다.', 
  onRetry, 
  variant = 'error',
  className = '' 
}) => {
  return (
    <div className={`error-container error--${variant} ${className}`}>
      <div className="error-icon">
        {variant === 'error' && '⚠️'}
        {variant === 'warning' && '⚠️'}
        {variant === 'info' && 'ℹ️'}
      </div>
      <div className="error-content">
        <h3 className="error-title">
          {variant === 'error' && '냥... 오류가 발생했어요 😿'}
          {variant === 'warning' && '냥냥~ 주의사항이에요 🐱'}
          {variant === 'info' && '냥냥~ 알림이에요 🐱'}
        </h3>
        <p className="error-message">{message}</p>
        {onRetry && (
          <button onClick={onRetry} className="error-retry-btn">
            😸 다시 시도하기
          </button>
        )}
      </div>
    </div>
  );
};

export default Error; 