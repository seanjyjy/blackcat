import React, { useCallback, useState, useRef, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useWindowSize } from "../../../hooks/useWindowSize";
import { useAuth } from "../../../contexts/AuthContext";

import { RootState } from "../../../store/root";
import { fetchPost } from "../../../store/posts/actions";

import NavMenu from "../../NavMenu";
import PostHeaderInformation from "./PostHeaderInformation";
import ScrollBox from "../../ScrollBox";
import Text from "./Text";
import Date from "./Date";
import Map from "./Map";
import Participants from "./Participants";
import Comments from "./Comments";
import Tabs from "./Tabs";
import BottomControl from "./BottomControl";

import { DETAILS, COMMENTS, PARTICIPANTS } from "./constants";

import HomeSvg from "../../../images/home.svg";
import CatSvg from "../../../images/logo-cat.svg";

import styles from "./index.scss";

const FullPost = () => {
  const { avatar } = useAuth();
  const dispatch = useDispatch();
  const history = useHistory();
  const { height } = useWindowSize();
  const { uuid } = useParams<{ uuid: string }>();

  const post = useSelector((state: RootState) => state.postsReducer.post);

  const [position, setPosition] = useState(DETAILS);
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const participantsRef = useRef<HTMLDivElement | null>(null);
  const commentsRef = useRef<HTMLDivElement | null>(null);
  const [selectedTarget, setSelectedTarget] = useState(""); // referring to the reply
  const [toastTriggered, setToastTriggered] = useState(false);

  useEffect(() => {
    dispatch(fetchPost(uuid));
  }, [dispatch, uuid]);

  const handleHomeClick = () => history.goBack();

  const handleObserver = useCallback(entries => {
    const target = entries[0];

    if (target.target.isEqualNode(participantsRef.current)) {
      setPosition(prev => {
        if (
          prev === DETAILS ||
          (prev === COMMENTS && target.intersectionRect.y !== 0)
        ) {
          return PARTICIPANTS;
        } else if (prev !== COMMENTS && target.intersectionRect.width === 0) {
          return DETAILS;
        }
        return prev;
      });
    } else if (target.target.isEqualNode(commentsRef.current)) {
      setPosition(prev => {
        if (prev === PARTICIPANTS) return COMMENTS;
        else if (prev === COMMENTS) return PARTICIPANTS;
        return prev;
      });
    } else if (target.target.isEqualNode(detailsRef.current)) {
      setPosition(prev => {
        if (prev === PARTICIPANTS && target.intersectionRect.y !== 0)
          return DETAILS;
        return prev;
      });
    }
  }, []);

  const overallRef = useCallback(
    node => {
      if (node !== null) {
        if (
          detailsRef.current &&
          participantsRef.current &&
          commentsRef.current
        ) {
          const option = {
            root: null,
            rootMargin: `0px 0px ${-height + 90}px 0px`,
            threshold: 0,
          };
          const observer = new IntersectionObserver(handleObserver, option);
          [detailsRef, participantsRef, commentsRef].forEach(x => {
            if (x.current) {
              observer.observe(x.current);
            }
          });
        }
      }
    },
    [handleObserver, height]
  );

  const arr = [
    "https://cdn.fakercloud.com/avatars/donjain_128.jpg",
    "https://cdn.fakercloud.com/avatars/xilantra_128.jpg",
    "https://cdn.fakercloud.com/avatars/sweetdelisa_128.jpg",
    "https://cdn.fakercloud.com/avatars/conspirator_128.jpg",
    "https://cdn.fakercloud.com/avatars/curiousoffice_128.jpg",
  ];

  if (!post || (post && post.uuid !== uuid)) {
    // suppose to be loading
    return <div />;
  }

  return (
    <div className={styles.parent}>
      <NavMenu
        onClick={handleHomeClick}
        leftImg={HomeSvg}
        centerImg={CatSvg}
        rightImg={avatar}
      />
      <PostHeaderInformation post={post} />

      <Tabs position={position} />

      <div ref={overallRef}>
        <div ref={detailsRef} className="details">
          <ScrollBox
            scrollItems={arr}
            renderItem={(item: string) => (
              <img src={item} alt="image" className={styles.scrollImages} />
            )}
          />
          <Text text={post.description} />
          <Date post={post} />
          <Map />
        </div>

        <div ref={participantsRef} className="participants">
          <Participants uuid={uuid} post={post} />
        </div>

        <div ref={commentsRef} className="comments">
          <Comments
            post={post}
            setSelectedTarget={setSelectedTarget}
            position={position}
          />
        </div>
      </div>

      <BottomControl
        uuid={uuid}
        post={post}
        selectedTarget={selectedTarget}
        setSelectedTarget={setSelectedTarget}
        setToastTriggered={setToastTriggered}
      />

      {toastTriggered && (
        <div className={styles.toast}>
          {"I am a toast :) Slide down & slide up"}
        </div>
      )}
    </div>
  );
};

export default FullPost;
