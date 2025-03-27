import { useNavigate } from "react-router-dom";
import { usePost } from "../../hooks/usePost";
import ArticlePreview from "../article/article-preview";
import Pagination from "../pagination";
import Toggle from "../toogle";
import { useEffect } from "react";

function Profile() {
  const { favoritePost, me, toggle, posts, setToggle } = usePost();
  const navigate = useNavigate();
  useEffect(() => {
    if (me) {
      setToggle("personal");
    }
  }, [me, setToggle]);

  return (
    <div className="profile-page">
      <div className="user-info bg-primary text-white">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img
                src={me?.avatar}
                className="user-img rounded-circle"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
              <h4>{me?.name}</h4>
              <p style={{ color: "white" }}>{me?.description}</p>

              {me ? (
                <button
                  onClick={() => navigate("/settings")}
                  className="btn btn-sm action-btn"
                  style={{
                    backgroundColor: "white",
                    color: "#5CB85C",
                    borderRadius: "20px",
                  }}
                >
                  <i className="ion-gear-a" />
                  &nbsp; Edit Profile Settings
                </button>
              ) : (
                <button className="btn btn-sm btn-outline-secondary action-btn">
                  <i className="ion-plus-round" />
                  &nbsp; Follow {me?.name}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <Toggle currentPage="personal" currentTag={[]} />

            {toggle === "personal" ? (
              posts && posts.length > 0 ? (
                <>
                  {posts?.map((article) => (
                    <ArticlePreview key={article.id} article={article} />
                  ))}
                  {posts?.length > 10 && <Pagination />}
                </>
              ) : (
                <span>No articles are here... yet.</span>
              )
            ) : favoritePost && favoritePost.length > 0 ? (
              <>
                {favoritePost?.map((article) => (
                  <ArticlePreview key={article.id} article={article} />
                ))}
                <Pagination />
              </>
            ) : (
              <span>No articles are here... yet.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
