import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../../../../contexts/AuthContext";

import { updatePost } from "../../../../store/posts/actions";

import Control from "./Control";

import CommentSingleSvg from "../../../../images/comment-single.svg";
import LikeOutlinedPostSvg from "../../../../images/like-outline-post.svg";
import CheckOutliedPostSvg from "../../../../images/check-outline-post.svg";
import LikeControlSvg from "../../../../images/like-control.svg";
import CheckControlSvg from "../../../../images/check-control.svg";
import CrossSvg from "../../../../images/cross.svg";
import SendSvg from "../../../../images/send.svg";

import { DataProps } from "../../../../types";

import styles from "./index.scss";
interface BottomControlProps {
  uuid: string;
  post: DataProps;
  selectedTarget: string;
  setSelectedTarget: React.Dispatch<React.SetStateAction<string>>;
  setToastTriggered: React.Dispatch<React.SetStateAction<boolean>>;
}

const BottomControl = ({
  uuid,
  post,
  selectedTarget,
  setSelectedTarget,
  setToastTriggered,
}: BottomControlProps) => {
  const dispatch = useDispatch();
  const { name, avatar } = useAuth();

  const [message, setMessage] = useState(false);
  const handleToggleMessage = () => setMessage(!message);

  const [text, setText] = useState("");

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      updatePost(uuid, {
        comment: {
          name,
          avatar,
          text,
          time: Date.now(),
        },
      })
    );
    setText("");
    setSelectedTarget("");
    setToastTriggered(true);
    setTimeout(() => {
      setToastTriggered(false);
    }, 2000);
  };

  return (
    <>
      {message ? (
        <form className={styles.chat} onSubmit={handleOnSubmit}>
          <div className={styles.message}>
            <img src={CrossSvg} alt="" onClick={handleToggleMessage} />
            <input
              placeholder={
                selectedTarget
                  ? `@${selectedTarget}`
                  : "Leave your comment here"
              }
              className={styles.chatInput}
              value={text}
              onChange={e => setText(e.target.value)}
            />
          </div>
          <button className={styles.send}>
            <img src={SendSvg} alt="" />
          </button>
        </form>
      ) : (
        <div className={styles.bottomControl}>
          <div className={styles.likeAndComment}>
            <Control
              id={2}
              uuid={uuid}
              img={CommentSingleSvg}
              selectedImg={CommentSingleSvg}
              onClick={handleToggleMessage}
            />
            <Control
              id={1}
              uuid={uuid}
              img={LikeOutlinedPostSvg}
              selectedImg={LikeControlSvg}
              isLike={post.isLike}
            />
          </div>
          <Control
            id={0}
            uuid={uuid}
            img={CheckOutliedPostSvg}
            selectedImg={CheckControlSvg}
            isGoing={post.isGoing}
          />
        </div>
      )}
    </>
  );
};

export default BottomControl;
