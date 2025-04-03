import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { useGetMe } from "../../hooks/query/user/useGetMe";
import { useArticleAction } from "../../hooks/useArticleAction";
import { useArticleDetail } from "../../hooks/query/article/usePostDetail";
import { useForm } from "react-hook-form";

interface IFormInput {
  id: string;
  title: string;
  shortDescription: string;
  tags: string;
}
function PostFormPage() {
  const { data: me } = useGetMe();
  const { slug } = useParams();
  const { data: post } = useArticleDetail(slug, me?.id);
  const { createArticle, updateArticle } = useArticleAction();
  const [description, setDescription] = useState(slug ? post.description : "");
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<IFormInput>({
    defaultValues: {
      id: slug ? post.id : "",
      title: slug ? post.title : "",
      shortDescription: slug ? post.shortDescription : "",
      tags: slug ? post.tagList.join(",") : "",
    },
  });

  const onSubmit = (data: IFormInput) => {
    const completeData = {
      ...data,
      description: description,
      tags: data.tags.split(","),
    };
    if (slug) {
      updateArticle(completeData);
      try {
        navigate(-1);
      } catch (error) {
        console.log(error);
      }
    } else {
      const result = createArticle(completeData);
      if (result) {
        setValue("title", "");
        setValue("shortDescription", "");
        setValue("tags", "");
        setDescription("");
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    defaultValue={slug ? post.title : ""}
                    {...register("title")}
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    defaultValue={slug ? post.shortDescription : ""}
                    {...register("shortDescription")}
                    className="form-control"
                    placeholder="What's this article about?"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <Editor
                    onChange={(e) => setDescription(e.target.getContent())}
                    initialValue={description}
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
                    {...register("tags")}
                    defaultValue={slug ? post.tagList.join(",") : ""}
                    placeholder="Enter tags"
                  />
                  {slug &&
                    post.tagList.map((tag: string, index: number) => {
                      return (
                        <div key={index} className="tag-list">
                          <span className="tag-default tag-pill">
                            {" "}
                            <i className="ion-close-round" /> {tag}{" "}
                          </span>
                        </div>
                      );
                    })}
                </fieldset>
                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="submit"
                  disabled={
                    slug
                      ? post.title === "" ||
                        post.description === "" ||
                        post.body === ""
                      : false
                  }
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
