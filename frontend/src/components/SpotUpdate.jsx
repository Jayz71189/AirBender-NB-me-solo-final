import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import ManageSpots from "./ManageSpots";
import { csrfFetch } from "../store/csrf";

const UpdateSpot = () => {
  const { spotId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    lat: 60,
    lng: 170,
    description: "",
    title: "",
    price: "",
    previewImage: "",
    imageUrls: ["", "", "", ""],
  });

  const [errors, setErrors] = useState({
    name: "",

    address: "",
    city: "",
    state: "",
    country: "",
    lat: "",
    lng: "",
    description: "",
    title: "",
    price: "",
    previewImage: "",
    imageUrls: ["", "", "", ""],
  });

  // useEffect(() => {
  //   // Fetch the spot data using the spotId
  //   const fetchSpot = async () => {
  //     const response = await fetch(`/api/spots/${spotId}`);
  //     const data = await response.json();
  //     setSpot(data);
  //     setFormData({
  //       name: data.name,
  //       description: data.description,
  //       price: data.price,
  //       city: data.city,
  //       state: data.state,
  //       country: data.country,
  //       imageUrl: data.imageUrl || "", // Handle optional imageUrl
  //     });
  //   };

  //   fetchSpot();
  // }, [spotId]);

  // Fetch current spot data
  useEffect(() => {
    const fetchSpot = async () => {
      try {
        const response = await csrfFetch(`/api/spots/${spotId}`);
        if (!response.ok) throw new Error("Failed to fetch spot details");
        const spotData = await response.json();

        setFormData({
          name: spotData.name || "",
          address: spotData.address || "",
          city: spotData.city || "",
          state: spotData.state || "",
          country: spotData.country || "",
          lat: spotData.lat || 60,
          lng: spotData.lng || 170,
          description: spotData.description || "",
          title: spotData.title || "",
          price: spotData.price || "",
          previewImage: spotData.previewImage || "",
          imageUrls: spotData.imageUrls || ["", "", "", ""],
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchSpot();
  }, [spotId]);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUrlChange = (e, index) => {
    const { value } = e.target;
    const updatedImageUrls = [...formData.imageUrls];
    updatedImageUrls[index] = value;
    setFormData({ ...formData, imageUrls: updatedImageUrls });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const newFormData = { ...formData };
      newFormData.price = Number(newFormData.price);
      const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFormData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }
      const updatedSpot = await response.json();
      if (!response.ok) {
        throw updatedSpot;
      }
      const updatedSpotId = updatedSpot.id; // Get the id of the created spot
      const spotImageResponse = await csrfFetch(
        `/api/spots/${updatedSpotId}/images`,
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

      navigate(`/spots/${updatedSpot.id}`);
    } catch (err) {
      console.error("Error updating spot:", err);
      setErrors({ general: "Failed to update the spot. Please try again." });
    }
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const updatedSpot = { ...formData };
  //   if (validateForm()) {
  //     try {
  //       const response = await fetch(`/api/spots/${spotId}`, {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(updatedSpot),
  //       });

  //       if (response.ok) {
  //         // Navigate to the updated spot's detail page
  //         navigate(`/spots/${spotId}`);
  //       } else {
  //         // Handle errors here (e.g., show an error message)
  //         const errorData = await response.json();
  //         alert(errorData.message || "Something went wrong");
  //       }
  //     } catch (error) {
  //       console.error("Error updating the spot:", error);
  //     }
  //   }
  // };

  // if (!spot) return <p>Loading...</p>;

  // const handleImageUrlChange = (e, index) => {
  //   const { value } = e.target;
  //   const updatedImageUrls = [...formData.previewImage];
  //   updatedImageUrls[index] = value;
  //   setFormData({
  //     ...formData,
  //     imageUrls: updatedImageUrls,
  //   });
  // };

  return (
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
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
          {errors.name && <div className="error">{errors.name}</div>}
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

export default UpdateSpot;
