import { useState } from "react";
import OpenModalMenuItem from "./Navigation/OpenModalMenuItem";

function TestModal() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <button onClick={toggleMenu}>Toggle Menu</button>
      {showMenu && <OpenModalMenuItem />}
    </>
  );
}

export default TestModal;
