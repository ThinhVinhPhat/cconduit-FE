import React from "react";

interface EmptyStateProps {
  message?: string;
  icon?: React.ReactNode;
  className?: string;
  actionButton?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  message = "No articles are here... yet.",
  icon,
  className = "",
  actionButton,
}) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      className={`py-8 px-4 mx-auto text-center ${className}`}
    >
      {icon || (
        <div className="mb-4 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8m-2 12h-9l-2-3h11M9 11v6m3-6v6"
            />
          </svg>
        </div>
      )}
      <p className="text-lg font-medium text-gray-600">{message}</p>
      {actionButton && <div className="mt-4">{actionButton}</div>}
    </div>
  );
};

export default EmptyState;
