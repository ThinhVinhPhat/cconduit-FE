import { useParams } from "react-router";
import { usePost } from "../../hooks/query/article/usePost";
import { useGetComment } from "../../hooks/query/comment/useGetComment";
import ArticleComment from "../../components/article/article-comment";
import { Comment } from "../../types/comment";
import { useEffect, useState } from "react";

function PostDetail() {
  const [comment, setComment] = useState<Comment[]>([]);
  const { slug } = useParams();
  const { data: post, isLoading } = usePost(slug);
  const { data: comments, isLoading: isLoadingComments } = useGetComment(
    post?.id
  );
  useEffect(() => {
    if (comments) {
      setComment(comments);
    }
  }, [comments]);
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
                <a href="/profile/eric-simons">
                  <img src="http://i.imgur.com/Qr71crq.jpg" />
                </a>
                <div className="info">
                  <a href="/profile/eric-simons" className="author">
                    {post?.author?.username}
                  </a>
                  <span className="date">
                    {new Date(post?.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <button className="btn btn-sm btn-outline-secondary">
                  <i className="ion-plus-round"></i>
                  &nbsp; Follow {post?.author?.username}
                  <span className="counter">(10)</span>
                </button>
                &nbsp;&nbsp;
                <button className="btn btn-sm btn-outline-primary">
                  <i className="ion-heart"></i>
                  &nbsp; Favorite Post{" "}
                  <span className="counter">({post?.totalLike})</span>
                </button>
                <button className="btn btn-sm btn-outline-secondary">
                  <i className="ion-edit"></i> Edit Article
                </button>
                <button className="btn btn-sm btn-outline-danger">
                  <i className="ion-trash-a"></i> Delete Article
                </button>
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
                <button className="btn btn-sm btn-outline-secondary">
                  <i className="ion-plus-round"></i>
                  &nbsp; Follow {post?.author?.username}
                </button>
                &nbsp;
                <button className="btn btn-sm btn-outline-primary">
                  <i className="ion-heart"></i>
                  &nbsp; Favorite Article{" "}
                  <span className="counter">({post?.totalLike})</span>
                </button>
                <button className="btn btn-sm btn-outline-secondary">
                  <i className="ion-edit"></i> Edit Article
                </button>
                <button className="btn btn-sm btn-outline-danger">
                  <i className="ion-trash-a"></i> Delete Article
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col-xs-12 col-md-8 offset-md-2">
                <form className="card comment-form">
                  <div className="card-block">
                    <textarea
                      className="form-control"
                      placeholder="Write a comment..."
                      rows={3}
                    ></textarea>
                  </div>
                  <div className="card-footer">
                    <img
                      src="http://i.imgur.com/Qr71crq.jpg"
                      className="comment-author-img"
                    />
                    <button className="btn btn-sm btn-primary">
                      Post Comment
                    </button>
                  </div>
                </form>

                {isLoadingComments && !post?.id ? (
                  <div>Loading...</div>
                ) : comment !== undefined ? (
                  comment.map((comment: Comment) => (
                    <ArticleComment key={comment.id} comment={comment} />
                  ))
                ) : (
                  <div>No comments</div>
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
