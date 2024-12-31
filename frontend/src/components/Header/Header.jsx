// const Header = ({
//   loggedIn,
//   setShowLoginModal,
//   setShowSignupModal,
//   handleLogout,
// }) => {
//   return (
//     <header className="header">
//       <div className="logo">
//         <a href="/">AirBNB</a>
//       </div>
//       <div className="auth">
//         {!loggedIn ? (
//           <>
//             <button onClick={() => setShowLoginModal(true)}>Log in</button>
//             <button onClick={() => setShowSignupModal(true)}>Sign up</button>
//           </>
//         ) : (
//           <div className="user-menu">
//             <span>Hello, User!</span>
//             <button onClick={handleLogout}>Log out</button>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;

import { Link } from "react-router-dom";
import "./Header.css"; // For styling

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src="/png.webp" alt="App Logo" className="logo-img" />
        </Link>
      </div>
      <div className="auth-user">
        {/* Add buttons for auth and user navigation here */}
        <button>Login</button>
        <button>Profile</button>
      </div>
    </header>
  );
};

export default Header;
