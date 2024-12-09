import { csrfFetch } from "./csrf";

export const createReview = (spotId, reviewData) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewData),
  });

  if (response.ok) {
    const newReview = await response.json();
    dispatch(addReview(spotId, newReview));
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
};

const addReview = (spotId, review) => ({
  type: "ADD_REVIEW",
  spotId,
  review,
});

// Add logic in your reducer to handle "ADD_REVIEW".

export default createReview;
