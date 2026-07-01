'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { type PropsWithChildren, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { apiErrorEvents, apiMessageEvents, createQueryClient } from '@/api';
import { Toaster } from '@/components/ui';
import { extractErrorMessage } from '@/lib';

export function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => createQueryClient());

  useEffect(() => {
    return apiErrorEvents.onError((error: unknown) => {
      toast.error(extractErrorMessage(error, 'Something went wrong.'));
    });
  }, []);

  useEffect(() => {
    return apiMessageEvents.onMessage((message) => {
      toast(message);
    });
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      <Toaster richColors position="top-right" />
    </>
  );
}
