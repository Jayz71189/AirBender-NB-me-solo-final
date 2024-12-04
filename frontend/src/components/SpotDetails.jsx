import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./SpotDetails.css";

const SpotDetail = () => {
  const { id } = useParams();
  const [spot, setSpot] = useState(null);
  // const { name, city, state, country, description, previewImage, Owner } = spot;

  useEffect(() => {
    const fetchSpot = async () => {
      try {
        const response = await fetch(`/api/spots/${id}`);
        const data = await response.json();
        setSpot(data);
      } catch (error) {
        console.error("Error fetching spot details:", error);
      }
    };

    fetchSpot();
  }, [id]);

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
            src={displayedImages[0] || defaultImage} // Use default image if none is providedalt="Large Spot" />
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

      {/* Reviews List */}
      <div className="reviews">
        <h2>Reviews</h2>
        {/* Here are the individual reviews */}
      </div>
    </div>
  );
};

<button className="reserve-button" onClick={() => alert("Feature coming soon")}>
  Reserve
</button>;

export default SpotDetail;
