/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext();

function UploadWidget({ uwConfig, setPublicId, setState }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      const myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (error) {
            console.error("Upload error:", error); // Log the error for debugging
            alert("Failed to upload image. Please try again."); // Notify the user
            setState(null); // Reset the state
          } else if (result.event === "success") {
            console.log("Upload successful:", result.info); // Log the success response
            setState(result.info.secure_url); // Pass the uploaded image URL to the parent
          }
        }
      );
      myWidget.open();
    }
  };

  return (
    <button
      type="button"
      onClick={initializeCloudinaryWidget}
      className="cloudinary-button"
    >
      Upload Image
    </button>
  );
}

export default UploadWidget;
export { CloudinaryScriptContext };
