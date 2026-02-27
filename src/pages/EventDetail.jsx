import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function EventDetail() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState({}); // quantity per slot

  const fetchEvent = async () => {
    try {
      const res = await api.get(`/events/${id}`);
      setEvent(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const handleQuantityChange = (slotId, value) => {
    setQuantity({
      ...quantity,
      [slotId]: value,
    });
  };

  const handleBooking = async (slotId) => {
    const qty = quantity[slotId] || 1;

    try {
      await api.post("/book", {
        slot_id: slotId,
        quantity: qty,
      });

      alert("Booking success!");
      fetchEvent();
    } catch (err) {
      alert(
        err.response?.data?.message || "Slot penuh atau terjadi kesalahan"
      );
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!event) return <p>Event not found</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>
        <strong>Location:</strong> {event.location}
      </p>

      <hr />

      <h3>Available Time Slots</h3>

      {event.time_slots.length === 0 && <p>No available slots</p>}

      {event.time_slots.map((slot) => {
        const isFull = slot.remaining_capacity <= 0;

        return (
          <div key={slot.id} style={cardStyle}>
            <p>
              <strong>
                {new Date(slot.start_time).toLocaleString()} -{" "}
                {new Date(slot.end_time).toLocaleString()}
              </strong>
            </p>

            <p>
              Remaining Capacity: {slot.remaining_capacity} /{" "}
              {slot.capacity}
            </p>

            {isFull ? (
              <button disabled style={disabledBtn}>
                Full
              </button>
            ) : (
              <>
                <input
                  type="number"
                  min="1"
                  max={slot.remaining_capacity}
                  value={quantity[slot.id] || 1}
                  onChange={(e) =>
                    handleQuantityChange(
                      slot.id,
                      parseInt(e.target.value)
                    )
                  }
                  style={{ width: "60px", marginRight: "10px" }}
                />

                <button onClick={() => handleBooking(slot.id)}>
                  Book
                </button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  padding: "15px",
  marginBottom: "15px",
  borderRadius: "10px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
};

const disabledBtn = {
  background: "#ccc",
  border: "none",
  padding: "8px 12px",
  borderRadius: "6px",
};