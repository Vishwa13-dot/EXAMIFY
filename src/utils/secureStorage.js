import SecureLS from 'secure-ls';

let lsInstance = null;

try {
  lsInstance = new SecureLS({ encodingType: 'des', isCompression: false });
} catch (err) {
  console.warn('SecureLS initialization fallback to standard localStorage:', err);
  lsInstance = null;
}

/**
 * Save data securely to storage.
 * @param {string} key
 * @param {any} data
 */
export const setSecureData = (key, data) => {
  try {
    if (lsInstance) {
      lsInstance.set(key, data);
    } else {
      localStorage.setItem(`examify_${key}`, JSON.stringify(data));
    }
  } catch (err) {
    console.error(`Error writing secure data for key "${key}":`, err);
    try {
      localStorage.setItem(`examify_${key}`, JSON.stringify(data));
    } catch (e) {
      // Storage quota exceeded or blocked
    }
  }
};

/**
 * Get data securely from storage.
 * @param {string} key
 * @param {any} defaultValue
 */
export const getSecureData = (key, defaultValue = null) => {
  try {
    if (lsInstance) {
      const val = lsInstance.get(key);
      if (val !== null && val !== undefined && val !== '') {
        return val;
      }
    }
    const fallback = localStorage.getItem(`examify_${key}`);
    return fallback ? JSON.parse(fallback) : defaultValue;
  } catch (err) {
    try {
      const fallback = localStorage.getItem(`examify_${key}`);
      return fallback ? JSON.parse(fallback) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  }
};
