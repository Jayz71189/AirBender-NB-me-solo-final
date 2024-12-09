import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReviewModal from "./ReviewModal";
// import ReviewFormModal from "./ReviewFormModal/ReviewFormModal";
import "./SpotDetails.css";
import { csrfFetch } from "../store/csrf";

const SpotDetail = () => {
  const { spotId } = useParams();
  const [spot, setSpot] = useState(null);
  const [error, setError] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState(0);
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    const fetchSpotAndReviews = async () => {
      try {
        const [spotResponse, reviewsResponse] = await Promise.all([
          csrfFetch(`/api/spots/${spotId}`),
          csrfFetch(`/api/spots/${spotId}/reviews`),
        ]);
        if (!spotResponse.ok) {
          throw new Error("Spot not found");
        }
        const spotData = await spotResponse.json();
        const reviewsData = await reviewsResponse.json();

        setSpot(spotData);
        setReviews(reviewsData.Reviews || []);
      } catch (err) {
        setError(true);
      }
    };

    fetchSpotAndReviews();
  }, [spotId]);

  if (error) {
    return (
      <div className="error">
        <h1>Spot Not Found</h1>
        <p>The spot you are looking for does not exist.</p>
      </div>
    );
  }

  const hasUserReviewed = reviews.some(
    (review) => review.userId === currentUser?.id
  );
  const isOwner = spot?.ownerId === currentUser?.id;

  const handleSubmitReview = async () => {
    try {
      const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment, stars }),
      });

      if (response.ok) {
        const newReview = await response.json();
        setReviews([newReview, ...reviews]); // Add new review to the top of the list
        setSpot((prev) => ({
          ...prev,
          avgStarRating:
            (prev.avgStarRating * reviews.length + stars) /
            (reviews.length + 1),
          numReviews: prev.numReviews + 1,
        }));
        setIsModalOpen(false); // Close the modal
        setComment(""); // Reset form fields
        setStars(0);
      } else {
        const error = await response.json();
        alert(error.message || "Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (!spot) return <div>Loading...</div>;

  const {
    name,
    city,
    state,
    country,
    description,
    previewImage,
    price,
    Owner,
    avgRating,
    reviewCount,
    SpotImages,
  } = spot;

  // Render the rating and review count
  const renderReviewSummary = () => {
    if (avgRating === null || reviewCount === 0) {
      return <div>New</div>;
    }
    return (
      <div>
        <span className="fa fa-star"></span> {avgRating.toFixed(1)} (
        {reviewCount} reviews)
      </div>
    );
  };

  // Use fallback values if `images` is not defined
  const defaultImage =
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTA4NjI3OTI1MjIxNDQyOA%3D%3D/original/bc989f2d-eca8-4bcf-a9b0-b70b8e685a64.jpeg?im_w=2560&im_q=highq&im_format=avif"; // Replace with your placeholder URL
  const displayedImages = Array.isArray(previewImage) ? previewImage : []; // Ensure `images` is an array

  // console.log(SpotImages);

  return (
    <div className="spot-detail-container">
      <div className="spot-detail">
        <h1>{name}</h1>
        <p>
          Location: {city}, {state}, {country}
        </p>
        <div className="images-section">
          <img
            className="large-image"
            // src={displayedImages[0] || defaultImage} // Use default image if none is providedalt="Large Spot" />
            src={SpotImages[0].url}
            alt="Large Spot"
          />
          <div className="small-images">
            {displayedImages.slice(1, 5).map((img, idx) => (
              <img
                key={idx}
                src={img || defaultImage}
                alt={`Small Spot ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="two-column-layout">
        <div className="spot-info">
          <p>
            Hosted by {Owner.firstName} {Owner.lastName}
          </p>
          <p>{description}</p>
        </div>
        <div className="callout-box">
          <div className="price-section">
            <p className="price">
              ${price || "N/A"} <span className="price-label">night</span>
            </p>
            <div className="review-summary-callout">
              {renderReviewSummary()}
            </div>
          </div>
          <button
            className="reserve-button"
            onClick={() => alert("Feature coming soon")}
          >
            Reserve
          </button>
        </div>
      </div>

      {/* Reviews List
      <div className="reviews">
        <h2>Reviews</h2>
        {/* Here are the individual reviews */}

      {/* Show "Post Your Review" button if conditions are met */}
      {currentUser && !hasUserReviewed && !isOwner && (
        <button className="post-button" onClick={() => setIsModalOpen(true)}>
          Post Your Review
        </button>
      )}

      {/* Review List */}
      <div className="reviews">
        <h2>Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="review">
              <p>
                <strong>{review.User?.firstName || "Anonymous"}</strong>:{" "}
                {review.comment}
              </p>
              <p>⭐ {review.stars}</p>
            </div>
          ))
        )}
      </div>

      {/* Review Modal */}
      {isModalOpen && (
        <ReviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          comment={comment}
          setComment={setComment}
          stars={stars}
          setStars={setStars}
          onSubmit={handleSubmitReview}
        />
      )}
    </div>
  );
};

<button className="reserve-button" onClick={() => alert("Feature coming soon")}>
  Reserve
</button>;

export default SpotDetail;
