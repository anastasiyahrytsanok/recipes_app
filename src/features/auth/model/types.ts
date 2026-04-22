export type LoginRequest = {
  username: string;
  password: string;
  expiresInMins?: number;
};

export type AuthUser = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image?: string;
};

export type LoginResponse = AuthUser & {
  accessToken: string;
  refreshToken: string;
};

export type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
};
