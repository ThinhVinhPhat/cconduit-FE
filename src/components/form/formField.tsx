import { forwardRef } from "react";
import { FieldError } from "react-hook-form";

type FormFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: FieldError | undefined;
};

export const FormField = forwardRef(
  (props: FormFieldProps, ref: React.Ref<HTMLInputElement>) => {
    const {
      type = props.type === "password" ? "password" : "text",
      className = "",
      label,
      error,
      ...other
    } = props;
    return (
      <div className="form-group">
        <input
          type={type}
          className={`form-control ${className}`}
          placeholder={label}
          ref={ref}
          {...other}
        />
        {error && <div className="error-feedback">{error.message}</div>}
      </div>
    );
  }
);
