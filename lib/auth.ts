export const getUser = () => {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (!token || !user) return null;

  return {
    token,
    ...JSON.parse(user),
  };
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};
