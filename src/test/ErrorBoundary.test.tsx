import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary';
import { Component } from 'react';
import { ReactNode } from 'react';
class ErrorThrowingComponent extends Component {
    render(): ReactNode {
      throw new Error('Test error');
      return null;
    }
  }

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>No error here</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('No error here')).toBeInTheDocument();
  });

  it('renders the fallback UI when an error is thrown', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });

  it('renders the error stack trace when an error is thrown', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    const stackTrace = screen.getByText(/at ErrorThrowingComponent/);
    expect(stackTrace).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });
});