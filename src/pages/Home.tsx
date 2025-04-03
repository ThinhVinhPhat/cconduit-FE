import { useNavigate } from "react-router-dom";
import ArticlePreview from "../components/article/article-preview";
import Button from "../components/Button";
import Pagination from "../components/pagination";
import TagList from "../components/tags/tag-list";
import Toggle from "../components/toogle";
import EmptyState from "../components/ui/EmptyState";
import { useGetTag } from "../hooks/query/tag/useGetTags";
import { useArticleAction } from "../hooks/useArticleAction";
import { useArticleContext } from "../hooks/useArticleContext";
import { useTagAction } from "../hooks/useTagAction";
import { Article } from "../types";
import { useGetMe } from "../hooks/query/user/useGetMe";
import LoadingSpinner from "../components/ui/LoadingSpinner";

function HomePage() {
  const { currentTag, setToggle, dataPost } = useArticleContext();
  const { addTags } = useTagAction();
  const { isLoadingPosts } = useArticleAction();
  const { data: tags, isLoading: isLoadingTags } = useGetTag();
  const { data: user } = useGetMe();
  const navigate = useNavigate();
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
          {isLoadingPosts || !dataPost ? (
            <LoadingSpinner size="lg" />
          ) : (
            <>
              <div className="col-md-9">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Toggle currentPage="home" currentTag={currentTag} />
                </div>
                {dataPost.length > 0 ? (
                  dataPost?.map((post: Article) => (
                    <ArticlePreview key={post.id} article={post} />
                  ))
                ) : (
                  <EmptyState
                    icon={
                      <i
                        className="ion-heart text-primary"
                        style={{ fontSize: "40px" }}
                      ></i>
                    }
                    actionButton={
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          user?.username
                            ? navigate("/post/create")
                            : navigate("/login")
                        }
                      >
                        Create Article
                      </button>
                    }
                  />
                )}

                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Pagination />
                </div>
              </div>
              <div className="col-md-3">
                <div className="sidebar">
                  {isLoadingTags ? (
                    <EmptyState
                      message="Loading tags..."
                      icon={<i className="ion-heart text-primary"></i>}
                    />
                  ) : (
                    <TagList
                      tags={tags}
                      onaddTags={addTags}
                      onHandleToggle={setToggle}
                    />
                  )}
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
