import Auth from "../models/Auth";

const getUser = () => {
  const loggedInUser = sessionStorage.getItem("CRAFTING_JOBS_AUTH");
  if (loggedInUser) {
    return JSON.parse(loggedInUser);
  } else {
    return false;
  }
};

const setUser = (user: Auth) => {
  sessionStorage.setItem("CRAFTING_JOBS_AUTH", JSON.stringify(user));
};

const deleteUser = () => {
  sessionStorage.removeItem("CRAFTING_JOBS_AUTH");
};

export default getUser;
export { setUser, deleteUser };
