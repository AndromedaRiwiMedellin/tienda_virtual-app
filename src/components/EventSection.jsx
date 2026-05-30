import EventCard from './EventCard.jsx';

export default function EventSection({
  title,
  subtitle,
  events,
  onOpen,
  featured = false,
  favoriteIds = [],
  onToggleFavorite
}) {
  return (
    <section className="event-section">
      <div className="section-heading">
        <div>
          <span>{subtitle}</span>
          <h2>{title}</h2>
        </div>
      </div>

      <div className={featured ? 'featured-grid' : 'events-grid'}>
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onOpen={onOpen}
            isFeatured={featured}
            isFavorite={favoriteIds.some((id) => String(id) === String(event.id))}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </section>
  );
}
