const authUrl = "http://localhost:3003/api/v1/authenticate";

const AuthenticateToken = async (email: string, password: string) => {
  const basicToken = btoa(`${email}:${password}`);

  const response = await fetch(authUrl, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicToken}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

const RevokeToken = async (
  token: string | undefined,
  id: number | undefined
) => {
  await fetch(`${authUrl}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export default AuthenticateToken;
export { RevokeToken };
