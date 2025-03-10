import ArticlePreview from "../components/article/article-preview";
import Pagination from "../components/pagination";
import TagList from "../components/tags/tag-list";
import Toggle from "../components/toogle";
import { usePost } from "../hooks/usePost";
import { Article } from "../types";
import { Tag } from "../types/tags";

const sampleTags: Tag[] = [
  {
    id: "1",
    name: "Tag 1",
    slug: "tag-1",
    is_active: true,
    created_at: "2021-01-01",
    updated_at: "2021-01-01",
  },
  {
    id: "2",
    name: "Tag 2",
    slug: "tag-2",
    is_active: true,
    created_at: "2021-01-01",
    updated_at: "2021-01-01",
  },
];
function HomePage() {
  const { posts, isLoading } = usePost();

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
                <Toggle currentPage="home" />
                {posts?.map((post: Article) => (
                  <ArticlePreview key={post.slug} article={post} />
                ))}
                <Pagination />
              </div>
              <div className="col-md-3">
                <div className="sidebar">
                  <TagList tags={sampleTags} />
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
