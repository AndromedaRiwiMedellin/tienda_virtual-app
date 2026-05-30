import EventSection from '../components/EventSection.jsx';
import { isFavorite } from '../services/favoritesApi.js';

export default function FavoritesPage({ events, favoriteIds, onOpenEvent, onToggleFavorite }) {
  const savedEvents = events.filter((event) => isFavorite(favoriteIds, event.id));

  if (savedEvents.length === 0) {
    return (
      <section className="empty-state">
        <h2>You do not have favorite events yet.</h2>
        <p>Use the heart icon on an event card to save it here.</p>
      </section>
    );
  }

  return (
    <EventSection
      title="Favorite events"
      subtitle="Saved"
      events={savedEvents}
      onOpen={onOpenEvent}
      favoriteIds={favoriteIds}
      onToggleFavorite={onToggleFavorite}
    />
  );
}
