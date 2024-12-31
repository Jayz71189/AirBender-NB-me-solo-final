import { csrfFetch } from "../store/csrf";
import { useModal } from "../context/Modal";
import "./DeleteReviewModal.css";

const DeleteSpotModal = ({ spotId, onDelete }) => {
  const { closeModal } = useModal();
  const handleDelete = async () => {
    try {
      const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        onDelete(spotId);
      } else {
        alert("Failed to delete spot");
      }
    } catch (err) {
      console.error("Error deleting spot:", err);
    }
  };

  return (
    <div className="delete-spot-modal">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this spot?</p>
      <button
        className="confirm-button"
        onClick={() => {
          handleDelete();
          closeModal();
        }}
      >
        Yes (Delete Spot)
      </button>
      <button onClick={closeModal} className="cancel-button">
        No (Keep Spot)
      </button>
    </div>
  );
};

export default DeleteSpotModal;
