import { useEffect, useState } from "react";
import { usePost } from "../../hooks/usePost";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../apis/auth";
import ImageKit from "imagekit";
import { Editor } from "@tinymce/tinymce-react";
function SettingPage() {
  const { me, handleLogout, imageAuth } = usePost();
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState<string>(me?.name || "");
  const [description, setDescription] = useState<string>(me?.description || "");
  const navigate = useNavigate();

  const imageKit = new ImageKit({
    publicKey: "public_EDgp88ndVCN1OaMZMgMXhJwh6yA=",
    urlEndpoint: "https://ik.imagekit.io/qinoqbrbp",
    privateKey: "private_lbRKx8mHgXwOne5YoluvZLslqBk=",
  });

  useEffect(() => {
    if (!me) {
      navigate("/");
    }
  }, [me]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const upload = await imageKit.upload({
      file: image,
      fileName: image?.name || "",
      token: imageAuth?.data?.token || "",
      signature: imageAuth?.data?.signature || "",
      expire: imageAuth?.data?.expire || "",
      publicKey: imageAuth?.data?.publicKey || "",
    });
    console.log(upload);

    await updateUser({
      avatar: upload?.url || "",
      name,
      description,
    });
  };

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            {/* <ul className="error-messages">
              <li>That name is required</li>
            </ul> */}
            <form onSubmit={(e) => handleSubmit(e)}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="file"
                    placeholder="URL of profile picture"
                    onChange={(e) => setImage(e.target.files?.[0])}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    defaultValue={me?.name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <Editor
                    value={description}
                    onEditorChange={(e) => setDescription(e)}
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
                <button className="btn btn-lg btn-primary pull-xs-right">
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
