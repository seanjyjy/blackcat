import React, { useRef } from "react";
import useScrollBox from "../../hooks/useScrollBox";
import styles from "./index.scss";

type ScrollBoxProps<T> = {
  scrollItems: T[];
  renderItem: (item: T, index?: number) => React.ReactNode;
  children?: React.ReactNode;
};

const ScrollBox = <T,>({ scrollItems, renderItem }: ScrollBoxProps<T>) => {
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const { isDragging } = useScrollBox(scrollWrapperRef);

  return (
    <div className={styles.scrollBox}>
      <div className={styles.scrollBoxWrapper} ref={scrollWrapperRef}>
        <div
          className={styles.scrollBoxContainer}
          role="list"
          style={{ pointerEvents: isDragging ? "none" : undefined }}
        >
          {scrollItems.map((item, index) => {
            return (
              <div
                className={styles.scrollBoxContainerIcon}
                key={`sb-${index}`}
              >
                {renderItem(item, index)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScrollBox;
