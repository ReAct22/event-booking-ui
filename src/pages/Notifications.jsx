import { useEffect, useState } from "react";
import api from "../services/api";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);

  const fetchNotifications = async () => {
    const res = await api.get("/notifications");
    setNotifications(res.data);
  };

  const fetchUnread = async () => {
    const res = await api.get("/notifications/unread-count");
    setUnread(res.data.unread);
  };

  useEffect(() => {
    fetchNotifications();
    fetchUnread();
  }, []);

  const markAsRead = async (id) => {
    await api.post(`/notifications/read/${id}`);
    fetchNotifications();
    fetchUnread();
  };

  const markAll = async () => {
    await api.post("/notifications/read-all");
    fetchNotifications();
    fetchUnread();
  };

  return (
    <div>
      <h2>Notifications ({unread} unread)</h2>

      {notifications.length === 0 && <p>No notifications</p>}

      <button onClick={markAll} style={{ marginBottom: "12px" }}>
        Mark All as Read
      </button>

      {notifications.map((notif) => (
        <div
          key={notif.id}
          style={{
            ...cardStyle,
            background: notif.is_read ? "#fff" : "#e0f2fe",
          }}
        >
          <p>{notif.message}</p>

          {!notif.is_read && (
            <button onClick={() => markAsRead(notif.id)}>
              Mark as Read
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

const cardStyle = {
  padding: "12px",
  marginBottom: "10px",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};