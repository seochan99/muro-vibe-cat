import React, { useState } from 'react';
import Lottie from 'lottie-react';
import { Button, Toast, Background, SEO } from '@/shared/ui';
import QuestionInput from '@/features/QuestionInput';
import AIAnswer from '@/features/AIAnswer';
import { useGeminiAI, useToast } from '@/shared/lib/hooks';

import './HomePage.css';

const HomePage = () => {
  const [prompt, setPrompt] = useState('');
  const { isLoading, error, result, generateAnswer, retry, reset } = useGeminiAI();
  const { toast, showSuccess, showError, showInfo, hideToast } = useToast();

  const handleSubmit = async () => {
    await generateAnswer(prompt);
  };

  const handleRetry = () => {
    retry();
    handleSubmit();
  };

  const handleCopy = async () => {
    if (result) {
      try {
        await navigator.clipboard.writeText(result);
        showSuccess('냥냥~ 답변이 복사되었어요! 🐾');
      } catch {
        showError('냥... 복사에 실패했어요. 다시 시도해주세요.');
      }
    }
  };

  const handleNewQuestion = () => {
    setPrompt('');
    reset();
    showInfo('냥냥~ 새로운 질문을 시작해요! 🐱');
  };

  const handleNewAnswer = async () => {
    await generateAnswer(prompt);
  };

  return (
    <div className="homepage">
      <SEO 
        title="물어봐이브 (Mureo-Vibe) - 귀여운 고양이 AI 어시스턴트 🐱"
        description="귀여운 고양이 AI가 냥~ 하고 답해주는 재미있는 AI 챗봇 서비스입니다. 궁금한 것을 물어보세요!"
        keywords="AI 챗봇, 고양이 AI, 물어봐이브, Mureo-Vibe, 인공지능, 챗봇, 고양이, 냥, AI 어시스턴트"
      />
      <Background />
      <div className="homepage-container">
        <header className="homepage-header">
          <div className="cat-avatar">
            {/* <Lottie
              animationData={catHomeAnimation}
              loop={true}
              style={{ width: 200, height: 150 }}
            /> */}
          </div>
          <h1 className="homepage-title">
            🐱 물어봐이브(ver.냥냥이)
          </h1>
          <p className="homepage-subtitle">
            똑똑한 냥냥이에게 무엇이든 물어보세요! 고민, 궁금증, 아이디어까지 🐾
          </p>
        </header>

        <main className="homepage-main">
          <div className="question-section">
            <QuestionInput
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
            
            {result && (
              <div className="new-question-section">
                <Button
                  onClick={handleNewQuestion}
                  variant="secondary"
                  size="large"
                >
                  🐱 새로운 질문하기
                </Button>
              </div>
            )}
          </div>

          <div className="result-section">
            <AIAnswer
              prompt={prompt}
              result={result}
              isLoading={isLoading}
              error={error}
              onRetry={handleRetry}
              onCopy={handleCopy}
              onNewAnswer={handleNewAnswer}
            />
          </div>
        </main>
      </div>
      
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        duration={toast.duration}
        onClose={hideToast}
      />
    </div>
  );
};

export default HomePage; 