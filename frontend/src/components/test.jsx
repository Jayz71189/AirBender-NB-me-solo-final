import { useState } from "react";
import OpenModalMenuItem from "./Navigation/OpenModalMenuItem";

function TestModal() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  return (
    <>
      <button onClick={toggleMenu}></button>
      {showMenu && <OpenModalMenuItem />}
    </>
  );
}

export default TestModal;
