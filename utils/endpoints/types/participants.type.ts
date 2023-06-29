export type AddParticipants = {
  name: string;
  post_id: number;
  election_id: number;
};

export type AddParticipantsResponse = {
  name: string;
  post_id: number;
  election_id: number;
  id: number;
  photo_url: string;
};

export type uploadPhoto = {};
export type uploadPhotoResponse = string;

export type UpdateParticipants = {
  name: string;
  post_id: number;
  election_id: number;
};

export type UpdateParticipantsResponse = {
  name: string;
  post_id: number;
  election_id: number;
  id: number;
  photo_url: string;

};

export type DeleteAdmin = string;
