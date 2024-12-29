import { csrfFetch } from "../store/csrf";
import { useModal } from "../context/Modal";

const DeleteReviewModal = ({ reviewId, onDelete }) => {
  const { closeModal } = useModal();
  const handleDelete = async () => {
    try {
      const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        onDelete(reviewId);
      } else {
        alert("Failed to delete review");
      }
    } catch (err) {
      console.error("Error deleting review:", err);
    }
  };

  return (
    <div className="delete-review-modal">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this review?</p>
      <button
        className="confirm-button"
        onClick={() => {
          handleDelete();
          closeModal();
        }}
      >
        Yes (Delete Review)
      </button>
      <button onClick={closeModal} className="cancel-button">
        No (Keep Review)
      </button>
    </div>
  );
};

export default DeleteReviewModal;
