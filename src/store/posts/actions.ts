import {
  apiFetchPosts,
  apiPostUpdatePost,
  apiFetchPost,
} from "../../api/endpoints";
import { createRequestTypes, actionCreator } from "../utils";

import type { CommentDetails, DataProps, QueryParamsProps } from "../../types";

export const FETCH_POSTS = createRequestTypes<
  void,
  { data: { table: DataProps[]; total: number } | null },
  void
>("FETCH_POSTS");

export const CLEAR_POSTS = actionCreator<void>(`CLEAR_POSTS`);

export const UPDATE_POST = createRequestTypes<
  { num?: number; going?: number },
  { updatedObject: DataProps; uuid: string } | null,
  void
>("UPDATE_POST");

export const FETCH_POST = createRequestTypes<
  void,
  { data: DataProps | null },
  void
>("FETCH_POST");

// probably need to think of how to typed it
export const fetchPosts = (page: number, queryParams?: QueryParamsProps) => {
  return async (dispatch: any) => {
    dispatch(FETCH_POSTS.REQUEST());

    const res = await apiFetchPosts(page, queryParams);
    const { data, err } = res;

    if (err) {
      dispatch(FETCH_POSTS.FAILURE());
    } else {
      dispatch(FETCH_POSTS.SUCCESS({ data }));
    }
    return res;
  };
};

export const clearPosts = () => {
  return (dispatch: any) => {
    dispatch(CLEAR_POSTS());
  };
};

export const updatePost = (
  uuid: string,
  postObject: { like?: number; going?: number; comment?: CommentDetails }
) => {
  return async (dispatch: any) => {
    dispatch(UPDATE_POST.REQUEST(postObject));

    const res = await apiPostUpdatePost(uuid, postObject);
    const { data, err } = res;
    if (err) {
      dispatch(UPDATE_POST.FAILURE());
    } else {
      dispatch(UPDATE_POST.SUCCESS(data));
    }
    return res;
  };
};

export const fetchPost = (uuid: string) => {
  return async (dispatch: any) => {
    dispatch(FETCH_POST.REQUEST());

    const res = await apiFetchPost(uuid);
    const { data, err } = res;
    if (err) {
      dispatch(FETCH_POST.FAILURE());
    } else {
      dispatch(FETCH_POST.SUCCESS({ data }));
    }
    return res;
  };
};
