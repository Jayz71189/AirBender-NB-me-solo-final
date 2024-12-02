import { useParams } from "react-router-dom";

const SpotDetail = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Spot Details for ID: {id}</h1>
      <p>Here you can display detailed information about the spot.</p>
    </div>
  );
};

export default SpotDetail;
