import { Article } from "../../types";

export type ArticlePreviewProps = {
  article: Article;
};

function ArticlePreview({ article }: ArticlePreviewProps) {
  return (
    <div className="article-preview">
      <div className="article-meta">
        <a href="/profile/eric-simons">
          <img src="http://i.imgur.com/Qr71crq.jpg" />
        </a>
        <div className="info">
          <a href="/profile/eric-simons" className="author">
            {article.user.name}
          </a>
          <span className="date">{article.createdAt}</span>
        </div>
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart" /> {article.totalLike}
        </button>
      </div>
      <a
        href="/article/how-to-build-webapps-that-scale"
        className="preview-link"
      >
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {article.tagList.map((tag) => (
            <li className="tag-default tag-pill tag-outline">{tag.name}</li>
          ))}
        </ul>
      </a>
    </div>
  );
}

export default ArticlePreview;
