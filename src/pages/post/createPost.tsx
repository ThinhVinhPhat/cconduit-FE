import { useState } from "react";
import { usePost } from "../../hooks/usePost";

function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [description, setDiscription] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const { createArticle } = usePost();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title,
      description,
      body,
      tags: tags.split(","),
    };
    const result = createArticle(data);

    if (result) {
      console.log("success");
    } else {
      console.log("fail");
    }
  };

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

export default CreatePostPage;
