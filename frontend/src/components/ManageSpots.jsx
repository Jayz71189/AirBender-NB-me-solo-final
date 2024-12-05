import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./ManageSpots.css";
import { csrfFetch } from "../store/csrf";

const ManageSpots = () => {
  const [spots, setSpots] = useState([]);
  const currentUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();

  const handleTileClick = (spotId) => {
    navigate(`/spots/${spotId}`);
  };

  useEffect(() => {
    const fetchSpots = async () => {
      const response = await fetch("/api/spots/current");
      const data = await response.json();
      setSpots(data.Spots || []);
    };

    if (currentUser) fetchSpots();
  }, [currentUser]);

  const handleUpdate = (spotId) => {
    navigate(`/spots/${spotId}/edit`);
  };

  const handleDelete = async (spotId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this spot?"
    );
    if (confirmDelete) {
      const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSpots((prevSpots) => prevSpots.filter((spot) => spot.id !== spotId));
      } else {
        alert("Failed to delete the spot. Please try again.");
      }
    }
  };

  if (!currentUser) {
    return <div>Please log in to manage your spots.</div>;
  }

  return (
    <div className="manage-spots">
      <h1>Manage Spots</h1>
      {spots.length === 0 ? (
        <div>
          <p>No spots posted yet.</p>
          <button onClick={() => navigate("/spots/new")}>
            Create a New Spot
          </button>
        </div>
      ) : (
        <div className="spots-list">
          {spots.map((spot) => (
            <div
              key={spot.id}
              className="spot-tile"
              onClick={() => handleTileClick(spot.id)}
            >
              <img
                src={spot.SpotImages?.[0]?.url || "placeholder.jpg"}
                alt={spot.name}
                className="thumbnail"
              />
              <div className="spot-info">
                <h2>{spot.name}</h2>
                <p>{`${spot.city}, ${spot.state}`}</p>
                <p>
                  ⭐ {spot.avgStarRating || "New"} · ${spot.price}/night
                </p>
              </div>
              <div className="spot-actions">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpdate(spot.id);
                  }}
                >
                  Update
                </button>
                <button onClick={() => handleDelete(spot.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageSpots;
