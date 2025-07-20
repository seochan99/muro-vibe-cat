import { useState, useEffect } from 'react';

export const useInputHistory = (maxHistory = 10) => {
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  // 페이지 로드 시 저장된 히스토리 불러오기
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('muro-vibe-history');
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);
        setHistory(parsedHistory);
      }
    } catch (error) {
      console.error('히스토리 불러오기 실패:', error);
    }
  }, []);

  // 히스토리 저장
  const saveToHistory = (text) => {
    if (!text.trim()) return;

    setHistory(prev => {
      const newHistory = [text, ...prev.filter(item => item !== text)].slice(0, maxHistory);
      
      // localStorage에 저장
      try {
        localStorage.setItem('muro-vibe-history', JSON.stringify(newHistory));
      } catch (error) {
        console.error('히스토리 저장 실패:', error);
      }
      
      return newHistory;
    });
    setCurrentIndex(-1);
  };

  // 히스토리에서 이전 항목 가져오기
  const getPrevious = () => {
    if (history.length === 0) return null;
    
    const newIndex = Math.min(currentIndex + 1, history.length - 1);
    setCurrentIndex(newIndex);
    return history[newIndex];
  };

  // 히스토리에서 다음 항목 가져오기
  const getNext = () => {
    if (currentIndex <= 0) {
      setCurrentIndex(-1);
      return '';
    }
    
    const newIndex = currentIndex - 1;
    setCurrentIndex(newIndex);
    return history[newIndex];
  };

  // 히스토리 초기화
  const clearHistory = () => {
    setHistory([]);
    setCurrentIndex(-1);
    try {
      localStorage.removeItem('muro-vibe-history');
    } catch (error) {
      console.error('히스토리 삭제 실패:', error);
    }
  };

  return {
    history,
    currentIndex,
    saveToHistory,
    getPrevious,
    getNext,
    clearHistory,
  };
}; 