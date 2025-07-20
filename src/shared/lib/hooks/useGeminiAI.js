import { useState, useCallback } from 'react';
import { GeminiClient } from '@/shared/api';

export const useGeminiAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState('');

  const generateAnswer = useCallback(async (prompt) => {
    if (!prompt.trim()) {
      setError('냥냥~ 질문을 입력해주세요! 🐱');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult('');

    try {
      const geminiClient = new GeminiClient();
      const response = await geminiClient.generateAnswer(prompt);
      console.log('--------------------------------start--------------------------------');
      console.log(response);
      console.log('--------------------------------end--------------------------------');

      if (response.success) {
        setResult(response.text);
      } else {
        setError(response.error);
      }
    } catch (err) {
      console.error('AI 답변 생성 오류:', err);
      setError('냥... AI 답변 생성 중 오류가 발생했어요. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const retry = useCallback(() => {
    setError(null);
  }, []);

  const reset = useCallback(() => {
    setResult('');
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    result,
    generateAnswer,
    retry,
    reset,
  };
}; 