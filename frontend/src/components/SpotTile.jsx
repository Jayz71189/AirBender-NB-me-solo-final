// import { useNavigate } from "react-router-dom";
import "./SpotTile.css"; // Add styling for individual tiles
import { useNavigate } from "react-router-dom";

const SpotTile = ({ spot }) => {
  const { id, name, city, state, price, avgRating, SpotImages } = spot;

  const navigate = useNavigate();

  // previewImage =
  //   spot.SpotImages.find((image) => image.preview)?.url || "default-image.jpg";

  if (!spot) {
    return <div>Error: Spot data is undefined</div>;
  }

  const handleTileClick = () => {
    navigate(`/spots/${id}`); // Navigate to the spot's detail page
  };

  const thumbnailUrl = SpotImages?.[0]?.url || "placeholder-image-url.jpg";

  console.log(SpotImages);

  return (
    <div
      className="spot-tile"
      title={spot.name}
      onClick={handleTileClick}
      style={{ cursor: "pointer" }}
    >
      <img src={thumbnailUrl} alt={name} />
      <div className="spot-info">
        <h3>{name}</h3>
        <p>{`${city}, ${state}`}</p>
        <p>{`$${price} / night`}</p>

        <p>
          {/* Star Rating with Icon */}
          <div className="button-info">
            <i className="fa fa-star" aria-hidden="true"></i>{" "}
            {avgRating === null
              ? "New"
              : `${parseFloat(avgRating).toFixed(1)} stars`}
          </div>
        </p>
      </div>
    </div>
  );
};

export default SpotTile;
