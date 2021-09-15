import React from "react";

import styles from "./index.scss";

interface NavMenuProps {
  onClick: () => void;
  leftImg: string;
  centerImg: string;
  rightImg: string;
}

// TO BE RENAME FOR ONCLICK FOR EACH ICON
const NavMenu = ({ onClick, leftImg, centerImg, rightImg }: NavMenuProps) => {
  return (
    <nav className={styles.navMenuContainer}>
      <div className={styles.navMenu}>
        <img src={leftImg} onClick={onClick} />
        <img src={centerImg} />
        <img src={rightImg} />
      </div>
    </nav>
  );
};

export default NavMenu;
