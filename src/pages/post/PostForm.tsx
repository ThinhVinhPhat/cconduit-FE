import { useEffect, useState } from "react";
import { usePost } from "../../hooks/usePost";
import { useNavigate, useParams } from "react-router-dom";
import { usePostDetail } from "../../hooks/query/article/usePostDetail";

function PostFormPage() {
  const [title, setTitle] = useState("");
  const [description, setDiscription] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const { createArticle, me, updateArticle } = usePost();
  const navigate = useNavigate();
  const { slug } = useParams();
  const { data: post } = usePostDetail(slug);

  useEffect(() => {
    if (slug) {
      setTitle(post.title);
      setDiscription(post.shortDescription);
      setBody(post.description);
      setTags(post.tagList.join(","));
    }
  }, [slug]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      id: post.id,
      title,
      description,
      body,
      tags: tags.split(","),
    };
    if (slug) {
      const result = updateArticle(data);
      try {
        navigate(`/`);
        e.currentTarget.reset();
      } catch (error) {
        console.log(error);
      }
    } else {
      const result = createArticle(data);
      if (result) {
        navigate(`/`);
      } else {
        console.log("fail");
      }
    }
  };

  useEffect(() => {
    if (!me) {
      navigate("/");
    }
  }, [me]);

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            {/* <ul className="error-messages">
              <li>That title is required</li>
            </ul> */}
            <form onSubmit={(e) => handleSubmit(e)}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDiscription(e.target.value)}
                    className="form-control"
                    placeholder="What's this article about?"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows={8}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Write your article (in markdown)"
                    defaultValue={""}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Enter tags"
                  />
                  {/* <div className="tag-list">
                    <span className="tag-default tag-pill">
                      {" "}
                      <i className="ion-close-round" /> tag{" "}
                    </span>
                  </div> */}
                </fieldset>
                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  disabled={title === "" || description === "" || body === ""}
                  onClick={(e) => handleSubmit(e)}
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostFormPage;
