import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get("/events", {
        params: {
          search: search || undefined,
          per_page: 10,
        },
      });

      setEvents(res.data?.data ?? []);
    } catch (err) {
      console.error(err);
      setError("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [search]);

  return (
    <div>
      <h2>Upcoming Events</h2>

      <input
        type="text"
        placeholder="Search event..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "16px", padding: "8px", width: "100%" }}
      />

      {/* 🔄 Loading State */}
      {loading && <p>Loading events...</p>}

      {/* ❌ Error State */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 📭 Empty State */}
      {!loading && !error && events.length === 0 && (
        <p>No events found.</p>
      )}

      {/* ✅ Data */}
      {!loading &&
        !error &&
        events.map((event) => (
          <div
            key={event.id}
            style={{
              marginBottom: "16px",
              padding: "12px",
              background: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <Link to={`/events/${event.id}`}>View</Link>
          </div>
        ))}
    </div>
  );
}