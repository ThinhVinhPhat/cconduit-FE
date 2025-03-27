import { useEffect, useState } from "react";
import { usePost } from "../../hooks/usePost";
import { useNavigate, useParams } from "react-router-dom";
import { usePostDetail } from "../../hooks/query/article/usePostDetail";
import { Editor } from "@tinymce/tinymce-react";

function PostFormPage() {
  const [title, setTitle] = useState("");
  const [description, setDiscription] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const { createArticle, me, updateArticle } = usePost();
  const navigate = useNavigate();
  const { slug } = useParams();
  const { data: post } = usePostDetail(slug, me?.id);

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
      updateArticle(data);
      try {
        navigate(`/`);
      } catch (error) {
        console.log(error);
      }
    } else {
      createArticle(data);
      setBody("");
      setTitle("");
      setDiscription("");
      setTags("");
    }
  };

  useEffect(() => {
    if (!me) {
      navigate("/");
    }
  }, [me]);
  console.log(body);

  const handleEditorChange = (e: string) => {
    setBody(e);
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
                  <Editor
                    value={body}
                    onEditorChange={handleEditorChange}
                    apiKey="lccx10ru49zi7f696fkhycfyir5ul90gm7j471cdhdytzd2c"
                    init={{
                      height: 500,
                      menubar: true,
                      plugins: "lists link image table code",
                      toolbar:
                        "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help",
                    }}
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
