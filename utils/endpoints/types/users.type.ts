export interface CreateUserData {
  email: string;
  password: string;
}

export interface CreateUserResponse {
  access_token: string;
  token_type: string;
}
