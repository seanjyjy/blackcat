import React from "react";
import { useHistory } from "react-router";

import Control from "../Control";

import { formatISO, truncateTextIfMoreThan300 } from "../../../util/";

import { DataProps } from "../../../types";

import TimeSvg from "../../../images/time.svg";
import CheckSvg from "../../../images/check.svg";
import CheckOutlinedSvg from "../../../images/check-outline.svg";
import LikeSvg from "../../../images/like.svg";
import LikeOutlinedSvg from "../../../images/like-outline.svg";

import styles from "./index.scss";

interface PostProps {
  data: DataProps;
}

const Post = ({ data }: PostProps) => {
  const history = useHistory();
  const handleNavigateToSinglePost = () => {
    history.push(`/post/${data.uuid}`);
    sessionStorage.setItem("id", data.uuid);
  };

  return (
    <div className={`id-${data.uuid}`}>
      <div className={styles.post} onClick={handleNavigateToSinglePost}>
        <div className={styles.header}>
          <div className={styles.profile}>
            <img src={data.avatar} alt="img" />
            <span className={styles.userName}>{data.name}</span>
          </div>
          <div className={styles.channelName}>{data.channelName}</div>
        </div>
        <div className={styles.titleContainer}>
          <div className={styles.titleInformation}>
            <p>{data.title}</p>
            <div className={styles.date}>
              <img src={TimeSvg} alt="clock" />
              {`${formatISO(data.startDate, "d/m/y")} - ${formatISO(
                data.endDate,
                "d/m/y"
              )}`}
            </div>
          </div>
          {data.titleImg && (
            <img
              src={data.titleImg}
              alt="titleImg"
              className={styles.titleImage}
            />
          )}
        </div>
        <div className={styles.descriptionContainer}>
          <p className={styles.dataDescription}>
            {truncateTextIfMoreThan300(data.description)}
          </p>
          <div className={styles.controls}>
            <Control
              num={data.numGoing}
              imgUrl={CheckOutlinedSvg}
              selectedImg={CheckSvg}
              text="Going"
              selectedText="I am going"
              uuid={data.uuid}
              isLike={data.isGoing}
              id={0}
            />
            <Control
              num={data.likes}
              imgUrl={LikeOutlinedSvg}
              selectedImg={LikeSvg}
              text="Likes"
              selectedText="I like it"
              uuid={data.uuid}
              isGoing={data.isLike}
              id={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
