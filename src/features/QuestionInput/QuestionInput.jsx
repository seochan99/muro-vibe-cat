import React, { useState, useRef, useEffect } from 'react';
import { TextArea, Button, HistoryDropdown } from '@/shared/ui';
import { useInputHistory } from '@/shared/lib/hooks';
import './QuestionInput.css';

const QuestionInput = ({
  value,
  onChange,
  onSubmit,
  isLoading,
  disabled = false,
  className = ''
}) => {
  const { history, saveToHistory } = useInputHistory();
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const textareaRef = useRef(null);

  // 페이지 로드 시 자동 포커스
  useEffect(() => {
    if (textareaRef.current && !isLoading && !disabled) {
      const timer = setTimeout(() => {
        textareaRef.current?.focus();
      }, 500); // 0.5초 후 포커스
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, disabled]);

  const handleSubmit = () => {
    if (!value.trim()) return;
    saveToHistory(value);
    onSubmit();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSubmit();
    }
  };

  const handleHistorySelect = (selectedText) => {
    onChange({ target: { value: selectedText } });
  };

  const characterCount = value.length;
  const maxCharacters = 1000; // 최대 글자 수 제한

  return (
    <div className={`question-input ${className}`}>
      <div className="cat-question-container">
        <TextArea
          ref={textareaRef}
          value={value}
          onChange={onChange}
          placeholder="냥~ 예를 들어: 오늘 점심 메뉴로 마라탕 vs 돈까스 중에 골라줘 🍜"
          label="고양이한테 물어보기"
          disabled={disabled || isLoading}
          rows={4}
          onKeyDown={handleKeyPress}
          maxLength={maxCharacters}
          className="cat-question-textarea"
          showCatIcon={true}
        />
      </div>
      
      <div className="question-input-info">
        <div className="character-count">
          <span className={`character-count-text ${characterCount > maxCharacters * 0.8 ? 'character-count-warning' : ''}`}>
            {characterCount} / {maxCharacters}
          </span>
        </div>
        
        <HistoryDropdown
          history={history}
          onSelect={handleHistorySelect}
          isVisible={isHistoryVisible}
          onToggle={setIsHistoryVisible}
        />
      </div>
      
      <div className="question-input-actions">
        <Button
          onClick={handleSubmit}
          disabled={isLoading || !value.trim()}
          size="large"
          className="submit-btn"
        >
          {isLoading ? '냥냥~ 생각 중...' : '🐱 물어보기!'}
        </Button>
        
        {/* <div className="question-input-hint">
          🐾 Ctrl/Cmd + Enter로 빠르게 제출할 수 있어요!
          {history.length > 0 && (
            <span className="history-hint">
              <br />📚 히스토리 버튼을 클릭해서 이전 질문을 불러올 수 있어요!
            </span>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default QuestionInput; 