import { csrfFetch } from "./csrf";

// Action Types
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

// Action Creators
const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

// Thunk for Logging In
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({ credential, password }), // Include `credential` and `password`
  });

  if (response.ok) {
    const data = await response.json();
    console.log("User:", user); // Log user data
    dispatch(setUser(data.user)); // Dispatch the user data
    return user; // Return user for potential use
  } else {
    const errors = await response.json();
    console.error("Errors:", errors); // Log errors
    throw errors; // Handle errors appropriately
  }
};

// Initial State
const initialState = {
  user: null,
};

// Export the reducer as default
const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

// ...
export const signup = (user) => async (dispatch) => {
  const { username, firstName, lastName, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      firstName,
      lastName,
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};
// ...

// ...
export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return response;
};
// ...

// Export the thunk action
// export { login };

// Export the reducer as the default export
export default sessionReducer;
