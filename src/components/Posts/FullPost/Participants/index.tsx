import React, { useMemo, useState } from "react";
import { useWindowSize } from "../../../../hooks/useWindowSize";

import Divider from "../../../PartialDivider";
import Control from "../../Control";

import CheckSvg from "../../../../images/check.svg";
import CheckOutlinedSvg from "../../../../images/check-outline.svg";
import LikeSvg from "../../../../images/like.svg";
import LikeOutlinedSvg from "../../../../images/like-outline.svg";
import ArrowDownSvg from "../../../../images/arrow-down.svg";

import { DataProps } from "../../../../types";

import styles from "./index.scss";

interface ParticipantsProps {
  uuid: string;
  post: DataProps;
}

const Participants = ({ uuid, post }: ParticipantsProps) => {
  const { width } = useWindowSize();

  const [expandGoing, setExpandGoing] = useState(false);
  const [expandLikes, setExpandLikes] = useState(false);
  const toggleExpandGoing = () => setExpandGoing(!expandGoing);
  const toggleExpandLikes = () => setExpandLikes(!expandLikes);

  const maxNumAvatars = useMemo(() => {
    const usuableWidth = width - 20 - 70 - 10 - 25;
    const max = Math.floor(usuableWidth / 36);
    return max;
  }, [width]);

  const isLikesLonger = post.likesArray.length > maxNumAvatars;
  const isGoingLonger = post.goingArray.length > maxNumAvatars;

  return (
    <div className={styles.avatarContainer}>
      <div className={styles.avatarRow}>
        <Control
          num={post.numGoing}
          imgUrl={CheckOutlinedSvg}
          selectedImg={CheckSvg}
          text="Going"
          selectedText="I am going"
          uuid={uuid}
          style={{ transform: "translate(5px, 5px)" }}
          id={0}
          isGoing={post.isGoing}
        />
        <div className={styles.avatars}>
          {(isGoingLonger && !expandGoing
            ? post.goingArray.slice(0, maxNumAvatars - 1)
            : post.goingArray
          ).map(x => (
            <img src={x} alt="a" key={x} className={styles.avatar} />
          ))}
          {isGoingLonger && (
            <img
              src={ArrowDownSvg}
              alt=""
              className={`${styles.expandMore} ${
                expandGoing ? styles.flipped : ""
              }`}
              onClick={toggleExpandGoing}
            />
          )}
        </div>
      </div>

      <Divider />

      <div className={styles.avatarRow}>
        <Control
          num={post.likes}
          imgUrl={LikeOutlinedSvg}
          selectedImg={LikeSvg}
          text="Likes"
          selectedText="I like it"
          style={{ transform: "translate(5px, 5px)" }}
          uuid={uuid}
          id={1}
          isLike={post.isLike}
        />
        <div className={styles.avatars}>
          {(isLikesLonger && !expandLikes
            ? post.likesArray.slice(0, maxNumAvatars - 1)
            : post.likesArray
          ).map(x => (
            <img src={x} alt="a" key={x} className={styles.avatar} />
          ))}
          {isLikesLonger && (
            <img
              src={ArrowDownSvg}
              alt=""
              className={`${styles.expandMore} ${
                expandLikes ? styles.flipped : ""
              }`}
              onClick={toggleExpandLikes}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Participants;
