export type AuthState = {
  isSignin: boolean | string;
};

export type AuthAction = {
  type: string;
  payload: { status: boolean | string };
};

export type signupParams = {
  userName: string;
  email: string;
  password: string;
};
