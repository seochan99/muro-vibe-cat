import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Button, Loading, Error } from '@/shared/ui';
import { GeminiClient } from '@/shared/api';
import { useTypingAnimation } from '@/shared/lib/hooks';
import './AIAnswer.css';

const AIAnswer = ({
  prompt,
  result,
  isLoading,
  error,
  onRetry,
  onCopy,
  onNewAnswer,
  className = ''
}) => {
  const { displayText, isTyping } = useTypingAnimation(result, 30);

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      onCopy?.();
    }
  };

  const handleNewAnswer = async () => {
    if (!prompt.trim()) return;
    onNewAnswer?.();
  };

  return (
    <div className={`ai-answer ${className}`}>
      {isLoading && (
        <Loading size="large" text="AI가 답변을 생성하고 있어요..." />
      )}
      
      {error && (
        <Error
          message={error}
          onRetry={onRetry}
          variant="error"
        />
      )}
      
      {result && !isLoading && (
        <div className="ai-answer-container">
          <div className="ai-answer-content">
            <h3 className="ai-answer-title">AI 답변</h3>
            <div className="ai-answer-text">
              <ReactMarkdown>{displayText}</ReactMarkdown>
              {isTyping && <span className="typing-cursor">|</span>}
            </div>
          </div>
          
          <div className="ai-answer-actions">
            <Button
              onClick={handleCopy}
              variant="success"
              size="medium"
            >
              📋 복사하기
            </Button>
            
            <Button
              onClick={handleNewAnswer}
              variant="primary"
              size="medium"
            >
              🔄 다른 답변 보기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAnswer; 