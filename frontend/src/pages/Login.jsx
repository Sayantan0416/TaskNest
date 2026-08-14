import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Login({ onSwitchToRegister })  {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSubmitting(true);

    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-brand">
          <div className="login-logo">
            T
          </div>

          <h1>TaskNest</h1>

          <p>
            Stay organized. Get things done.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />
          </div>

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={submitting}
          >
            {submitting ? "Signing in..." : "Sign In"}
          </button>

        </form>

        <div className="login-footer">
            <div className="auth-switch">
  <span>Don't have an account?</span>

  <button
    type="button"
    onClick={onSwitchToRegister}
  >
    Create Account
  </button>
</div>
          <span>TaskNest</span>
          <span>Productivity Mode</span>
        </div>

      </div>
    </div>
  );
}

export default Login;