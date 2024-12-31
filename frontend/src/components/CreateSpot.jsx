import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { csrfFetch } from "../store/csrf";
import "./CreateSpot.css";

const CreateSpot = () => {
  const [formData, setFormData] = useState({
    // name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    lat: 60,
    lng: 170,
    description: "",
    name: "",
    price: "",
    previewImage: "",
    imageUrls: ["", "", "", ""],
  });

  const [errors, setErrors] = useState({
    // name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    lat: "",
    lng: "",
    description: "",
    name: "",
    price: "",
    previewImage: "",
    imageUrls: ["", "", "", ""],
  });

  const navigate = useNavigate();

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
    if (!formData.name) {
      validationErrors.name = "Title is required";
      isValid = false;
    }
    // if (!formData.name) {
    //   validationErrors.title = "Name is required";
    //   isValid = false;
    // }
    if (!formData.price) {
      validationErrors.price = "Price per night is required";
      isValid = false;
    }
    if (!formData.previewImage) {
      validationErrors.previewImage = "Preview Image URL is required";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Proceed with form submission logic (e.g., API request)
      try {
        // Sending form data to backend to create a new spot
        const newFormData = { ...formData };
        newFormData.price = Number(newFormData.price);
        const response = await csrfFetch("/api/spots", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newFormData),
        });

        const data = await response.json();
        if (!response.ok) {
          throw data;
        }

        const spotId = data.id; // Get the id of the created spot

        const spotImageResponse = await csrfFetch(
          `/api/spots/${spotId}/images`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: formData.previewImage, preview: true }),
          }
        );
        const imageData = await spotImageResponse.json();
        if (!spotImageResponse.ok) {
          throw imageData;
        }

        // Navigate to the new spot's detail page

        navigate(`/spots/${spotId}`);

        if (response.status === 403) {
          alert("You must be logged in to create a spot.");
        } else {
          console.error("Error creating spot");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUrlChange = (e, index) => {
    const { value } = e.target;
    const updatedImageUrls = [...formData.previewImage];
    updatedImageUrls[index] = value;
    setFormData({
      ...formData,
      imageUrls: updatedImageUrls,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="create-spot">Create a New Spot</div>
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
        {/* <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
          {errors.name && <div className="error">{errors.name}</div>}
        </div> */}
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
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name of your spot"
        />
        {errors.title && <div className="error">{errors.title}</div>}
      </section>

      <section>
        <h2>Set a base price for your spot</h2>
        <p>
          Competitive pricing can help your listing stand out and rank higher in
          search results.
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
          name="previewImage"
          value={formData.previewImage}
          onChange={handleChange}
          placeholder="Preview Image URL"
        />
        {errors.previewImage && (
          <div className="error">{errors.previewImage}</div>
        )}
        {formData.imageUrls.map((url, index) => (
          <input
            key={index}
            type="text"
            value={url}
            onChange={(e) => handleImageUrlChange(e, index)}
            placeholder="Image URL"
          />
        ))}
      </section>

      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateSpot;
