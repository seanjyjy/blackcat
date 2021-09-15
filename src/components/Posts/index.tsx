import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import qs from "qs";
import isEqual from "lodash/isEqual";

import { fetchPosts, clearPosts } from "../../store/posts/actions";
import { RootState } from "../../store/root";

// might be able to use dynamic module import to optimize? TODO
import Search from "../Search";
import NavMenu from "../NavMenu";
import SearchResults from "./SearchResults";
import Post from "./Post";

import SearchSvg from "../../images/search.svg";
import CatSvg from "../../images/logo-cat.svg";
import NoActivitySvg from "../../images/no-activity.svg";

import styles from "./index.scss";

const Posts = () => {
  const { avatar } = useAuth();
  const dispatch = useDispatch();
  const location = useLocation<Location>();
  const history = useHistory();

  const posts = useSelector((state: RootState) => state.postsReducer.posts);
  const count = useSelector((state: RootState) => state.postsReducer.count);

  const blockRef = useRef<boolean>(false);
  const [queryParams, setQueryParams] = useState({});
  const [reset, setReset] = useState(false);
  const [page, setPage] = useState(0);
  const handleObserver = useCallback(entries => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage(prev => prev + 1);
    }
  }, []);
  const handleClearSearch = () => {
    setReset(true);
    setQueryParams({});
    setPage(0);
    history.replace("/posts");
  };

  const [searchOpen, setSearchOpen] = useState(false);
  const toggleSearchOpen = () => setSearchOpen(!searchOpen);

  // hackish way to ensure synchrnous data flow (due to bad design initially)
  useEffect(() => {
    if (history.action === "POP") {
      blockRef.current = true;
      setTimeout(() => {
        blockRef.current = false;
      }, 1000);
      const id = sessionStorage.getItem("id");
      if (id) {
        const p = document.querySelector(`.id-${id}`);
        p?.scrollIntoView({
          block: "center",
          inline: "nearest",
          behavior: "smooth",
        });
        sessionStorage.removeItem("id");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (reset) {
      dispatch(clearPosts());
    }

    // checks if came back from previous page so dont fetch
    if (!blockRef.current) {
      dispatch(fetchPosts(page, queryParams));
      setReset(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page, queryParams]);

  useEffect(() => {
    const search = location.search || {};
    if (!isEqual(search, {})) {
      const params = qs.parse(search, { ignoreQueryPrefix: true });
      setQueryParams(params);
      setPage(0);
      setReset(true);
    }
  }, [dispatch, location.search]);

  const reference = useCallback(
    node => {
      if (node !== null) {
        const option = {
          root: null,
          rootMargin: "20px",
          threshold: 0,
        };
        const observer = new IntersectionObserver(handleObserver, option);
        observer.observe(node);
      }
    },
    [handleObserver]
  );

  const isSearching = !!location.search;

  return (
    <div className={styles.home}>
      {searchOpen && <Search setSearchOpen={setSearchOpen} />}
      <div
        style={{
          minWidth: "100%",
          overflowY: searchOpen ? "hidden" : "auto",
          height: "100vh",
        }}
      >
        <NavMenu
          onClick={toggleSearchOpen}
          leftImg={SearchSvg}
          centerImg={CatSvg}
          rightImg={avatar}
        />

        {isSearching && (
          <SearchResults count={count} onClick={handleClearSearch} />
        )}
        {count === 0 ? (
          <div className={styles.emptySearchResult}>
            <img src={NoActivitySvg} alt="" />
            <p>No activity found</p>
          </div>
        ) : (
          <div className="test">
            {posts.map(data => (
              <Post data={data} key={data.uuid} />
            ))}
            <div ref={reference} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;
