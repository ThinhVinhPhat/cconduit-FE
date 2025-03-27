import ArticlePreview from "../components/article/article-preview";
import Pagination from "../components/pagination";
import TagList from "../components/tags/tag-list";
import Toggle from "../components/toogle";
import { usePost } from "../hooks/usePost";
import { Article } from "../types";

function HomePage() {
  const { posts, isLoading, tags, currentTag, handleAddTags, handleToggle } =
    usePost();

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          {isLoading || !posts ? (
            <div>Loading...</div>
          ) : (
            <>
              <div className="col-md-9">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Toggle currentPage="home" currentTag={currentTag} />
                </div>
                {posts.length > 0 ? (
                  posts?.map((post: Article) => (
                    <ArticlePreview key={post.id} article={post} />
                  ))
                ) : (
                  <span>No articles are here... yet.</span>
                )}

                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Pagination />
                </div>
              </div>
              <div className="col-md-3">
                <div className="sidebar">
                  <TagList
                    tags={tags}
                    onAddTags={handleAddTags}
                    onHandleToggle={handleToggle}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
