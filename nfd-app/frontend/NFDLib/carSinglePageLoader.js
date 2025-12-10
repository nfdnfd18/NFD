import { defer } from "react-router-dom";

export const carSinglePageLoader = async (args) => {
  try {
    const { carSinglePageLoader: loader } = await import("../../lib/carSinglePageLoader"); // Dynamically import the loader
    return loader(args); // Call the loader function with its arguments
  } catch (error) {
    console.error("Error dynamically loading carSinglePageLoader:", error.message || error);
    return defer({ carResponse: null });
  }
};
