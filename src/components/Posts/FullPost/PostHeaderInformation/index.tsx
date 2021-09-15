import React from "react";
import {
  differenceInHours,
  differenceInDays,
  differenceInMinutes,
  differenceInWeeks,
  differenceInYears,
  differenceInMonths,
  differenceInSeconds,
} from "date-fns";

import { DataProps } from "../../../../types";

import styles from "./index.scss";

interface PostHeaderInfoProps {
  post: DataProps;
}

const PostHeaderInformation = ({ post }: PostHeaderInfoProps) => {
  return (
    <div className={styles.container}>
      <p className={styles.channelName}>{post.channelName}</p>
      <p className={styles.title}>{post.title}</p>
      <div className={styles.profile}>
        <img src={post.avatar} alt="profile" />
        <div className={styles.profileInformation}>
          <p>{post.name}</p>
          <span>{`Published ${getTimeAgo(post.postDate)} ago`}</span>
        </div>
      </div>
    </div>
  );
};

export default PostHeaderInformation;

function getTimeAgo(time: string) {
  const today = new Date();
  const date = new Date(time);
  const diffYears = differenceInYears(today, date);
  if (diffYears >= 1) {
    return `${diffYears} years`;
  }

  const diffMonths = differenceInMonths(today, date);
  if (diffMonths >= 1) {
    return `${diffMonths} months`;
  }

  const diffWeeks = differenceInWeeks(today, date);
  if (diffWeeks >= 1) {
    return `${diffWeeks} weeks`;
  }

  const diffDays = differenceInDays(today, date);
  if (diffDays >= 1) {
    return `${diffDays} days`;
  }

  const diffHours = differenceInHours(today, date);
  if (diffHours >= 1) {
    return `${diffHours} hours`;
  }

  const diffMinutes = differenceInMinutes(today, date);
  if (diffMinutes >= 1) {
    return `${diffMinutes} minutes`;
  }

  let diffSec = differenceInSeconds(today, date);
  diffSec = diffSec < 0 ? 0 : diffSec;
  return `${diffSec} seconds`;
}
