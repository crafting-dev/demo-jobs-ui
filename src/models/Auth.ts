type Auth = {
  token?: string;
  id?: number;
  name?: string;
  email?: string;
  type?: string;
  avatarUrl?: string;
  isAuthenticated?: boolean;
  redirectPath: string;
};

const unauthenticated: Auth = {
  redirectPath: "",
};

export default Auth;
export { unauthenticated };
