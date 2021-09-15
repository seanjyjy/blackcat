import React from "react";

import { capitalizeFirstLetter } from "../../../../util";

import styles from "./index.scss";

interface TabProps {
  tabName: string;
  position: string;
  img: string;
  selectedImg: string;
}

const Tab = ({ tabName, position, img, selectedImg }: TabProps) => {
  const isSelected = tabName === position;

  const handleTabClick = () => {
    const destination = document.querySelector(`.${tabName}`)! as HTMLElement;
    window.scrollTo({
      top: destination.offsetTop - 90,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.tab} onClick={handleTabClick}>
      <img src={isSelected ? selectedImg : img} alt="" />
      <p style={{ color: isSelected ? "#AECB4F" : "#8C8C8C" }}>
        {capitalizeFirstLetter(tabName)}
      </p>
    </div>
  );
};

export default Tab;
