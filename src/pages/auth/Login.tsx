import ErrorMessage from "../../components/error";
import { FormField } from "../../components/form/formField";
import { useAuthAction } from "../../hooks/useAuthAction";
import { useForm } from "react-hook-form";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { loginUser } = useAuthAction();

  const onSubmit = (data: any) => {
    loginUser(data.email, data.password);
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <a href="/register">Need an account?</a>
            </p>
            <ErrorMessage errors={errors.email?.message} />
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset className="form-group">
                <label htmlFor="email">Email</label>
                <FormField
                  className="form-control form-control-lg"
                  label="Email"
                  error={errors.email}
                  {...register("email", { required: true })}
                />
              </fieldset>
              <fieldset className="form-group">
                <label htmlFor="password">Password</label>
                <FormField
                  className="form-control form-control-lg"
                  label="Password"
                  error={errors.password}
                  {...register("password", { required: true })}
                />
              </fieldset>
              <button
                type="submit"
                className="btn btn-lg btn-primary pull-xs-right"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
