import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

function ErrorMessage({ errors }: { errors: any }) {
  const { error, setError } = useAuthContext();

  useEffect(() => {
    if (errors) {
      setError(errors);
    }
  }, [errors]);

  return <ul className="error-messages">{error && <li>{error}</li>}</ul>;
}

export default ErrorMessage;
