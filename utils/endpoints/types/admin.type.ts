export type GetAdmins = {};

export type GetAdminsResponse = {
  username: string;
  id: number;
}[];

export type CreateAdminData = {
  email: string;
  password: string;
  election_id: number;
  is_super: boolean;
};

export type CreateAdminResponse = string;

export type DeleteAdmin = string;
