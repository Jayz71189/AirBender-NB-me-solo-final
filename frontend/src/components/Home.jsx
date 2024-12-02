import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Spot Rental Platform!</h1>
      <nav>
        <ul>
          <li>
            <Link to="/spots">Explore Spots</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
