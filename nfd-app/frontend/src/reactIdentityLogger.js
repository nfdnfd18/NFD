import React from 'react';

export default function ReactIdentityLogger() {
  // Log React version and identity info to help diagnose duplicate React instances
  try {
    // These internals may vary across React versions; this is a best-effort probe
    console.log('[ReactIdentityLogger] React.version =', React.version || 'unknown');

    // Log the React object itself (will show if multiple copies are present)
    console.log('[ReactIdentityLogger] React object:', React);

    // If React has a shared internals symbol, try to print it (best-effort)
    if (React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) {
      console.log('[ReactIdentityLogger] React internal shared subset FOUND');
    }
  } catch (e) {
    console.warn('[ReactIdentityLogger] Probe failed', e);
  }

  return null;
}
