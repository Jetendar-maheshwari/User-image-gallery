import API_BASE_URL from "./apiConfig";

export const createAlbum = (selectedUserId: number, title: string) => {
  return fetch(`${API_BASE_URL}/albums`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: selectedUserId,
      title: title,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to create album");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Album created successfully:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error creating album:", error);
      throw error;
    });
};
