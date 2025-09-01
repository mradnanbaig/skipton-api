import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { render as rtlRender, RenderOptions } from '@testing-library/react';

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
      },
    },
  });
}

interface AllTheProvidersProps {
  children: ReactNode;
}

export function AllTheProviders({ children }: AllTheProvidersProps) {
  const testQueryClient = createTestQueryClient();
  
  return (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => rtlRender(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };