import { Link } from "react-router-dom";
import { usePost } from "../../hooks/usePost";
import { Article } from "../../types";
import { useRef } from "react";

export type ArticlePreviewProps = {
  article: Article;
};

function ArticlePreview({ article }: ArticlePreviewProps) {
  const { handleAddFavorite, currentFavorite, setCurrentFavorite } = usePost();
  const currentFavoriteRef = useRef(article.favoritesCount);

  const handleFavorite = async (id: string) => {
    await handleAddFavorite(id);
    if (currentFavorite?.find((item) => item === id)) {
      setCurrentFavorite(currentFavorite.filter((item) => item !== id));
      currentFavoriteRef.current = currentFavoriteRef.current - 1;
    } else {
      setCurrentFavorite([...currentFavorite, id]);
      currentFavoriteRef.current = currentFavoriteRef.current + 1;
    }
  };
  return (
    <div className="article-preview">
      <div className="article-meta">
        <a href={`/profile/${article.author.username}`}>
          <img src={article.author.image} />
        </a>
        <div className="info">
          <a href={`/profile/${article.author.username}`} className="author">
            {article.author.username}
          </a>
          <span className="date">{article.createdAt}</span>
        </div>
        <button
          onClick={() => handleFavorite(article.id)}
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
