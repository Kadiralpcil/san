
import React, { useState, useEffect } from 'react';

type ToastType = 'success' | 'error';

export interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastProps {
  toast: Toast;
  onRemove: (id: number) => void;
}

const ToastItem: React.FC<ToastProps> = ({ toast, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(toast.id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  const getToastStyles = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200';
      default:
        return '';
    }
  };


  return (
    <div className={`absolute right-10 top-15  flex items-center gap-3 p-4 border rounded-lg shadow-sm transition-all duration-300 ${getToastStyles()}`}>
      <span className="flex-1 text-sm font-medium">{toast.message}</span>
      <button 
        onClick={() => onRemove(toast.id)}
        className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
      >
        x
      </button>
    </div>
  );
};

export default ToastItem