import "./main.nfd";

// Load global CSS variables and @property definitions first to avoid
// invalid/duplicate @property warnings from component styles.
import "./src/styles/custom-properties.css";

// initialize translations

import "./src/assets/css/tailwind.css";
import "./src/assets/css/fonts.css";
import { generateAndStoreKeys } from './NFDLib/keysManager.js';

// add React identity logger
import './src/reactIdentityLogger.js';

// generate 20 encrypted values on first load (uses default passphrase)
(async () => {
	try {
		await generateAndStoreKeys('local-passphrase-1');
	} catch (e) {
		// ignore
	}
})();
