import axios from "axios";
import CryptoJS from 'crypto-js';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:2525/api";
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY || 'default-secret-key';

const decrypt = (encrypted) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch {
    return null;
  }
};

const apiRequest = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

apiRequest.interceptors.request.use(
  (config) => {
    try {
      const encryptedToken = localStorage.getItem("Love_wins_Whats_up_with_that");
      if (encryptedToken) {
        const decrypted = decrypt(encryptedToken);
        if (decrypted) {
          let tokenStr = decrypted;
          try {
            const parsed = JSON.parse(decrypted);
            if (parsed && parsed.token) tokenStr = parsed.token;
          } catch (e) {
            // decrypted isn't JSON, assume it's the raw token
          }
          if (tokenStr) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${tokenStr}`;
          }
        }
      }
    } catch (e) {
      // ignore and continue without Authorization
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const criticalTokens = [
        "Love_wins_Whats_up_with_that",
        "Log_in_with_love",
        "Silence_your_ads",
        "We_are_login_the_patch_notes",
        "Power_doesn't_sleep_fetchUser_",
        "The_now_and_the_never",
        "Legacy_whats_it_mean",
        "Joy_in_the_cracks",
        "Talk_back_to_the_past",
        "We_dont_sleep_we_dream",
        "The_questions_stay_louder",
        "We_made_it_this_far",
        "Can_a_moment_last",
      ];

      criticalTokens.forEach((key) => {
        try {
          localStorage.removeItem(key);
          // Remove cookie (note: HttpOnly cookies cannot be removed from JS)
          document.cookie = `${key}=; Max-Age=0; path=/;`;
        } catch (e) {}
      });

      if (window.location.pathname !== "/Login") {
        window.location.href = "/Login"; // Redirect to login
      }
    }
    return Promise.reject(error);
  }
);

export default apiRequest;
