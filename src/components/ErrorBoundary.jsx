import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console or error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);

    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // You can also log the error to an error reporting service here
    // Example: logErrorToService(error, errorInfo);
  }

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Custom error UI
      return (
        <div className="min-h-screen bg-background-primary flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-background-secondary rounded-2xl p-8 text-center border border-border-primary">
            <div className="mb-6">
              <svg
                className="w-16 h-16 mx-auto text-interactive-error mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <h1 className="text-2xl font-bold text-text-primary mb-2">
                Oops! Something went wrong
              </h1>
              <p className="text-text-secondary">
                We're sorry for the inconvenience. The application encountered
                an unexpected error.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={this.handleRefresh}
                className="w-full bg-interactive-primary hover:bg-interactive-primaryHover text-text-primary font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
              >
                Refresh Page
              </button>

              <button
                onClick={() => (window.location.href = "/")}
                className="w-full bg-background-surface hover:bg-background-elevated text-text-secondary font-semibold py-3 px-6 rounded-xl transition-all duration-200 border border-border-primary"
              >
                Go to Home
              </button>
            </div>

            {/* Error details for development */}
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-text-tertiary hover:text-text-secondary text-sm font-semibold mb-2">
                  Error Details (Development)
                </summary>
                <div className="bg-background-primary p-4 rounded-lg text-xs font-mono text-interactive-error overflow-auto max-h-32">
                  <div className="mb-2">
                    <strong>Error:</strong> {this.state.error.toString()}
                  </div>
                  <div>
                    <strong>Stack Trace:</strong>
                    <pre className="whitespace-pre-wrap mt-1">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </div>
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
