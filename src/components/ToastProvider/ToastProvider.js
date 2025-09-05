import React, { createContext, useEffect, useState } from 'react';

export const ToastContext = createContext();

function ToastProvider({ children }) {
   const [toasts, setToasts] = useState([
      {
      id: crypto.randomUUID(),
      message: 'it works' , 
      variant: 'success',
    }, 
    {
      id: crypto.randomUUID(),
      message: 'Logged in',
      variant: 'success',
    },]);

    useEffect(() => {
      function handleKeyDown(event){
        if (event.code === 'Escape'){
          setToasts([])
        }
      }
        window.addEventListener('keydown', handleKeyDown);

        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, []);





    function createToast(message, variant){
      const nextToasts = [
        ...toasts,
        {
          id: crypto.randomUUID(),
          message,
          variant
        },
      ];

      setToasts(nextToasts);
    }

    function dismissToast(id){
       const nextToasts = toasts.filter(toast => {
      return toast.id !== id
    })
    setToasts(nextToasts)
    }

  return <ToastContext.Provider value={{ toasts, createToast, dismissToast }}>
    {children}
  </ToastContext.Provider>;
}

export default ToastProvider;
