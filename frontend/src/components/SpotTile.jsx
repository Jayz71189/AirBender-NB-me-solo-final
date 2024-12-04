// import { useNavigate } from "react-router-dom";
import "./SpotTile.css"; // Add styling for individual tiles
import { useNavigate } from "react-router-dom";

const SpotTile = ({ spot }) => {
  const { id, name, city, state, price, previewImage, avgRating } = spot;

  const navigate = useNavigate();

  if (!spot) {
    return <div>Error: Spot data is undefined</div>;
  }

  const handleTileClick = () => {
    navigate(`/spots/${id}`); // Navigate to the spot's detail page
  };

  return (
    <div
      className="spot-tile"
      onClick={handleTileClick}
      style={{ cursor: "pointer" }}
    >
      <img src={previewImage} alt={name} />
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
