export interface AuthenticationResponse {
  token: string;
  refreshToken: string;
  roles: string[];
}
