import { Link, useParams } from "react-router";
import { useGetComment } from "../../hooks/query/comment/useGetComment";
import ArticleComment from "../../components/article/article-comment";
import { Comment } from "../../types/comment";
import { useEffect, useState } from "react";
import { useCreateComment } from "../../hooks/mutation/comments/useCreateComment";
import { useDeleteComment } from "../../hooks/mutation/comments/useDeleteComment";
import { UserBarHolder } from "../../components/UserBarHolder";
import { useArticleDetail } from "../../hooks/query/article/usePostDetail";
import { useGetMe } from "../../hooks/query/user/useGetMe";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

function PostDetail() {
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const {
    data: comment,
    mutate: createComment,
    isPending: isLoadingCreateComment,
  } = useCreateComment();
  const { mutate: deleteComment } = useDeleteComment();
  const [commentText, setCommentText] = useState("");
  const { slug } = useParams();
  const { data: me } = useGetMe();
  const { data: post, isLoading } = useArticleDetail(slug, me?.id);
  const { data: comments, isLoading: isLoadingComments } = useGetComment(
    post?.id
  );

  useEffect(() => {
    if (comments) {
      if (JSON.stringify(comments) !== JSON.stringify(postComments)) {
        setPostComments(comments);
      }
    }
  }, [comments]);

  const handleSubmitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createComment({ id: post?.id, comment: commentText });
    setCommentText("");
    setPostComments((prev) => [...prev, comment]);
  };

  const handleDeleteComment = (id: string) => {
    if (id) {
      deleteComment(id);
      setPostComments(postComments.filter((comment) => comment.id !== id));
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="article-page">
          <div className="banner">
            <div className="container">
              <h1>{post?.title}</h1>
              <UserBarHolder post={post} me={me} />
            </div>
          </div>

          <div className="container page">
            <div className="row article-content">
              <div className="col-md-12">
                <p dangerouslySetInnerHTML={{ __html: post?.body }} />
                <ul className="tag-list">
                  {post?.tagList?.map((tag: string) => (
                    <li className="tag-default tag-pill tag-outline">{tag}</li>
                  ))}
                </ul>
              </div>
            </div>

            <hr />

            <div className="row">
              <div className="col-xs-12 col-md-8 offset-md-2">
                {me ? (
                  <>
                    <form
                      onSubmit={(e) => handleSubmitComment(e)}
                      className="card comment-form"
                    >
                      <div className="card-block">
                        <textarea
                          className="form-control"
                          placeholder="Write a comment..."
                          rows={3}
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="card-footer">
                        <img
                          src={post?.author?.image}
                          className="comment-author-img"
                        />
                        <button
                          className="btn btn-sm btn-primary"
                          type="submit"
                        >
                          Post Comment
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <p>
                      <Link
                        to="/login"
                        className="btn btn-sm btn-outline-secondary"
                      >
                        Sign in
                      </Link>{" "}
                      or{" "}
                      <Link
                        to="/register"
                        className="btn btn-sm btn-outline-secondary"
                      >
                        sign up
                      </Link>{" "}
                      to add comments on this article.
                    </p>
                  </div>
                )}
                {isLoadingComments || isLoadingCreateComment || !post?.id ? (
                  <LoadingSpinner />
                ) : (
                  postComments.map((comment: Comment) => (
                    <ArticleComment
                      key={comment?.id}
                      comment={comment}
                      onDeleteComment={handleDeleteComment}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PostDetail;
