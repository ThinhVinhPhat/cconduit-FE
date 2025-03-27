import { useDeleteFollowing } from "../hooks/mutation/following/useDeleteFollowing";
import { useCreateFollowing } from "../hooks/mutation/following/useCreateFollowing";
import { usePost } from "../hooks/usePost";
import { Article, User } from "../types";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
type Props = {
  post: Article;
  me: User | null;
};

function Button({ post, me }: Props) {
  const navigate = useNavigate();
  const {
    handleAddFavorite,
    currentFavorite,
    setCurrentFavorite,
    deleteArticle,
  } = usePost();
  const { mutate: handleFollow } = useCreateFollowing();
  const { mutate: handleUnfollow } = useDeleteFollowing();

  const handleEdit = (post: Article) => {
    navigate(`/post/update/${post.slug}`);
  };
  const handleDelete = (id: string) => {
    const result = deleteArticle(id);
    if (result) {
      navigate("/");
    }
  };

  const handleFollowUnfollow = (id: string) => {
    if (post?.author?.following) {
      handleUnfollow(id);
    } else {
      handleFollow(id);
    }
  };

  const currentFavoriteRef = useRef(post.favoritesCount);

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

  console.log(post);

  return (
    <>
      {me?.name !== post?.author?.username && (
        <>
          <button
            onClick={() => handleFollowUnfollow(post?.author?.id)}
            className={`btn btn-sm btn-outline-secondary ${
              post?.author?.following == true ? "active" : ""
            }`}
            style={{ marginRight: "10px" }}
          >
            <i className="ion-plus-round"></i>
            {post?.author?.following ? "Unfollow" : "Follow"}{" "}
            {post?.author?.username}
          </button>
          &nbsp;
          <button
            className={`btn btn-sm btn-outline-primary ${
              currentFavorite?.find((item) => item === post.id) ? "active" : ""
            }`}
            onClick={() => handleFavorite(post.id)}
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
