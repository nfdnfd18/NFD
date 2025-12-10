// Small helper that centralizes social auth URLs and a popup opener.
// This is frontend-only UI helper — backend endpoints are required to complete OAuth flows.
export const providers = {
  bsky: (window.__AUTH_URLS__ && window.__AUTH_URLS__.bsky) || 'https://bsky.app/',
  instagram: (window.__AUTH_URLS__ && window.__AUTH_URLS__.instagram) || 'https://www.instagram.com/accounts/login/',
  facebook: (window.__AUTH_URLS__ && window.__AUTH_URLS__.facebook) || 'https://www.facebook.com/login.php',
  google: (window.__AUTH_URLS__ && window.__AUTH_URLS__.google) || 'https://accounts.google.com/o/oauth2/v2/auth',
};

export function openAuthPopup(url, name = 'SocialLogin', width = 600, height = 700) {
  try {
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    const opts = `toolbar=no,menubar=no,width=${width},height=${height},top=${top},left=${left}`;
    const win = window.open(url, name, opts);
    if (!win) {
      alert('Popup blocked. Please allow popups for this site.');
      return null;
    }
    win.focus();
    return win;
  } catch (e) {
    console.error('openAuthPopup error', e);
    return null;
  }
}
