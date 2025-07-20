import { useState, useCallback } from 'react';

export const useToast = () => {
  const [toast, setToast] = useState({
    isVisible: false,
    message: '',
    type: 'success',
    duration: 3000,
  });

  const showToast = useCallback((message, type = 'success', duration = 3000) => {
    setToast({
      isVisible: true,
      message,
      type,
      duration,
    });
  }, []);

  const hideToast = useCallback(() => {
    setToast(prev => ({
      ...prev,
      isVisible: false,
    }));
  }, []);

  const showSuccess = useCallback((message) => {
    showToast(message, 'success');
  }, [showToast]);

  const showError = useCallback((message) => {
    showToast(message, 'error');
  }, [showToast]);

  const showInfo = useCallback((message) => {
    showToast(message, 'info');
  }, [showToast]);

  const showWarning = useCallback((message) => {
    showToast(message, 'warning');
  }, [showToast]);

  return {
    toast,
    showToast,
    hideToast,
    showSuccess,
    showError,
    showInfo,
    showWarning,
  };
}; 