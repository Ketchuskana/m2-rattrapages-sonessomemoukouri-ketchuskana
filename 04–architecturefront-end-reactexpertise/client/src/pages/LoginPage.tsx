import { isAxiosError } from "axios";
import {
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import LoginForm from "../features/auth/components/LoginForm";
import { useLogin } from "../features/auth/hooks/useLogin";
import { useAuthStore } from "../features/auth/store/authStore";

import type { LoginFormData } from "../features/auth/schemas/loginSchema";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = useAuthStore((state) => state.token);

  const loginMutation = useLogin();

  const redirectTo =
    (location.state as { from?: string } | null)
      ?.from ?? "/admin";

  if (token) {
    return <Navigate to={redirectTo} replace />;
  }

  function handleLogin(data: LoginFormData) {
    loginMutation.mutate(data, {
      onSuccess: () => {
        navigate(redirectTo, { replace: true });
      },
    });
  }

  const isInvalidCredentials =
    isAxiosError(loginMutation.error) &&
    loginMutation.error.response?.status === 401;

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Espace administration</h1>

          <p>
            Connectez-vous pour gérer les rendez-vous.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container checkout-container">
          <div className="checkout-card">
            <LoginForm
              onSubmitLogin={handleLogin}
              isSubmitting={loginMutation.isPending}
            />

            {loginMutation.isError && (
              <div className="api-error">
                {isInvalidCredentials
                  ? "Email ou mot de passe incorrect."
                  : "Connexion impossible. Veuillez réessayer."}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
