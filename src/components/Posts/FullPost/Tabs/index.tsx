import React from "react";

import Tab from "./Tab";

import { DETAILS, PARTICIPANTS, COMMENTS } from "../constants";

import InfoSvg from "../../../../images/info.svg";
import InfoOutlinedSvg from "../../../../images/info-outline.svg";
import PeopleOutlinedSvg from "../../../../images/people-outline.svg";
import PeopleSvg from "../../../../images/people.svg";
import CommentSvg from "../../../../images/comment.svg";
import CommentOutlinedSvg from "../../../../images/comment-outline.svg";

import styles from "./index.scss";

interface TabsProps {
  position: string;
}

const Tabs = ({ position }: TabsProps) => {
  return (
    <div className={styles.tabContainer}>
      <Tab
        position={position}
        tabName={DETAILS}
        img={InfoOutlinedSvg}
        selectedImg={InfoSvg}
      />
      <Tab
        position={position}
        tabName={PARTICIPANTS}
        img={PeopleOutlinedSvg}
        selectedImg={PeopleSvg}
      />
      <Tab
        position={position}
        tabName={COMMENTS}
        img={CommentOutlinedSvg}
        selectedImg={CommentSvg}
      />
    </div>
  );
};

export default Tabs;
