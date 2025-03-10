import { usePost } from "../hooks/usePost";

type ToggleProps = {
  currentPage: string;
};

function Toggle({ currentPage }: ToggleProps) {
  const { toggle, handleToggle } = usePost();
  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <a
            className={`nav-link ${toggle == "personal" && "active"}`}
            onClick={() => handleToggle("personal")}
          >
            Your Feed
          </a>
        </li>
        {currentPage === "home" ? (
          <li className="nav-item">
            <a
              className={`nav-link ${toggle == "global" && "active"}`}
              onClick={() => handleToggle("global")}
            >
              Global Feed
            </a>
          </li>
        ) : (
          <li className="nav-item">
            <a
              className={`nav-link ${toggle == "favorite" && "active"}`}
              onClick={() => handleToggle("favorite")}
            >
              Favorite Articles
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Toggle;
