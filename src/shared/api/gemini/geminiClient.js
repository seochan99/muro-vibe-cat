import { GoogleGenAI } from '@google/genai';
import { DEFAULT_CONFIG, PROMPT_TEMPLATE } from '../types';

class GeminiClient {
  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    this.apiUrl = import.meta.env.VITE_GEMINI_API_URL;
    
    if (!this.apiKey) {
      throw new Error('VITE_GEMINI_API_KEY 환경 변수가 설정되지 않았습니다.');
    }

    this.ai = new GoogleGenAI({
      apiKey: this.apiKey,
    });
  }

  async generateAnswer(prompt) {
    try {
      const fullPrompt = `${PROMPT_TEMPLATE}\n\n사용자 질문: ${prompt}`;
      
      const response = await this.ai.models.generateContent({
        model: DEFAULT_CONFIG.model,
        contents: fullPrompt,
        config: DEFAULT_CONFIG,
      });

      return {
        success: true,
        text: response.text,
        model: DEFAULT_CONFIG.model,
      };
    } catch (error) {
      console.error('Gemini API 오류:', error);
      
      return {
        success: false,
        error: this.handleError(error),
      };
    }
  }

  handleError(error) {
    if (error.message?.includes('API_KEY')) {
      return 'API 키가 유효하지 않습니다. 환경 변수를 확인해주세요.';
    }
    
    if (error.message?.includes('quota')) {
      return 'API 사용량 한도를 초과했습니다. 잠시 후 다시 시도해주세요.';
    }
    
    if (error.message?.includes('content')) {
      return '부적절한 내용이 포함되어 있습니다. 다른 질문을 해주세요.';
    }
    
    return 'AI 답변 생성 중 오류가 발생했습니다. 다시 시도해주세요.';
  }
}

export default GeminiClient; 