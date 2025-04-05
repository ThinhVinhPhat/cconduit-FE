import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { useGetMe } from "../../hooks/query/user/useGetMe";
import { useArticleAction } from "../../hooks/useArticleAction";
import { useArticleDetail } from "../../hooks/query/article/usePostDetail";
import { useForm } from "react-hook-form";
import { FormField } from "../../components/form/formField";
import checkChanges from "../../ultis/checkChanges";
import { enqueueSnackbar } from "notistack";

interface IFormInput {
  id: string;
  title: string;
  description: string;
  tags: string;
}
function PostFormPage() {
  const { data: me } = useGetMe();
  const { slug } = useParams();
  const { data: post } = useArticleDetail(slug, me?.id);
  const { createArticle, updateArticle } = useArticleAction();
  const [body, setBody] = useState(slug ? post.body : "");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      id: slug ? post.id : "",
      title: slug ? post.title : "",
      description: slug ? post.description : "",
      tags: slug ? post?.tagList?.join(",") : "",
    },
  });

  const tags = watch("tags");
  const title = watch("title");
  const description = watch("description");

  const onSubmit = (data: IFormInput) => {
    const completeData = {
      ...data,
      body: body,
      tags: data.tags.split(","),
    };
    if (slug) {
      const isChanges = checkChanges(
        {
          title: title,
          description: description,
          body: body,
          tags: tags,
        },
        {
          title: post.title,
          description: post.description,
          body: post.body,
          tags: post.tagList,
        }
      );
      if (!isChanges) {
        enqueueSnackbar("No changes to update", { variant: "info" });
        return;
      } else {
        updateArticle(completeData);
        try {
          navigate(-1);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      const result = createArticle(completeData);
      if (result) {
        setValue("title", "");
        setValue("description", "");
        setValue("tags", "");
        setBody("");
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
                {["title", "description"].map((field) => (
                  <FormField
                    label={field}
                    error={errors[field as keyof IFormInput]}
                    {...register(field, { value: slug ? post[field] : "" })}
                  />
                ))}
                <fieldset className="form-group">
                  <Editor
                    onChange={(e) => setBody(e.target.getContent())}
                    initialValue={body}
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
                  <FormField
                    label="Tags"
                    error={errors.tags}
                    {...register("tags", {
                      value: slug ? post.tagList.join(",") : "",
                    })}
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
