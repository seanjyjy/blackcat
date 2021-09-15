export interface DataProps {
  avatar: string;
  name: string;
  channelName: string;
  title: string;
  titleImg?: string;
  postDate: string;
  startDate: string;
  endDate: string;
  description: string;
  likes: number;
  numGoing: number;
  uuid: string;
  likesArray: string[];
  goingArray: string[];
  isLike: boolean;
  isGoing: boolean;
  startTime?: string;
  endTime?: string;
  chatsArray: CommentDetails[];
}
export interface QueryParamsProps {
  sDate?: string;
  eDate?: string;
  chn?: string;
}

export interface CommentDetails {
  avatar: string;
  name: string;
  text: string;
  time: number;
}
