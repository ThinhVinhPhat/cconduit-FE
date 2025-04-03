import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "dark" | "light";
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  color = "primary",
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const colorClasses = {
    primary: "text-green-500",
    secondary: "text-gray-500",
    dark: "text-gray-800",
    light: "text-white",
  };

  return (
    <div
      style={{
        width: sizeClasses[size],
        height: sizeClasses[size],
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          borderTopColor: "transparent",
          borderWidth: "2px",
          borderRadius: "50%",
          width: sizeClasses[size],
          height: sizeClasses[size],
          animation: "spin 1s linear infinite",
        }}
      />
    </div>
  );
};

export default LoadingSpinner;
