import { Action, isType } from "../utils";
import {
  CLEAR_POSTS,
  FETCH_POST,
  FETCH_POSTS,
  UPDATE_POST,
} from "../posts/actions";
import type { DataProps } from "../../types";

interface InitialState {
  posts: DataProps[];
  count: number;
  post: DataProps | null;
}

const initialState = {
  posts: [],
  count: 0,
  post: null,
};

const postsReducer = (
  state: InitialState = initialState,
  action: Action<any>
): InitialState => {
  if (isType(action, FETCH_POSTS.REQUEST)) {
    return {
      ...state,
      // can add loading nexttime
    };
  }

  if (isType(action, FETCH_POSTS.SUCCESS)) {
    return {
      ...state,
      posts: [...state.posts, ...(action.payload!.data?.table || [])],
      count: action.payload?.data?.total || 0,
    };
  }

  if (isType(action, FETCH_POSTS.FAILURE)) {
    return {
      ...state,
      // can add loading next time and some failue thing?
    };
  }

  if (isType(action, CLEAR_POSTS)) {
    return {
      ...state,
      posts: [],
      count: 0,
    };
  }

  if (isType(action, UPDATE_POST.SUCCESS)) {
    const newPosts = [...state.posts];
    const uuid = action.payload?.uuid;
    for (let i = 0; i < newPosts.length; i++) {
      if (newPosts[i].uuid === uuid) {
        newPosts[i] = action.payload?.updatedObject!;
        break;
      }
    }

    return {
      ...state,
      posts: newPosts,
      post: action.payload?.updatedObject!,
    };
  }

  if (isType(action, FETCH_POST.SUCCESS)) {
    return {
      ...state,
      post: action.payload?.data || null,
    };
  }

  return state;
};

export default postsReducer;
