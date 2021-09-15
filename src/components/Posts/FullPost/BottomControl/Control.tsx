import React from "react";
import { useDispatch } from "react-redux";
import { useNestedState } from "../../../../hooks/useNestedState";

import { updatePost } from "../../../../store/posts/actions";

import styles from "./index.scss";

interface ControlProps {
  text?: string;
  selectedText?: string;
  uuid: string;
  id: number; // represents whether it is like (1) or going (0) or comment (2)
  isLike?: boolean;
  isGoing?: boolean;
  img: string;
  selectedImg: string;
  onClick?: () => void;
}

const Control = ({
  uuid,
  id,
  isLike,
  isGoing,
  img,
  selectedImg,
  onClick,
}: ControlProps) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useNestedState<boolean>(
    isLike || isGoing || false
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setSelected(!selected);
    if (id === 0) {
      dispatch(
        updatePost(uuid, {
          going: +!selected,
        })
      );
    } else {
      dispatch(
        updatePost(uuid, {
          like: +!selected,
        })
      );
    }
    event.stopPropagation();
  };

  return (
    <>
      {id === 0 ? (
        <button className={styles.joinButton} onClick={handleClick}>
          <img src={selected ? selectedImg : img} alt="" />
          <p>{`${selected ? "I am going" : "Join"}`}</p>
        </button>
      ) : (
        <button
          className={styles.commentLikeButton}
          onClick={id === 1 ? handleClick : onClick}
        >
          <img src={selected ? selectedImg : img} alt="" />
        </button>
      )}
    </>
  );
};

export default Control;
