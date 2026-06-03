import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../services/authService";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(
        email,
        password
      );

      localStorage.setItem(
        "token",
        data.token
      );

      navigate("/dashboard");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div
      style={{
        padding: "40px",
      }}
    >
      <h1>LifeOS Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />
        </div>

        <br />

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />
        </div>

        <br />

        <button type="submit">
          Login
        </button>
      </form>

      {error && (
        <p>{error}</p>
      )}
    </div>
  );
};

export default LoginPage;