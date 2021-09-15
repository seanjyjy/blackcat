import axios from "axios";
import type { CommentDetails, DataProps, QueryParamsProps } from "../types";

export const apiFetchAuthentication = async (): Promise<{
  data: { success: boolean; name: string; avatar: string } | null;
  err: boolean | null;
}> => {
  try {
    const res = await axios.get("http://localhost:5000/api/authentication", {
      withCredentials: true,
    });
    return { data: res.data, err: null };
  } catch (err) {
    return { data: null, err: true };
  }
};

export const apiFetchPosts = async (
  page: number,
  queryParams?: QueryParamsProps
): Promise<{
  data: { table: DataProps[]; total: number } | null;
  err: boolean | null;
}> => {
  try {
    let url = `http://localhost:5000/api/posts/?page=${page}`;
    if (queryParams) {
      if (queryParams.sDate && queryParams.eDate) {
        url = `${url}&sDate=${queryParams.sDate}&eDate=${queryParams.eDate}`;
      }
      if (queryParams.chn) {
        url = `${url}&chn=${queryParams.chn}`;
      }
    }

    const res = await axios.get(url);

    return { data: res.data, err: null };
  } catch (err) {
    return { data: null, err: true };
  }
};

export const apiFetchPost = async (
  uuid: string
): Promise<{
  data: DataProps | null;
  err: boolean | null;
}> => {
  try {
    const res = await axios.get(`http://localhost:5000/api/post/${uuid}`);

    return { data: res.data, err: null };
  } catch (err) {
    return { data: null, err: true };
  }
};

export const apiPostLogin = async (
  userName: string,
  password: string
): Promise<{
  data: { success: boolean; avatar: string } | null;
  err: boolean | null;
}> => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/login",
      {
        userName,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return { data: res.data, err: null };
  } catch (err) {
    return { data: null, err: true };
  }
};

// 0 refers to false (not going / not like), vice versa
export const apiPostUpdatePost = async (
  uuid: string,
  postObject: { like?: number; going?: number; comment?: CommentDetails }
): Promise<{
  data: { updatedObject: DataProps; uuid: string } | null;
  err: boolean | null;
}> => {
  try {
    const res = await axios.post(
      `http://localhost:5000/api/post/${uuid}`,
      postObject
    );

    return { data: res.data, err: null };
  } catch (err) {
    return { data: null, err: true };
  }
};
