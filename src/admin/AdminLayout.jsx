import { useEffect, useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { verifyToken } from "../api/client";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const username = localStorage.getItem("adminUser") || "Admin";

  useEffect(() => {
    verifyToken()
      .then(() => setChecking(false))
      .catch(() => navigate("/admin/login"));
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  if (checking) {
    return <div style={{ padding: 48, textAlign: "center", fontFamily: "var(--font-sans)" }}>Loading...</div>;
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand">Samarpan Admin</div>
        <nav>
          <Link to="/admin/projects">Projects</Link>
          <Link to="/" target="_blank">View Website ↗</Link>
        </nav>
        <div className="admin-sidebar-footer">
          <span>{username}</span>
          <button type="button" onClick={logout}>Logout</button>
        </div>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
      <style>{`
        .admin-layout {
          display: flex;
          height: 100vh;
          overflow: hidden;
          font-family: var(--font-sans);
          background: #f8f6f2;
        }
        .admin-sidebar {
          width: 240px;
          height: 100vh;
          background: #2a3a14;
          color: #f5f0e8;
          display: flex;
          flex-direction: column;
          padding: 24px 0;
          flex-shrink: 0;
        }
        .admin-brand {
          font-family: var(--font-sans);
          font-size: 20px;
          padding: 0 24px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .admin-sidebar nav {
          flex: 1;
          padding: 24px 0;
          overflow-y: auto;
        }
        .admin-sidebar nav a {
          display: block;
          padding: 12px 24px;
          color: rgba(245,240,232,0.75);
          text-decoration: none;
          font-size: 14px;
          transition: all 0.2s;
        }
        .admin-sidebar nav a:hover {
          background: rgba(255,255,255,0.08);
          color: #fff;
        }
        .admin-sidebar-footer {
          padding: 16px 24px;
          border-top: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
          flex-shrink: 0;
          background: #2a3a14;
        }
        .admin-sidebar-footer button {
          background: none;
          border: 1px solid rgba(255,255,255,0.3);
          color: #fff;
          padding: 4px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 11px;
        }
        .admin-main {
          flex: 1;
          min-width: 0;
          height: 100vh;
          padding: 32px 40px;
          overflow-y: auto;
        }
        @media (max-width: 768px) {
          .admin-layout { flex-direction: column; height: 100vh; }
          .admin-sidebar { width: 100%; height: auto; }
          .admin-main { height: auto; flex: 1; }
        }
      `}</style>
    </div>
  );
}
