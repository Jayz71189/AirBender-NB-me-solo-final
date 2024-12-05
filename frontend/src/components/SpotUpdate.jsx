import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import ManageSpots from "./ManageSpots";

const UpdateSpot = () => {
  const { spotId } = useParams();
  const navigate = useNavigate();
  const [spot, setSpot] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    city: "",
    state: "",
    country: "",
    imageUrl: "",
  });

  const [errors, setErrors] = useState({
    country: "",
    address: "",
    city: "",
    state: "",
    description: "",
    title: "",
    price: "",
    previewImageUrl: "",
    imageUrls: ["", "", "", ""],
  });

  // Validation function
  const validateForm = () => {
    let validationErrors = {};
    let isValid = true;

    // Required fields
    if (!formData.country) {
      validationErrors.country = "Country is required";
      isValid = false;
    }
    if (!formData.address) {
      validationErrors.address = "Street Address is required";
      isValid = false;
    }
    if (!formData.city) {
      validationErrors.city = "City is required";
      isValid = false;
    }
    if (!formData.state) {
      validationErrors.state = "State is required";
      isValid = false;
    }
    if (!formData.description || formData.description.length < 30) {
      validationErrors.description = "Description needs at least 30 characters";
      isValid = false;
    }
    if (!formData.title) {
      validationErrors.title = "Title is required";
      isValid = false;
    }
    if (!formData.price) {
      validationErrors.price = "Price per night is required";
      isValid = false;
    }
    if (!formData.previewImageUrl) {
      validationErrors.previewImageUrl = "Preview Image URL is required";
      isValid = false;
    }
    // Validate Image URLs (optional)
    formData.imageUrls.forEach((url, index) => {
      if (url && !url.startsWith("http")) {
        validationErrors[`imageUrls${index}`] = "Image URL must be valid";
        isValid = false;
      }
    });

    setErrors(validationErrors);
    return isValid;
  };

  useEffect(() => {
    // Fetch the spot data using the spotId
    const fetchSpot = async () => {
      const response = await fetch(`/api/spots/${spotId}`);
      const data = await response.json();
      setSpot(data);
      setFormData({
        name: data.name,
        description: data.description,
        price: data.price,
        city: data.city,
        state: data.state,
        country: data.country,
        imageUrl: data.imageUrl || "", // Handle optional imageUrl
      });
    };

    fetchSpot();
  }, [spotId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedSpot = { ...formData };
    if (validateForm()) {
      try {
        const response = await fetch(`/api/spots/${spotId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedSpot),
        });

        if (response.ok) {
          // Navigate to the updated spot's detail page
          navigate(`/spots/${spotId}`);
        } else {
          // Handle errors here (e.g., show an error message)
          const errorData = await response.json();
          alert(errorData.message || "Something went wrong");
        }
      } catch (error) {
        console.error("Error updating the spot:", error);
      }
    }
  };

  if (!spot) return <p>Loading...</p>;

  return (
    <div>
      <h1>Update your Spot</h1>

      <form onSubmit={handleSubmit}>
        <section>
          <h2>Where&apos;s your place located?</h2>
          <p>
            Guests will only get your exact address once they booked a
            reservation.
          </p>
          <div>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
            />
            {errors.country && <div className="error">{errors.country}</div>}
          </div>
          <div>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Street Address"
            />
            {errors.address && <div className="error">{errors.address}</div>}
          </div>
          <div>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
            />
            {errors.city && <div className="error">{errors.city}</div>}
          </div>
          <div>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
            />
            {errors.state && <div className="error">{errors.state}</div>}
          </div>
        </section>

        <section>
          <h2>Describe your place to guests</h2>
          <p>
            Mention the best features of your space, any special amenities like
            fast wifi or parking, and what you love about the neighborhood.
          </p>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Please write at least 30 characters"
          />
          {errors.description && (
            <div className="error">{errors.description}</div>
          )}
        </section>

        <section>
          <h2>Create a title for your spot</h2>
          <p>
            Catch guests&apos; attention with a spot title that highlights what
            makes your place special.
          </p>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Name of your spot"
          />
          {errors.title && <div className="error">{errors.title}</div>}
        </section>

        <section>
          <h2>Set a base price for your spot</h2>
          <p>
            Competitive pricing can help your listing stand out and rank higher
            in search results.
          </p>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price per night (USD)"
          />
          {errors.price && <div className="error">{errors.price}</div>}
        </section>

        <section>
          <h2>Liven up your spot with photos</h2>
          <p>Submit a link to at least one photo to publish your spot.</p>
          <input
            type="text"
            name="previewImageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Preview Image URL"
          />
        </section>
        <button type="submit">Update your Spot</button>
      </form>
    </div>
  );
};

export default UpdateSpot;
