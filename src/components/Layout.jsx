export default function Layout({ children }) {
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
      {children}
    </div>
  );
}
