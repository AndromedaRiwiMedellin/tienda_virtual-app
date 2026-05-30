import {
  getFavoriteIds as getStoredFavoriteIds,
  isFavorite as isStoredFavorite,
  toggleFavorite as toggleStoredFavorite
} from './favoritesStorage.js';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '/api').replace(/\/+$/, '');

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  });

  if (!response.ok) {
    let message = 'The request could not be completed.';
    try {
      const error = await response.json();
      message = error.detail ?? error.message ?? error.title ?? message;
    } catch {
      message = response.statusText || message;
    }
    throw new Error(message);
  }

  if (response.status === 204) return null;
  return response.json();
}

export function getFavoriteIds(user) {
  if (!user?.id && !user?.email) return Promise.resolve([]);

  const params = new URLSearchParams();
  if (user.id) params.set('userId', user.id);
  if (user.email) params.set('email', user.email);

  return request(`/favorites?${params.toString()}`)
    .then((events) => events.map((event) => event.id))
    .catch(() => getStoredFavoriteIds(user));
}

export function isFavorite(favoriteIds, eventId) {
  return favoriteIds.some((id) => String(id) === String(eventId));
}

export async function toggleFavorite(user, eventId, favoriteIds) {
  const currentlyFavorite = isFavorite(favoriteIds, eventId);
  const params = new URLSearchParams();
  if (user?.id) params.set('userId', user.id);
  if (user?.email) params.set('email', user.email);

  try {
    if (currentlyFavorite) {
      await request(`/favorites/${eventId}?${params.toString()}`, { method: 'DELETE' });
    } else {
      await request('/favorites', {
        method: 'POST',
        body: JSON.stringify({
          userId: user?.id,
          email: user?.email,
          eventId
        })
      });
    }
  } catch {
    // Backend may not expose /favorites yet; local storage still works
  }

  return toggleStoredFavorite(user, eventId);
}

export { isStoredFavorite };
