import React, { useState } from "react";

import { truncateTextIfMoreThan300 } from "../../../../util";

import styles from "./index.scss";

const Text = ({ text }: { text: string }) => {
  const [viewAll, setViewAll] = useState(false);
  const toggleViewAll = () => setViewAll(!viewAll);

  return (
    <div className={styles.textContainer}>
      <p
        className={`${styles.text} ${
          viewAll ? styles.textGrey : styles.fadedGrey
        }`}
      >
        {viewAll ? text : truncateTextIfMoreThan300(text)}
      </p>
      <button onClick={toggleViewAll}>
        {viewAll ? "VIEW LESS" : "VIEW ALL"}
      </button>
    </div>
  );
};

export default Text;
