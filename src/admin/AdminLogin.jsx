import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/client";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await login(username, password);
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUser", data.username);
      navigate("/admin/projects");
    } catch {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <h1>Samarpan Admin</h1>
        <p>Sign in to manage projects and photos</p>
        <form onSubmit={handleSubmit}>
          <label>
            Username
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required autoFocus />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          {error && <p className="admin-error">{error}</p>}
          <button type="submit" disabled={loading}>{loading ? "Signing in..." : "Sign In"}</button>
        </form>
      </div>
      <style>{`
        .admin-login {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f5f0e8;
          font-family: var(--font-sans);
        }
        .admin-login-card {
          background: #fff;
          padding: 48px;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(42,58,20,0.08);
          width: 100%;
          max-width: 400px;
        }
        .admin-login-card h1 {
          font-family: var(--font-sans);
          font-size: 28px;
          color: #2a3a14;
          margin: 0 0 8px;
        }
        .admin-login-card p {
          color: #8a9a6a;
          font-size: 14px;
          margin: 0 0 32px;
        }
        .admin-login-card label {
          display: block;
          margin-bottom: 16px;
          font-size: 12px;
          font-weight: 500;
          color: #5a5a4a;
          letter-spacing: 0.5px;
        }
        .admin-login-card input {
          display: block;
          width: 100%;
          margin-top: 6px;
          padding: 12px 16px;
          border: 1.5px solid rgba(138,154,74,0.25);
          border-radius: 8px;
          font-size: 14px;
          font-family: inherit;
          box-sizing: border-box;
        }
        .admin-login-card input:focus {
          outline: none;
          border-color: #8a9a4a;
        }
        .admin-login-card button {
          width: 100%;
          padding: 14px;
          background: #4a5a1f;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          margin-top: 8px;
        }
        .admin-login-card button:disabled { opacity: 0.6; cursor: not-allowed; }
        .admin-error { color: #c0392b; font-size: 13px; margin: 0 0 8px; }
      `}</style>
    </div>
  );
}
