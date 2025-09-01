'use client';

import { Component, ReactNode, ErrorInfo } from 'react';
import { Heading, Text } from './ui/Typography';
import Button from './ui/Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div 
          role="alert"
          aria-live="assertive"
          className="min-h-64 flex flex-col items-center justify-center p-8 text-center"
        >
          <Heading level={2} className="text-red-600 mb-4">
            Something went wrong
          </Heading>
          <Text className="mb-6 max-w-md">
            We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
          </Text>
          <div className="space-x-4">
            <Button onClick={this.handleRetry} variant="primary">
              Try Again
            </Button>
            <Button 
              onClick={() => window.location.reload()} 
              variant="secondary"
            >
              Refresh Page
            </Button>
          </div>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mt-8 text-left">
              <summary className="cursor-pointer text-sm text-neutral-600 hover:text-neutral-800">
                Error Details (Development Only)
              </summary>
              <pre className="mt-2 text-xs text-red-600 bg-red-50 p-4 rounded overflow-auto max-w-2xl">
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}