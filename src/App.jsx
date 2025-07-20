import React from 'react';
import HomePage from '@/pages/HomePage';
import NotFound from '@/pages/NotFound';
import './App.css';

function App() {
  // 현재 경로 확인
  const path = window.location.pathname;
  
  // 홈페이지가 아닌 경우 404 페이지 표시
  if (path !== '/') {
    return <NotFound />;
  }

  return <HomePage />;
}

export default App
