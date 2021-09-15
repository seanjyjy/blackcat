import React from "react";
import { useDispatch } from "react-redux";
import { useNestedState } from "../../../hooks/useNestedState";

import { updatePost } from "../../../store/posts/actions";

import styles from "./index.scss";

interface ControlProps {
  imgUrl: string;
  selectedText: string;
  text: string;
  num: number;
  selectedImg: string;
  uuid: string;
  id: number; // represents whether it is like (1) or going (0)
  isLike?: boolean;
  isGoing?: boolean;
  style?: React.CSSProperties;
}

const Control = ({
  imgUrl,
  selectedText,
  text,
  num,
  selectedImg,
  uuid,
  id,
  isLike,
  isGoing,
  style = {},
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
    <div className={styles.control} onClick={handleClick} style={style}>
      <img src={selected ? selectedImg : imgUrl} alt="icon" />
      <p>{`${selected ? selectedText : `${num} ${text}`}`}</p>
    </div>
  );
};

export default Control;
