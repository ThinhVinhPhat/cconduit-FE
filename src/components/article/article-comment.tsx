import { Comment } from "../../types/comment";

function ArticleComment({ comment }: { comment: Comment }) {
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <a
          href={`/profile/${comment.author.username}`}
          className="comment-author"
        >
          <img src={comment.author.image} className="comment-author-img" />
        </a>
        &nbsp;
        <a
          href={`/profile/${comment.author.username}`}
          className="comment-author"
        >
          {comment.author.username}
        </a>
        <span className="date-posted">{comment.createdAt}</span>
      </div>
    </div>
  );
}

export default ArticleComment;
