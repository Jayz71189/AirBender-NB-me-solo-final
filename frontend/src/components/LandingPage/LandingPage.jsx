import { useEffect, useState } from "react";
import SpotTile from "../SpotTile";
import "./LandingPage.css"; // Add styling for layout
import { csrfFetch } from "../../store/csrf";

const LandingPage = () => {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    // Fetch spots first
    const fetchSpots = async () => {
      try {
        const response = await fetch("/api/spots");
        const data = await response.json();

        if (Array.isArray(data.Spots)) {
          // Fetch SpotImages for each spot in parallel
          const spotsWithImages = await Promise.all(
            data.Spots.map(async (spot) => {
              try {
                console.log("spot");
                console.log(spot);
                const imageResponse = await csrfFetch(`/api/spots/${spot.id}`);
                const images = await imageResponse.json();

                // Check if 'SpotImages' is an array before using .find()
                const previewImage = Array.isArray(images.SpotImages)
                  ? images.SpotImages.find((img) => img.preview)?.url || null
                  : null;

                return { ...spot, previewImage };
              } catch (err) {
                console.error(
                  `Error fetching images for spot ${spot.id}:`,
                  err
                );
                return { ...spot, previewImage: null }; // Default to null on error
              }
            })
          );

          setSpots(spotsWithImages); // Update state with combined data
        } else {
          console.error("Expected spots array but got:", data);
        }
      } catch (error) {
        console.error("Error fetching spots:", error);
        setSpots([]); // Set spots to empty array if error occurs
      }
    };

    fetchSpots();
  }, []);

  // useEffect(() => {
  //   fetch("/api/spots")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Fetched data:", data);
  //       //   if (Array.isArray(data.Spots)) {
  //       //     setSpots(data.Spots); // Use data.spots if it's an array
  //       //   } else {
  //       //     console.error("Expected spots array but got:", data);
  //       //   }
  //       // })

  //       if (Array.isArray(data.Spots)) {
  //         const transformedSpots = data.Spots.map((spot) => {
  //           const previewImage =
  //             spot.SpotImages?.find((img) => img.preview)?.url || null;
  //           return { ...spot, previewImage };
  //         });
  //         setSpots(transformedSpots); // Update spots with transformed data
  //       } else {
  //         console.error("Expected spots array but got:", data);
  //       }
  //     })

  //     .catch((error) => {
  //       console.error("Error fetching spots:", error);
  //       setSpots([]); // Set spots to empty array if error occurs
  //     });
  // }, []);

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
