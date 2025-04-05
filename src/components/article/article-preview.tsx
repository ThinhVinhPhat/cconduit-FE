import { Link } from "react-router-dom";
import { useArticleContext } from "../../hooks/useArticleContext";
import { Article } from "../../types";
import { useRef } from "react";
import { useArticleAction } from "../../hooks/useArticleAction";
import defaultAvatar from "../../assets/gray-user-profile-icon-png-fP8Q1P.png";
export type ArticlePreviewProps = {
  article: Article;
};

function ArticlePreview({ article }: ArticlePreviewProps) {
  const { currentFavorite } = useArticleContext();
  const { handleFavorite } = useArticleAction();
  const currentFavoriteRef = useRef(article.favoritesCount);

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/profile/${article.author.username}`}>
          <img src={article.author.image || defaultAvatar} />
        </Link>
        <div className="info">
          <Link to={`/profile/${article.author.username}`} className="author">
            {article.author.username}
          </Link>
          <span className="date">{article.createdAt}</span>
        </div>
        <button
          onClick={() =>
            handleFavorite(article.id, currentFavorite, currentFavoriteRef)
          }
          className={`btn btn-sm btn-outline-primary pull-xs-right ${
            currentFavorite?.find((item) => item === article.id)
              ? "bg-primary"
              : ""
          }`}
        >
          <i
            className={`ion-heart ${
              currentFavorite?.find((item) => item === article.id)
                ? "active"
                : ""
            }`}
          />{" "}
          {currentFavoriteRef.current}
        </button>
      </div>
      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {article.tagList.map((tag) => (
            <li className="tag-default tag-pill tag-outline">{tag}</li>
          ))}
        </ul>
      </Link>
    </div>
  );
}

export default ArticlePreview;
