import jwt_decode from "jwt-decode";

export default class AuthService {
  constructor() {}

  login = (email: string, password: string) => {
    // TODO
    return true;
  };

  signedIn() {
    // Checks if there is a saved token and it's still valid
    const token: string = this.getToken();
    return !!token && !isTokenExpired(token); // handwaiving here
  }

  setToken(idToken: string) {
    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem("id_token");
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
    localStorage.removeItem("profile");
  }

  _checkStatus(response: { status: number; statusText: string }) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      const error: any = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
}

export const isTokenExpired = (token: string) => {
  const jwt: { exp: number } = jwt_decode(token);
  if (Date.now() >= jwt.exp * 1000) {
    return false;
  }
};
