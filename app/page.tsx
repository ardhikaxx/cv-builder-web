'use client';

import { ToastProvider } from '@/components/common/Toast';
import { CVBuilder } from '@/components/CVBuilder';

export default function Home() {
  return (
    <ToastProvider>
      <CVBuilder />
    </ToastProvider>
  );
}
