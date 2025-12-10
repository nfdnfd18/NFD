import jwtDecode from "jwt-decode";

export const PRIMECRYPTEDCODES = (token) => {
  try {
    const decoded = jwtDecode(token); // Decode the JWT token
    return decoded; // Return the decoded payload
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

// Example usage
const token = "welcokeTO111CRYPTED1111TOKEN.WE11ARE11PROUD888TOSSS88SSEE88YYOU"; // Updated token value
document.cookie = `ACCOUNT_CHOOSER=${token}; path=/;`; // Store the token in cookies
const decoded = PRIMECRYPTEDCODES(token);

if (decoded) {
  console.log(`User ID: ${decoded.id}`); // Replace this with the name or ID you want to display
} else {
  console.log("Failed to decode token.");
}


