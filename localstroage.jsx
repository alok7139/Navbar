function isQuotaError(err) {
  return err instanceof DOMException &&
    (err.name === 'QuotaExceededError' || err.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
     err.code === 22 || err.code === 1014);
}

function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    if (isQuotaError(err)) {
      // optional: free space by removing least important keys
      // localStorage.removeItem('allApplications');
      return false;
    }
    return false;
  }
}

function safeGetItem(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}




// constants for control
const ALL_APPS_KEY = 'allApplications';
const SINGLE_APP_KEY = 'creditCardApplication';
const MAX_ITEMS = 100; // cap the history list

function saveApprovedApp(parsed) {
  const approvedApp = {
    ...parsed,
    status: 'approved',
    completedAt: new Date().toISOString()
  };

  // store single latest snapshot
  safeSetItem(SINGLE_APP_KEY, approvedApp);

  // read current list safely
  const allApps = safeGetItem(ALL_APPS_KEY, []);

  // update or insert newest at front
  const idx = allApps.findIndex(app => app.id === approvedApp.id);
  if (idx >= 0) {
    allApps[idx] = approvedApp;
  } else {
    allApps.unshift(approvedApp);
  }

  // dedupe by id and cap size
  const seen = new Set();
  const deduped = [];
  for (const app of allApps) {
    if (!seen.has(app.id)) {
      seen.add(app.id);
      deduped.push(app);
    }
    if (deduped.length === MAX_ITEMS) break;
  }

  // final guarded write (returns false if storage full)
  const ok = safeSetItem(ALL_APPS_KEY, deduped);
  if (!ok) {
    // fallback: keep only the latest item if quota is tight
    safeSetItem(ALL_APPS_KEY, deduped.slice(0, 1));
  }
}