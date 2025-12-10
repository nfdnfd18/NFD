import apiRequest from "./apiRequest";

const chatLoader = async () => {
  try {
    const chatResponse = await apiRequest.get("/chats"); // Fetch chats
    const currentUserResponse = await apiRequest.get("/auth/current-user"); // Fetch current user

    if (!chatResponse || !chatResponse.data) {
      console.error("Chat API returned invalid response:", chatResponse);
      return { chatResponse: [], currentUser: currentUserResponse.data };
    }

    console.log("Loader Data from API:", {
      chatResponse: chatResponse.data,
      currentUser: currentUserResponse.data,
    }); // Debugging

    return {
      chatResponse: chatResponse.data,
      currentUser: currentUserResponse.data,
    };
  } catch (error) {
    console.error("Error in chatLoader:", error);
    return { chatResponse: [], currentUser: null }; // Return fallback data
  }
};

export { chatLoader };