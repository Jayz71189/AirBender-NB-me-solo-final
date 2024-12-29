import OpenModalButton from "./OpenModalButton/OpenModalButton";
import DeleteReviewModal from "./DeleteReviewModal";

const ReviewActions = ({ review, currentUser, onDelete }) => {
  const isReviewOwner = currentUser?.id === review.userId;

  return (
    <div className="review-actions">
      {isReviewOwner && (
        <OpenModalButton
          buttonText="Delete"
          className="delete-review-button"
          modalComponent={
            <DeleteReviewModal reviewId={review.id} onDelete={onDelete} />
          }
        />
      )}
    </div>
  );
};

export default ReviewActions;
