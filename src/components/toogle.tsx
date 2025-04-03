import { useArticleContext } from "../hooks/useArticleContext";
import { useTagAction } from "../hooks/useTagAction";
import { Tag } from "../types/tags";

type ToggleProps = {
  currentPage: string;
  currentTag: Tag[];
};

function Toggle({ currentPage, currentTag }: ToggleProps) {
  const { toggle, setToggle } = useArticleContext();
  const { deleteTags } = useTagAction();
  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <a
            className={`nav-link ${toggle == "personal" && "active"}`}
            onClick={() => setToggle("personal")}
          >
            Your Feed
          </a>
        </li>
        {currentPage === "home" ? (
          <li className="nav-item">
            <a
              className={`nav-link ${toggle === "global" && "active"}`}
              onClick={() => setToggle("global")}
            >
              Global Feed
            </a>
          </li>
        ) : (
          <li className="nav-item">
            <a
              className={`nav-link ${toggle === "favorite" && "active"}`}
              onClick={() => setToggle("favorite")}
            >
              Favorite Articles
            </a>
          </li>
        )}

        {currentTag?.length > 0 &&
          currentTag.map((tag) => (
            <li className="nav-item" key={tag.id}>
              <div style={{ display: "flex" }}>
                <a
                  className={`nav-link ${toggle === "tags" && "active"}`}
                  onClick={() => setToggle(tag.title)}
                >
                  #{tag.title}
                </a>
                <button
                  className="nav-link"
                  onClick={() => deleteTags(tag)}
                  style={{ marginLeft: "-26px" }}
                >
                  X
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Toggle;
