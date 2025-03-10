import { usePost } from "../hooks/usePost";

function ErrorMessage() {
  const { error } = usePost();
  return <ul className="error-messages">{error && <li>{error}</li>}</ul>;
}

export default ErrorMessage;
