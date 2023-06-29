export type CreateElectionData = {
  title: string;
};

export type CreateElectionResponse = {
  title: string;
  is_active: boolean;
  is_finished: boolean;
  id: number;
};

export type GetElectionsResponse = {
  title: string;
  is_active: boolean;
  is_finished: boolean;
  id: number;
}[];

export type GetAnElectionResponse = {};

export type UpdateAnElectionData = {
  title: string;
  is_active: boolean;
  is_finished: boolean;
};

export type UpdateAnElectionResponse = {
  title: string;
  is_active: boolean;
  is_finished: boolean;
  id: number;
};

export type DeleteAnElectionResponse = string;

export type ElectionParticipantsResponse = {
  title: string;
  is_active: boolean;
  is_finished: boolean;
  id: number;
  posts: {
    post: string;
    election_id: number;
    id: number;
    participants: {
      name: string;
      post_id: number;
      election_id: number;
      id: number;
      photo_url: string;
      votes: {
        id: number;
        post_id: number;
        participant_id: number;
        election_id: number;
      }[];
      total_votes: number;
    }[];
  }[];
};

export type ElectionResultsResponse = ElectionParticipantsResponse;
