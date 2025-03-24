import { useEffect } from "react";
import { usePost } from "../../hooks/usePost";
import { useNavigate } from "react-router-dom";
function SettingPage() {
  const { me, handleLogout } = usePost();
  const navigate = useNavigate();

  useEffect(() => {
    if (!me) {
      navigate("/");
    }
  }, [me]);

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            {/* <ul className="error-messages">
              <li>That name is required</li>
            </ul> */}
            <form>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="file"
                    placeholder="URL of profile picture"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    defaultValue={me?.name}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    rows={8}
                    placeholder="Short bio about you"
                    defaultValue={me?.description}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    defaultValue={me?.email}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="New Password"
                  />
                </fieldset>
                <button className="btn btn-lg btn-primary pull-xs-right">
                  Update Settings
                </button>
              </fieldset>
            </form>
            <hr />
            <button
              onClick={() => {
                handleLogout();
                navigate("/");
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
