import React from 'react';
import { Button } from '@/shared/ui';
import { Background } from '@/shared/ui';
import { SEO } from '@/shared/ui';
import './NotFound.css';

const NotFound = () => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="notfound-page">
      <SEO 
        title="404 - 페이지를 찾을 수 없어요 😿 | 물어봐이브"
        description="냥... 찾으시는 페이지가 없어요. 고양이한테 물어보러 가실까요?"
        keywords="404, 페이지 없음, 물어봐이브, 고양이 AI"
      />
      <Background />
      
      <div className="notfound-container">
        <div className="notfound-content">
          <div className="notfound-cat">
            <div className="cat-face">
              <div className="cat-ears">
                <div className="cat-ear left"></div>
                <div className="cat-ear right"></div>
              </div>
              <div className="cat-eyes">
                <div className="cat-eye left">
                  <div className="cat-pupil"></div>
                </div>
                <div className="cat-eye right">
                  <div className="cat-pupil"></div>
                </div>
              </div>
              <div className="cat-nose"></div>
              <div className="cat-mouth"></div>
              <div className="cat-whiskers">
                <div className="whisker left-1"></div>
                <div className="whisker left-2"></div>
                <div className="whisker left-3"></div>
                <div className="whisker right-1"></div>
                <div className="whisker right-2"></div>
                <div className="whisker right-3"></div>
              </div>
            </div>
          </div>
          
          <div className="notfound-text">
            <h1 className="notfound-title">
              <span className="error-code">404</span>
              <span className="error-message">냥... 페이지를 찾을 수 없어요 😿</span>
            </h1>
            
            <p className="notfound-description">
              고양이가 페이지를 찾아보려고 했지만, 그냥 잠들어버렸어요... 😴
              <br />
              혹시 잘못된 주소를 입력하신 건 아닌가요?
            </p>
            
            <div className="notfound-suggestions">
              <h3>🐱 고양이가 추천해요:</h3>
              <ul>
                <li>홈페이지로 돌아가서 고양이한테 물어보기</li>
                <li>이전 페이지로 돌아가기</li>
                <li>URL을 다시 한 번 확인해보기</li>
              </ul>
            </div>
          </div>
          
          <div className="notfound-actions">
            <Button
              onClick={handleGoHome}
              variant="primary"
              size="large"
              className="home-btn"
            >
              🏠 홈으로 돌아가기
            </Button>
            
            <Button
              onClick={handleGoBack}
              variant="secondary"
              size="large"
              className="back-btn"
            >
              ⬅️ 이전 페이지로
            </Button>
          </div>
          
          <div className="notfound-footer">
            <p>🐾 고양이한테 궁금한 것이 있으시면 언제든 물어보세요!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 