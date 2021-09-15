import React, { useEffect, useRef } from "react";
import { useNestedState } from "../../../../hooks/useNestedState";

import { COMMENTS } from "../constants";

import ReplySvg from "../../../../images/reply.svg";

import { DataProps } from "../../../../types";

import styles from "./index.scss";

interface CommentsProps {
  post: DataProps;
  position: string;
  setSelectedTarget: React.Dispatch<React.SetStateAction<string>>;
}

const Comments = ({ post, setSelectedTarget, position }: CommentsProps) => {
  const reactivePost = useNestedState<DataProps>(post)[0];

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (position === COMMENTS) {
      scrollToBottom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reactivePost.chatsArray]);

  return (
    <div className={styles.comments}>
      {reactivePost.chatsArray
        .sort((a, b) => a.time - b.time)
        .map(data => (
          <div
            key={`${data.text}-${data.time}-${data.name}`}
            className={styles.comment}
          >
            <div className={styles.imgContainer}>
              <img src={data.avatar} alt="" />
            </div>
            <div className={styles.textContainer}>
              <div className={styles.header}>
                <div className={styles.nameDateTime}>
                  <span className={styles.name}>{data.name}</span>
                  <span className={styles.dateAndTime}>
                    {generateTimeText(data.time)}
                  </span>
                </div>
                <img
                  src={ReplySvg}
                  alt=""
                  onClick={() => setSelectedTarget(data.name)}
                />
              </div>
              <p className={styles.text}>{data.text}</p>
            </div>
          </div>
        ))}
      <div ref={messagesEndRef} className="messagesEndRef" />
    </div>
  );
};

export default Comments;

function generateTimeText(dateAndTime: number) {
  const diff = (Date.now() - dateAndTime) / 1000;
  // calculate (and subtract) whole days
  const days = Math.floor(diff / 86400);
  if (days >= 1) {
    return `${Math.floor(days)} days ago`;
  }

  // calculate (and subtract) whole hours
  const hours = Math.floor(diff / 3600) % 24;

  if (hours > 0) {
    return `${Math.floor(hours)} hours ago`;
  }

  const minutes = Math.floor(diff / 60);

  if (minutes > 0) {
    return `${Math.floor(minutes)} minutes ago`;
  }

  return `${Math.floor(diff)} seconds ago`;
}
