import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div style={{ marginBottom: "16px" }}>
      <Link to="/">Events</Link> |{" "}
      <Link to="/bookings">My Bookings</Link> |{" "}
      <Link to="/notifications">Notifications</Link>
    </div>
  );
}