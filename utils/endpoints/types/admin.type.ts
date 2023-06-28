export type GetAdmins = {};
export type GetAdminsResponse = [
  {
    username: string;
    id: number;
  }
];

export type CreateAdmin = {
  username: string;
  password: string;
  election_id: number;
};

export type CreateAdminResponse = string;

export type DeleteAdmin = string;
