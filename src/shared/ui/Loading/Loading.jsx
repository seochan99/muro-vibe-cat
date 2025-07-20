import React from 'react';
import Lottie from 'lottie-react';
import catLoadingAnimation from '@/assets/cat_loading.json';
import './Loading.css';

const Loading = ({ size = 'medium', text = 'AI가 답변을 생성하고 있어요...' }) => {
  const getAnimationSize = () => {
    switch (size) {
      case 'small':
        return 80;
      case 'large':
        return 200;
      default:
        return 120;
    }
  };

  return (
    <div className={`loading-container loading--${size}`}>
      <div className="loading-spinner">
        <Lottie
          animationData={catLoadingAnimation}
          loop={true}
          style={{ width: getAnimationSize(), height: getAnimationSize() }}
        />
      </div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
};

export default Loading; 