import { useGetMe } from "../../hooks/query/user/useGetMe";
import { Comment } from "../../types/comment";

type ArticleCommentProps = {
  comment: Comment | null;
  onDeleteComment: (id: string) => void;
};

function ArticleComment({ comment, onDeleteComment }: ArticleCommentProps) {
  const { data: me } = useGetMe();
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment?.body}</p>
      </div>
      <div className="card-footer">
        <a
          href={`/profile/${comment?.author.username}`}
          className="comment-author"
        >
          <img src={comment?.author.image} className="comment-author-img" />
        </a>
        &nbsp;
        <a
          href={`/profile/${comment?.author.username}`}
          className="comment-author"
        >
          {comment?.author.username}
        </a>
        <span className="date-posted">{comment?.createdAt}</span>
        {me?.name === comment?.author.username && (
          <span className="mod-options">
            <i
              className="ion-trash-a"
              onClick={() => onDeleteComment(comment?.id)}
            ></i>
          </span>
        )}
      </div>
    </div>
  );
}

export default ArticleComment;
