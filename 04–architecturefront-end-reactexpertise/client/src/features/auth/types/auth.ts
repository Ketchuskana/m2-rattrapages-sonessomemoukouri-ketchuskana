export type LoginCredentials = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  admin: {
    id: number;
    email: string;
  };
};
