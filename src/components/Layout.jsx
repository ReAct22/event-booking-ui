import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      style={{
        maxWidth: "390px",
        margin: "0 auto",
        minHeight: "100vh",
        background: "#f9fafb",
        padding: "16px",
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <h3 style={{ margin: 0 }}>Event App</h3>

        <div style={{ display: "flex", gap: "8px" }}>
          {user ? (
            <>
              <span style={{ fontSize: "14px" }}>
                Hi, {user.name}
              </span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/login")}>
                Login
              </button>
              <button onClick={() => navigate("/register")}>
                Register
              </button>
            </>
          )}
        </div>
      </div>

      {children}
    </div>
  );
}