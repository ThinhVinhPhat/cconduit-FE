import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageKit from "imagekit";
import { Editor } from "@tinymce/tinymce-react";
import { useGetMe } from "../../hooks/query/user/useGetMe";
import { useAuthAction } from "../../hooks/useAuthAction";
import { SubmitHandler, useForm } from "react-hook-form";
import UserAvatar from "../../components/UserAvatar";
import clsx from "clsx";
import { enqueueSnackbar } from "notistack";
import { IFormInput, User } from "../../types/user";
import { useUpdateUser } from "../../hooks/mutation/user/useUpdateUser";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

function SettingPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { data: me } = useGetMe();
  const { register, handleSubmit, setValue, getValues } = useForm<IFormInput>({
    defaultValues: {
      name: me?.name,
      description: me?.description,
      avatar: me?.avatar,
    },
  });
  const { handleLogout, imageAuth } = useAuthAction();
  const navigate = useNavigate();
  const {
    data: updateData,
    mutate: updateUser,
    isPending: isUpdating,
  } = useUpdateUser();
  const imageKit = new ImageKit({
    publicKey: "public_EDgp88ndVCN1OaMZMgMXhJwh6yA=",
    urlEndpoint: "https://ik.imagekit.io/qinoqbrbp",
    privateKey: "private_lbRKx8mHgXwOne5YoluvZLslqBk=",
  });

  useEffect(() => {
    if (!me) {
      navigate("/");
    }
    setCurrentUser(me);
  }, [me]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (
      getValues("avatar") === me?.avatar &&
      getValues("name") === me?.name &&
      getValues("description") === me?.description
    ) {
      enqueueSnackbar("No changes to update", { variant: "info" });
    }

    const upload =
      data.avatar && typeof data.avatar !== "string"
        ? await imageKit.upload({
            file: data.avatar[0],
            fileName: data.name || "",
            token: imageAuth?.data?.token || "",
            signature: imageAuth?.data?.signature || "",
            expire: imageAuth?.data?.expire || "",
            publicKey: imageAuth?.data?.publicKey || "",
          })
        : null;

    await updateUser({
      avatar: upload?.url || data.avatar,
      name: data.name,
      description: data.description,
    });

    setCurrentUser(me || null);

    setValue("avatar", "");
    setValue("name", "");
    setValue("description", "");
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
                  image={getValues("avatar") || currentUser?.avatar}
                  size="sm"
                  username={getValues("name") || currentUser?.name}
                />
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    defaultValue={currentUser?.name}
                    {...register("name")}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <Editor
                    initialValue={currentUser?.description}
                    {...register("description")}
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
                    defaultValue={currentUser?.email}
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
                handleLogout();
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
