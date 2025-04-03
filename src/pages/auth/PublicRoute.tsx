import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function PublicRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userLogin } = useAuthContext();

  if (userLogin) return <Navigate to="/" />;
  else return <>{children}</>;
}
