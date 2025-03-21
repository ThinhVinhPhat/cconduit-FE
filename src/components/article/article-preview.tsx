import { Link } from "react-router-dom";
import { usePost } from "../../hooks/usePost";
import { Article } from "../../types";

export type ArticlePreviewProps = {
  article: Article;
};

function ArticlePreview({ article }: ArticlePreviewProps) {
  const { handleAddFavorite, currentFavorite, setCurrentFavorite } = usePost();

  const handleFavorite = async (id: string) => {
    await handleAddFavorite(id);
    if (currentFavorite?.includes(id)) {
      setCurrentFavorite(currentFavorite.filter((id) => id !== id));
    } else {
      setCurrentFavorite([...currentFavorite, id]);
    }
  };
  return (
    <div className="article-preview">
      <div className="article-meta">
        <a href="/profile/eric-simons">
          <img src="http://i.imgur.com/Qr71crq.jpg" />
        </a>
        <div className="info">
          <a href="/profile/eric-simons" className="author">
            {article.author.username}
          </a>
          <span className="date">{article.createdAt}</span>
        </div>
        <button className="btn  btn-sm pull-xs-right">
          <i
            className={`ion-heart ${
              currentFavorite?.includes(article.id) ? "active" : ""
            }`}
            onClick={() => handleFavorite(article.id)}
          />{" "}
          {article.totalLike || 0}
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
