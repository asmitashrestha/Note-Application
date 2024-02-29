
export const validateToken = async () => {
  const response = await fetch(
    "http://localhost:5000/api/user/validate-token",
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Token Invalid!");
  }
  return response.json();
};

