import { useState } from "react";
import { useDispatch } from "react-redux";
import { createReview } from "../store/reviews";

function ReviewModal({ spotId, onClose }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState(0);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (comment.length < 10) {
      setError("Comment must be at least 10 characters.");
      return;
    }

    if (stars === 0) {
      setError("Please select a star rating.");
      return;
    }

    try {
      await dispatch(createReview(spotId, { comment, stars }));
      onClose();
    } catch (err) {
      setError("An error occurred while submitting your review.");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    // Simulate an API call
    try {
      await csrfFetch(`/api/reviews/${reviewId}`, { method: "DELETE" });

      // Update state to remove the deleted review
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.id !== reviewId)
      );
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div className="review-modal">
      <h2>How was your stay?</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Leave your review here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <label>
          Stars:
          <input
            type="number"
            min="1"
            max="5"
            value={stars}
            onChange={(e) => setStars(Number(e.target.value))}
          />
        </label>
        <button type="submit" disabled={comment.length < 10 || stars === 0}>
          Submit Your Review
        </button>
      </form>
      <button onClick={onClose} className="close-modal">
        Close
      </button>

      <div className="review">
        <p className="review-comment">{review.comment}</p>
        {isUserReview && (
          <button className="delete-button" onClick={handleDeleteClick}>
            Delete
          </button>
        )}
        {showModal && (
          <ConfirmationModal
            title="Confirm Delete"
            message="Are you sure you want to delete this review?"
            confirmText="Yes (Delete Review)"
            cancelText="No (Keep Review)"
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
      </div>

      <div className="review-management">
        {reviews.map((review) => (
          <Review
            key={review.id}
            review={review}
            loggedInUserId={loggedInUserId}
            onDelete={handleDeleteReview}
          />
        ))}
      </div>
    </div>
  );
}

export default ReviewModal;
