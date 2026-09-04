'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error';
}

let toastListeners: Array<(toast: Toast | null) => void> = [];
let currentToast: Toast | null = null;

export function showToast(message: string, type: 'success' | 'error' = 'success') {
  currentToast = { id: Date.now().toString(), message, type };
  toastListeners.forEach((fn) => fn(currentToast));
}

export function useToast() {
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    toastListeners.push(setToast);
    if (currentToast) setToast(currentToast);
    return () => {
      toastListeners = toastListeners.filter((fn) => fn !== setToast);
    };
  }, []);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => {
        setToast(null);
        currentToast = null;
      }, 4000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  return toast;
}

export function ToastContainer() {
  const toast = useToast();

  if (!toast) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg px-4 py-3 text-sm shadow-lg ${
        toast.type === 'success'
          ? 'bg-green-600 text-white'
          : 'bg-red-600 text-white'
      }`}
    >
      <span>{toast.message}</span>
      <button
        onClick={() => {
          setToastState(null);
        }}
        className="ml-1 rounded p-0.5 hover:bg-white/20"
        aria-label="Dismiss"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function setToastState(toast: Toast | null) {
  currentToast = toast;
  toastListeners.forEach((fn) => fn(toast));
}
