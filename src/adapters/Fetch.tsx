import { baseUrl } from "../models/Auth";

// Fetch a resource by type from path.
// Bearer authentication token needed.
const Fetch = async (
  path: string,
  method: string,
  token: string | undefined
) => {
  const response = await fetch(`${baseUrl}${path}`, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    const error = (data && data.message) || response.status;
    return Promise.reject(error);
  }

  return data;
};

// Create either Employer or Worker resources.
// Authentication not needed.
const Create = async (
  path: string,
  name: string,
  email: string,
  password: string,
  passwordConfirmation: string,
  otherKey: string,
  otherValue: string,
  objType: string,
  tags: string | false
) => {
  const response = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      [objType]: {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
        [otherKey]: otherValue,
        ...(tags && { tag_attributes: tags }),
      },
    }),
  });
  const data = await response.json();

  if (!response.ok) {
    const error = (data && data.message) || response.status;
    return Promise.reject(error);
  }

  return data;
};

export default Fetch;
export { Create };