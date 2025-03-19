import { usePost } from "../../hooks/usePost";
import ArticlePreview from "../article/article-preview";
import Pagination from "../pagination";
import Toggle from "../toogle";
type ProfileProps = {
  isUser: boolean;
};

function Profile({ isUser }: ProfileProps) {
  const { favoritePost, me, toggle, posts } = usePost();
  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src="http://i.imgur.com/Qr71crq.jpg" className="user-img" />
              <h4>{me?.name}</h4>
              <p>
                Cofounder @GoThinkster, lived in Aol's HQ for a few months,
                kinda looks like Peeta from the Hunger Games
              </p>

              {isUser ? (
                <button className="btn btn-sm btn-outline-secondary action-btn">
                  <i className="ion-plus-round" />
                  &nbsp; Follow Eric Simons
                </button>
              ) : (
                <button className="btn btn-sm btn-outline-secondary action-btn">
                  <i className="ion-gear-a" />
                  &nbsp; Edit Profile Settings
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <Toggle currentPage="personal" />

            {toggle === "personal" ? (
              posts && posts.length > 0 ? (
                <>
                  {posts.map((article) => (
                    <ArticlePreview key={article.id} article={article} />
                  ))}
                  <Pagination />
                </>
              ) : (
                <span>No articles are here... yet.</span>
              )
            ) : favoritePost && favoritePost.length > 0 ? (
              <>
                {favoritePost.map((article) => (
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
