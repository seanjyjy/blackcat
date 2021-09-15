import React from "react";

import Divider from "../PartialDivider";

import styles from "./index.scss";

interface Props {
  children: JSX.Element;
  header: string;
}

const LeftTitleContainer = ({ children, header }: Props) => {
  return (
    <div className={styles.container}>
      <Divider />
      <div className={styles.header}>
        <div />
        <p>{header}</p>
      </div>
      {children}
    </div>
  );
};

export default LeftTitleContainer;
