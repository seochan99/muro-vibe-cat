import React, { useRef, useEffect } from 'react';
import './HistoryDropdown.css';

const HistoryDropdown = ({ 
  history = [], 
  onSelect, 
  isOpen, 
  onToggle, 
  triggerRef 
}) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        triggerRef.current && 
        !triggerRef.current.contains(event.target)
      ) {
        onToggle(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onToggle, triggerRef]);

  const handleSelect = (question) => {
    onSelect(question);
    onToggle(false);
  };

  if (!isOpen || history.length === 0) {
    return null;
  }

  return (
    <div className="history-dropdown" ref={dropdownRef}>
      <div className="history-dropdown-header">
        <span className="history-dropdown-title">이전 질문</span>
        <span className="history-dropdown-count">{history.length}개</span>
      </div>
      <div className="history-dropdown-list">
        {history.map((question, index) => (
          <button
            key={index}
            className="history-dropdown-item"
            onClick={() => handleSelect(question)}
          >
            <span className="history-dropdown-text">
              {question.length > 50 ? `${question.substring(0, 50)}...` : question}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HistoryDropdown; 