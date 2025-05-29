const BASE_URL = "http://localhost:3000/api";

export const getRequests = async () => {
  const res = await fetch(`${BASE_URL}/requests`);
  return res.json();
};

export const updateRequestStatus = async (id: number) => {
  const res = await fetch(`${BASE_URL}/requests/${id}`, {
    method: "PATCH",
  });
  return res.json();
};
