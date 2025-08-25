// login request
export interface ILoginRequest {
  userName: string;
  passWord: string;
  faVerificationCode: string;
}

// login response
export interface ILoginResponse {
  id: string;
  accessToken: string;
  refreshToken: string;
  expired: number;
  expiredTime: string;
  refreshExpiredTime: string;
  userId: string;
  createAt: string;
  lastInvokeAt: string;
}
