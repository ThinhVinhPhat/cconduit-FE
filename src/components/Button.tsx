import { useDeleteFollowing } from "../hooks/mutation/following/useDeleteFollowing";
import { useCreateFollowing } from "../hooks/mutation/following/useCreateFollowing";
import { useArticleContext } from "../hooks/useArticleContext";
import { Article, User } from "../types";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useArticleAction } from "../hooks/useArticleAction";
type Props = {
  post: Article;
  me: User | null;
};

function Button({ post, me }: Props) {
  const [isFollow, setIsFollow] = useState(false);
  const navigate = useNavigate();
  const { currentFavorite, setCurrentFavorite } = useArticleContext();
  const { deleteArticle, handleFavorite } = useArticleAction();
  const { mutate: handleFollow } = useCreateFollowing();
  const { mutate: handleUnfollow } = useDeleteFollowing();
  const currentFavoriteRef = useRef(post.favoritesCount);
  useEffect(() => {
    if (post?.author?.following === true) {
      setIsFollow(true);
    }
  }, [post?.author?.following]);

  const handleEdit = (post: Article) => {
    navigate(`/post/update/${post.slug}`);
  };

  const handleDelete = (id: string) => {
    const confirnmDelete = confirm(
      "Are you sure you want to delete this article?"
    );

    if (confirnmDelete) {
      const result = deleteArticle(id);
      if (result) {
        navigate("/");
      }
    }
  };

  const handleFollowUnfollow = (id: string) => {
    if (post?.author?.following === true) {
      handleUnfollow(id);
      setIsFollow(false);
    } else {
      handleFollow(id);
      setIsFollow(true);
    }
  };

  return (
    <>
      {me?.name !== post?.author?.username && (
        <>
          <button
            onClick={() => handleFollowUnfollow(post?.author?.id)}
            className={`btn btn-sm btn-outline-secondary ${
              isFollow ? "active" : ""
            }`}
            style={{ marginRight: "10px" }}
          >
            <i className="ion-plus-round"></i>
            {isFollow ? "UnFollow" : "Follow"} {post?.author?.username}
          </button>
          &nbsp;
          <button
            className={`btn btn-sm btn-outline-primary ${
              currentFavorite?.find((item) => item === post.id) ? "active" : ""
            }`}
            onClick={() =>
              handleFavorite(post.id, currentFavorite, currentFavoriteRef)
            }
            style={{ cursor: "pointer", marginRight: "10px" }}
          >
            <i className="ion-heart"></i>
            &nbsp; Favorite Article{" "}
            <span className="counter">({currentFavoriteRef.current})</span>
          </button>
        </>
      )}
      {me?.name === post?.author?.username && (
        <>
          <button
            className="btn btn-sm btn-outline-secondary"
            style={{ marginRight: "10px" }}
            onClick={() => handleEdit(post)}
          >
            <i className="ion-edit"></i> Edit Article
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => handleDelete(post.id)}
          >
            <i className="ion-trash-a"></i> Delete Article
          </button>
        </>
      )}
    </>
  );
}

export default Button;
