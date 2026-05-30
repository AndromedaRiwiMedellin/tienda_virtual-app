const STORAGE_KEY = 'orbix_favorites';

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};
  } catch {
    return {};
  }
}

function writeAll(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getUserKey(user) {
  return user?.id ?? user?.email ?? '';
}

export function getFavoriteIds(user) {
  const key = getUserKey(user);
  if (!key) return [];
  return readAll()[key] ?? [];
}

export function isFavorite(user, eventId) {
  return getFavoriteIds(user).some((id) => String(id) === String(eventId));
}

export function toggleFavorite(user, eventId) {
  const key = getUserKey(user);
  if (!key) return getFavoriteIds(user);

  const all = readAll();
  const current = new Set((all[key] ?? []).map(String));
  const normalizedId = String(eventId);

  if (current.has(normalizedId)) {
    current.delete(normalizedId);
  } else {
    current.add(normalizedId);
  }

  all[key] = [...current];
  writeAll(all);
  return all[key];
}
