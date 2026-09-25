import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  loginSchema,
  type LoginFormData,
} from "../schemas/loginSchema";

type LoginFormProps = {
  onSubmitLogin: (data: LoginFormData) => void;
  isSubmitting?: boolean;
};

export default function LoginForm({
  onSubmitLogin,
  isSubmitting = false,
}: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmitLogin)}
      className="booking-form"
      noValidate
    >
      <div className="form-group">
        <label htmlFor="email">Email</label>

        <input
          id="email"
          type="email"
          autoComplete="username"
          className="form-control"
          placeholder="admin@email.com"
          {...register("email")}
        />

        {errors.email && (
          <p className="form-error">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Mot de passe</label>

        <input
          id="password"
          type="password"
          autoComplete="current-password"
          className="form-control"
          {...register("password")}
        />

        {errors.password && (
          <p className="form-error">
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? "Connexion en cours..."
          : "Se connecter"}
      </button>
    </form>
  );
}
