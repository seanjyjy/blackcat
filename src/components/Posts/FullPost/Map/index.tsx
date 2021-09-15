import React from "react";

import LeftTitleContainer from "../../../LeftTitleContainer";
import MapImg from "../../../../images/gmap.png";

import styles from "./index.scss";

const Map = () => {
  return (
    <LeftTitleContainer header="Where">
      <>
        <p className={styles.name}>Marina Bay Sands</p>
        <p className={styles.location}>10 Bayfront Ave, S018956</p>
        <img src={MapImg} alt="map" className={styles.map} />
      </>
    </LeftTitleContainer>
  );
};

export default Map;
