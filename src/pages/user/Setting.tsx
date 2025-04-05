import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { useGetMe } from "../../hooks/query/user/useGetMe";
import { useAuthAction } from "../../hooks/useAuthAction";
import { SubmitHandler, useForm } from "react-hook-form";
import UserAvatar from "../../components/UserAvatar";
import clsx from "clsx";
import { enqueueSnackbar } from "notistack";
import { IFormInput } from "../../types/user";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import checkChanges from "../../ultis/checkChanges";

function SettingPage() {
  const { data: me } = useGetMe();
  const [description, setDescription] = useState<string | undefined>(
    me?.description
  );
  const { register, handleSubmit, setValue, getValues, watch } =
    useForm<IFormInput>({
      defaultValues: {
        name: me?.name,
        avatar: me?.avatar,
      },
    });
  const { logoutUser, updateUser, isUpdating } = useAuthAction();
  const navigate = useNavigate();

  useEffect(() => {
    if (!me) {
      navigate("/");
    }
  }, [me]);

  const name = watch("name");
  const avatar = watch("avatar");

  const isChanges = checkChanges(
    {
      avatar: avatar,
      name: name,
      description: description,
    },
    {
      avatar: me?.avatar,
      name: me?.name,
      description: me?.description,
    }
  );

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const completeData = {
      ...data,
      description: description,
    };
    if (!isChanges) {
      enqueueSnackbar("No changes to update", { variant: "info" });
      return;
    }
    const result = await updateUser(completeData);
    if (result) {
      setValue("avatar", result?.image);
      setValue("name", result?.username);
      setDescription(() => result?.bio);
    }
  };

  return isUpdating ? (
    <LoadingSpinner />
  ) : (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            {/* <ul className="error-messages">
              <li>That name is required</li>
            </ul> */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="file"
                    placeholder="URL of profile picture"
                    {...register("avatar")}
                  />
                </fieldset>
                <UserAvatar
                  image={getValues("avatar") || me?.avatar}
                  size="sm"
                  username={getValues("name") || me?.name}
                />
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    {...register("name", { value: me?.name })}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <Editor
                    initialValue={me?.description}
                    onChange={(e) => setDescription(e.target.getContent())}
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
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    defaultValue={me?.email}
                    disabled
                  />
                </fieldset>
                {/* <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="New Password"
                  />
                </fieldset> */}
                <button
                  className={clsx("btn btn-lg btn-primary pull-xs-right", {})}
                >
                  Update Settings
                </button>
              </fieldset>
            </form>
            <hr />
            <button
              onClick={() => {
                logoutUser();
                navigate("/", { replace: true, preventScrollReset: true });
              }}
              className="btn btn-outline-danger"
            >
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingPage;
