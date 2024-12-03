import { useEffect, useState } from "react";
import SpotTile from "../SpotTile";
import "./LandingPage.css"; // Add styling for layout

const LandingPage = () => {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    fetch("/api/spots")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        if (Array.isArray(data.Spots)) {
          setSpots(data.Spots); // Use data.spots if it's an array
        } else {
          console.error("Expected spots array but got:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching spots:", error);
        setSpots([]); // Set spots to empty array if error occurs
      });
  }, []);

  return (
    <div className="landing-page">
      {Array.isArray(spots) && spots.length > 0 ? (
        spots.map((spot) => <SpotTile key={spot.id} spot={spot} />)
      ) : (
        <div>No spots available</div>
      )}
    </div>
  );
};

export default LandingPage;
