import React from "react";

import { formatISO } from "../../../../util";
import LeftTitleContainer from "../../../LeftTitleContainer";

import DateFromSvg from "../../../../images/date-from.svg";
import DateToSvg from "../../../../images/date-to.svg";

import { DataProps } from "../../../../types";

import styles from "./index.scss";

interface DateProps {
  post: DataProps;
}

const Date = ({ post }: DateProps) => {
  return (
    <LeftTitleContainer header="When">
      <div className={styles.date}>
        <div className={styles.dateAndTime}>
          <div className={styles.dateTop}>
            <img src={DateFromSvg} alt="left" />
            <p>{formatISO(post.startDate, "d mm y")}</p>
          </div>
          {format24hrs(post.startTime)}
        </div>
        <div className={styles.divider} />
        <div className={styles.dateAndTime}>
          <div className={styles.dateTop}>
            <img src={DateToSvg} alt="left" />
            <p>{formatISO(post.endDate, "d mm y")}</p>
          </div>
          {format24hrs(post.endTime)}
        </div>
      </div>
    </LeftTitleContainer>
  );
};

export default Date;

const format24hrs = (time: string | undefined) => {
  if (!time) return <div />;
  const timeArr = [time.substring(0, 2), time.substring(2)];
  if (+timeArr[0] >= 12) {
    timeArr.push("pm");
  } else {
    timeArr.push("am");
  }
  return (
    <div className={styles.time}>
      <p>{`${timeArr[0]}:${timeArr[1]}`}</p> <p>{timeArr[2]}</p>
    </div>
  );
};
