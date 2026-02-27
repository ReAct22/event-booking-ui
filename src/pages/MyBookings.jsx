import { useEffect, useState } from "react";
import api from "../services/api";

export default function MyBookings() {
  const [data, setData] = useState({
    upcoming: [],
    past: [],
  });

  const fetchBookings = async () => {
    const res = await api.get("/my-bookings");
    setData(res.data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const cancelBooking = async (id) => {
    await api.post(`/cancel/${id}`);
    fetchBookings();
  };

  return (
    <div>
      <h2>My Upcoming Bookings</h2>

      {data.upcoming.length === 0 && <p>No upcoming bookings</p>}

      {data.upcoming.map((booking) => (
        <div key={booking.id} style={cardStyle}>
          <h4>{booking.slot.event.title}</h4>
          <p>
            {new Date(booking.slot.start_time).toLocaleString()}
          </p>
          <p>Qty: {booking.quantity}</p>

          <button onClick={() => cancelBooking(booking.id)}>
            Cancel
          </button>
        </div>
      ))}

      <hr />

      <h2>Past Bookings</h2>

      {data.past.length === 0 && <p>No past bookings</p>}

      {data.past.map((booking) => (
        <div key={booking.id} style={cardStyle}>
          <h4>{booking.slot.event.title}</h4>
          <p>
            {new Date(booking.slot.start_time).toLocaleString()}
          </p>
          <p>Qty: {booking.quantity}</p>
        </div>
      ))}
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};