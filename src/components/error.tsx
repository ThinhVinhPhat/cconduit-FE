import { useAuthContext } from "../hooks/useAuthContext";

function ErrorMessage() {
  const { error } = useAuthContext();
  return <ul className="error-messages">{error && <li>{error}</li>}</ul>;
}

export default ErrorMessage;
