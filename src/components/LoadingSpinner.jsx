import React from "react";

const LoadingSpinner = ({
  size = "md",
  color = "primary",
  fullScreen = false,
  text = "Loading...",
  showText = true,
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const colorClasses = {
    primary: "border-interactive-primary",
    secondary: "border-interactive-secondary",
    success: "border-interactive-success",
    warning: "border-interactive-warning",
    error: "border-interactive-error",
  };

  const spinnerElement = (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Animated spinner */}
      <div className="relative">
        <div
          className={`
            ${sizeClasses[size]} 
            border-4 border-border-primary 
            border-t-4 ${colorClasses[color]} 
            rounded-full animate-spin
          `}
        />
        <div
          className={`
            absolute inset-0 
            ${sizeClasses[size]} 
            border-4 border-transparent 
            border-r-4 ${colorClasses[color]} 
            rounded-full animate-spin 
            opacity-50
          `}
          style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
        />
      </div>

      {/* Loading text */}
      {showText && (
        <div className="text-center">
          <p className="text-text-secondary font-medium">{text}</p>
          <div className="flex space-x-1 justify-center mt-2">
            <div className="w-2 h-2 bg-interactive-primary rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-interactive-primary rounded-full animate-pulse delay-75" />
            <div className="w-2 h-2 bg-interactive-primary rounded-full animate-pulse delay-150" />
          </div>
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-background-primary bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-background-secondary rounded-2xl p-8 shadow-2xl border border-border-primary">
          {spinnerElement}
        </div>
      </div>
    );
  }

  return spinnerElement;
};

// Skeleton loader component
export const SkeletonLoader = ({ className = "", count = 1 }) => {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse bg-background-surface rounded-lg h-4 mb-2"
        />
      ))}
    </div>
  );
};

// Card skeleton loader
export const CardSkeleton = ({ className = "" }) => {
  return (
    <div
      className={`bg-background-secondary rounded-xl p-4 border border-border-primary ${className}`}
    >
      <div className="animate-pulse">
        <div className="h-4 bg-background-surface rounded mb-2" />
        <div className="h-4 bg-background-surface rounded w-3/4 mb-2" />
        <div className="h-8 bg-background-surface rounded w-1/2" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
