import { useEffect } from "react";
import ErrorMessage from "../../components/error";
import { useNavigate } from "react-router-dom";
import { useAuthAction } from "../../hooks/useAuthAction";
import { useGetMe } from "../../hooks/query/user/useGetMe";
import { useForm } from "react-hook-form";
import { FormField } from "../../components/form/formField";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const { registerUser } = useAuthAction();
  const { data: me } = useGetMe();
  const navigate = useNavigate();

  useEffect(() => {
    if (me) {
      navigate(-1);
    }
  }, [me]);

  const onSubmit = (data: any) => {
    registerUser(data.username, data.email, data.password);
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <a href="/login">Have an account?</a>
            </p>
            <ErrorMessage errors={errors.username?.message} />
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset className="form-group">
                <FormField
                  label="Username"
                  error={errors.username}
                  {...register("username", { required: true })}
                />
              </fieldset>
              <fieldset className="form-group">
                <FormField
                  label="Email"
                  error={errors.email}
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                />
              </fieldset>
              <fieldset className="form-group">
                <FormField
                  label="Password"
                  error={errors.password}
                  {...register("password", { required: true })}
                />
              </fieldset>
              <button className="btn btn-lg btn-primary pull-xs-right">
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
