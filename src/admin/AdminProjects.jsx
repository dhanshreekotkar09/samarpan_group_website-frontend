import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllProjects, deleteProject, getImageSrc } from "../api/client";

export default function AdminProjects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    getAllProjects()
      .then(({ data }) => setProjects(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"? This will remove all photos too.`)) return;
    await deleteProject(id);
    load();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-sans)", fontSize: 32, color: "#2a3a14", margin: 0 }}>Projects</h1>
          <p style={{ color: "#8a9a6a", margin: "8px 0 0", fontSize: 14 }}>Manage your portfolio projects and photos</p>
        </div>
        <button type="button" className="admin-btn-primary" onClick={() => navigate("/admin/projects/new")}>
          + New Project
        </button>
      </div>

      {loading ? (
        <p>Loading projects...</p>
      ) : projects.length === 0 ? (
        <div className="admin-empty">
          <p>No projects yet. Create your first project!</p>
          <button type="button" className="admin-btn-primary" onClick={() => navigate("/admin/projects/new")}>
            + New Project
          </button>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Photos</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p._id}>
                  <td>
                    {p.heroImage ? (
                      <img src={getImageSrc(p.heroImage)} alt="" className="admin-thumb" />
                    ) : (
                      <div className="admin-thumb admin-thumb-empty">—</div>
                    )}
                  </td>
                  <td><strong>{p.title}</strong>{p.legacyId ? ` (#${p.legacyId})` : ""}</td>
                  <td>{p.category}</td>
                  <td>{p.media?.length || 0} photos</td>
                  <td>
                    <span className="admin-badge published">Active</span>
                  </td>
                  <td>
                    <div className="admin-actions">
                      <Link to={`/admin/projects/${p._id}`} className="admin-btn-edit">Edit</Link>
                      <button type="button" className="admin-btn-delete" onClick={() => handleDelete(p._id, p.title)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style>{`
        .admin-btn-primary {
          padding: 12px 24px;
          background: #4a5a1f;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        }
        .admin-empty {
          text-align: center;
          padding: 64px;
          background: #fff;
          border-radius: 12px;
          color: #8a9a6a;
        }
        .admin-table-wrap {
          background: #fff;
          border-radius: 12px;
          overflow: auto;
          max-height: calc(100vh - 220px);
          box-shadow: 0 2px 8px rgba(42,58,20,0.06);
        }
        .admin-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          font-size: 14px;
        }
        .admin-table th {
          text-align: left;
          padding: 14px 16px;
          background: #f8f6f2;
          color: #5a5a4a;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          position: sticky;
          top: 0;
          z-index: 2;
          border-bottom: 1px solid #e8e4dc;
        }
        .admin-table td {
          padding: 14px 16px;
          border-top: 1px solid #f0ede6;
          vertical-align: middle;
          background: #fff;
        }
        .admin-table tbody tr:first-child td { border-top: none; }
        .admin-thumb {
          width: 56px;
          height: 40px;
          object-fit: cover;
          border-radius: 6px;
        }
        .admin-thumb-empty {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f0ede6;
          color: #aaa;
          font-size: 12px;
        }
        .admin-badge {
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 500;
        }
        .admin-badge.published { background: #e8f5e0; color: #4a5a1f; }
        .admin-badge.draft { background: #f5f0e8; color: #8a9a6a; }
        .admin-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .admin-btn-edit,
        .admin-btn-delete {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 7px 14px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.3px;
          cursor: pointer;
          text-decoration: none;
          border: 1px solid transparent;
          font-family: inherit;
          line-height: 1;
        }
        .admin-btn-edit {
          background: #eef3e0;
          color: #3d4a1f;
          border-color: rgba(74, 90, 31, 0.18);
        }
        .admin-btn-edit:hover { background: #e2ebcc; }
        .admin-btn-delete {
          background: #fdecea;
          color: #b03a2e;
          border-color: rgba(192, 57, 43, 0.18);
        }
        .admin-btn-delete:hover { background: #f9d6d2; }
      `}</style>
    </div>
  );
}
