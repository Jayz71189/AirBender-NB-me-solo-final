import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
// import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
import { Link } from "react-router-dom";
import { logout } from "../../store/session";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const dropDownMenu = useRef();

  const closeMenu = () => setShowMenu(false);

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
    // if (!showMenu) setShowMenu(true);
    setShowMenu((prevState) => !prevState);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!dropDownMenu?.current?.contains(e.target)) setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    closeMenu();
  };

  const dropDownClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <div className="logo">
        <Link to="/">
          <img src="/png.webp" alt="App Logo" className="logo-img" />
        </Link>
      </div>
      <button onClick={toggleMenu}>
        {showMenu && user.username}
        <FaUserCircle />
      </button>
      <ul className={dropDownClassName} ref={dropDownMenu}>
        {user ? (
          <>
            <li className="greeting">Hello, {user.firstName}!</li>
            <li>{user.username}</li>

            <li>{user.email}</li>
            <li>
              <button className="logout" onClick={handleLogout}>
                Log Out
              </button>
            </li>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onButtonClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onButtonClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
// ...

// const Carrot = () => {
//   return (
//     <div style={{ color: "orange", fontSize: "100px" }}>
//       <FaCarrot />
//     </div>
//   );
// };

// export default Carrot;
