import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { useModal } from "../../context/Modal";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  const { setModalContent } = useModal();

  return (
    <ul>
      {/* Logged-out View */}
      {!sessionUser ? (
        <div>
          <li onClick={() => setModalContent(<LoginFormModal />)}>
            {" "}
            &nbsp; Log In
          </li>
          <li onClick={() => setModalContent(<SignupFormModal />)}>
            {" "}
            &nbsp; Sign Up
          </li>
        </div>
      ) : (
        <>
          {/* Logged-in View */}

          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {sessionUser && (
            <>
              <li>
                <NavLink to="/spots/new">Create a New Spot</NavLink>
              </li>
              <li>
                <NavLink to="/spots/manage">Manage Spots</NavLink>
              </li>
            </>
          )}
          {/* Profile Button */}
          {isLoaded && (
            <li>
              <ProfileButton user={sessionUser} />
            </li>
          )}
        </>
      )}
    </ul>
  );
}

export default Navigation;
