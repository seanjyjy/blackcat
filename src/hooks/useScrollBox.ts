import React, { useState, useEffect, useCallback, useMemo } from "react";
import throttle from "lodash/throttle";

// credits from https://github.com/murilovarela/easy-scroll-box/blob/master/src/components/useScrollBox.js

const timing = (1 / 60) * 1000;
const decay = (v: number) => -0.1 * ((1 / timing) ^ 4) + v;

function useScrollBox(scrollRef: React.RefObject<HTMLDivElement>) {
  const [clickStartX, setClickStartX] = useState<number | undefined>();
  const [scrollStartX, setScrollStartX] = useState<number | undefined>();
  const [isDragging, setIsDragging] = useState(false);
  const [direction, setDirection] = useState(0);
  const [momentum, setMomentum] = useState(0);
  const [lastScrollX, setLastScrollX] = useState(0);
  const [speed, setSpeed] = useState(0);

  const scrollWrapperCurrent = scrollRef.current;
  const fnLastScrollX = useCallback(
    screenX => {
      setLastScrollX(screenX);
    },
    [setLastScrollX]
  );
  const handleLastScrollX = useMemo(
    () => throttle(fnLastScrollX, timing),
    [fnLastScrollX]
  );

  const fnMomentum = useCallback(
    nextMomentum => {
      setMomentum(nextMomentum);
      if (scrollRef.current) {
        scrollRef.current.scrollLeft =
          scrollRef.current.scrollLeft + nextMomentum * timing * direction;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setMomentum, direction, scrollRef, scrollWrapperCurrent]
  );
  const handleMomentum = useMemo(
    () => throttle(fnMomentum, timing),
    [fnMomentum]
  );

  useEffect(() => {
    if (direction !== 0) {
      if (momentum > 0.1 && !isDragging) {
        handleMomentum(decay(momentum));
      } else if (isDragging) {
        setMomentum(speed);
      } else {
        setDirection(0);
      }
    }
  }, [momentum, isDragging, speed, direction, handleMomentum]);

  useEffect(() => {
    if (scrollRef.current) {
      const handleDragStart = (e: MouseEvent) => {
        setClickStartX(e.screenX);
        if (scrollRef.current) {
          setScrollStartX(scrollRef.current.scrollLeft);
        }
        setDirection(0);
      };
      const handleDragMove = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (clickStartX !== undefined && scrollStartX !== undefined) {
          const touchDelta = clickStartX - e.screenX;
          if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollStartX + touchDelta;
          }

          if (Math.abs(touchDelta) > 1) {
            setIsDragging(true);
            setDirection(touchDelta / Math.abs(touchDelta));
            setSpeed(Math.abs((lastScrollX - e.screenX) / timing));
            handleLastScrollX(e.screenX);
          }
        }
      };
      const handleDragEnd = () => {
        if (clickStartX !== undefined) {
          setClickStartX(undefined);
          setScrollStartX(undefined);
          setIsDragging(false);
        }
      };

      if (scrollRef.current.ontouchstart === undefined) {
        scrollRef.current.onmousedown = handleDragStart;
        scrollRef.current.onmousemove = handleDragMove;
        scrollRef.current.onmouseup = handleDragEnd;
        scrollRef.current.onmouseleave = handleDragEnd;
      }
    }
  }, [
    scrollWrapperCurrent,
    scrollRef,
    clickStartX,
    isDragging,
    scrollStartX,
    handleLastScrollX,
    lastScrollX,
  ]);

  return {
    clickStartX,
    scrollStartX,
    isDragging,
    direction,
    momentum,
    lastScrollX,
    speed,
  };
}

export default useScrollBox;
