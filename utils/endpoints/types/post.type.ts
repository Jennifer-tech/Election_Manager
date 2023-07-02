export type CreatePostData = {
  post: string;
  election_id: number;
};

export type CreatePostResponse = {
  post: string;
  election_id: number;
  id: number;
};
