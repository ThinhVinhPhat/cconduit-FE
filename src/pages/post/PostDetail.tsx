import { Link, useParams } from "react-router";
import { usePostDetail } from "../../hooks/query/article/usePostDetail";
import { useGetComment } from "../../hooks/query/comment/useGetComment";
import ArticleComment from "../../components/article/article-comment";
import { Comment } from "../../types/comment";
import { useEffect, useState } from "react";
import { usePost } from "../../hooks/usePost";
import Button from "../../components/Button";
import { useCreateComment } from "../../hooks/mutation/comments/useCreateComment";
import { useDeleteComment } from "../../hooks/mutation/comments/useDeleteComment";

function PostDetail() {
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const { mutate: createComment } = useCreateComment();
  const { mutate: deleteComment } = useDeleteComment();
  const [commentText, setCommentText] = useState("");
  const { slug } = useParams();
  const { me } = usePost();
  const { data: post, isLoading } = usePostDetail(slug, me?.id ?? "0");
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

  const handleSubmitComment = () => {
    createComment({ id: post?.id, comment: commentText });
  };

  const handleDeleteComment = (id: string) => {
    deleteComment(id);
    setPostComments(postComments.filter((comment) => comment.id !== id));
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="article-page">
          <div className="banner">
            <div className="container">
              <h1>{post?.title}</h1>
              <div className="article-meta">
                <a href="profile.html">
                  <img src="http://i.imgur.com/Qr71crq.jpg" />
                </a>
                <div className="info">
                  <a href="" className="author">
                    {post?.author?.username}
                  </a>
                  <span className="date">
                    {new Date(post?.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <Button post={post} me={me} />
              </div>
            </div>
          </div>

          <div className="container page">
            <div className="row article-content">
              <div className="col-md-12">
                <p>{post?.description}</p>
                <ul className="tag-list">
                  {post?.tagList?.map((tag: string) => (
                    <li className="tag-default tag-pill tag-outline">{tag}</li>
                  ))}
                </ul>
              </div>
            </div>

            <hr />

            <div className="article-actions">
              <div className="article-meta">
                <a href="profile.html">
                  <img src="http://i.imgur.com/Qr71crq.jpg" />
                </a>
                <div className="info">
                  <a href="" className="author">
                    {post?.author?.username}
                  </a>
                  <span className="date">
                    {new Date(post?.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <Button post={post} me={me} />
              </div>
            </div>

            <div className="row">
              <div className="col-xs-12 col-md-8 offset-md-2">
                {me ? (
                  <>
                    <form className="card comment-form">
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
                          src="http://i.imgur.com/Qr71crq.jpg"
                          className="comment-author-img"
                        />
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={handleSubmitComment}
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
                {isLoadingComments || !post?.id ? (
                  <div>Loading...</div>
                ) : (
                  postComments.map((comment: Comment) => (
                    <ArticleComment
                      key={comment.id}
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
