import API_BASE_URL from "./apiConfig";

export const createAlbum = async (selectedUserId: number, title: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/albums`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: selectedUserId,
        title: title,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create album");
    }

    const data = await response.json();
    console.log("Album created successfully:", data);
    return data;
  } catch (error) {
    console.error("Error creating album:", error);
    throw error;
  }
};
