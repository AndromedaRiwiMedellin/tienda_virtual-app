const { useState } = React;

const createZones = (id, soldOut = false) => soldOut
  ? [
      { name: 'VIP', price: '$120', available: 0 },
      { name: 'Preferente', price: '$80', available: 0 },
      { name: 'General', price: '$45', available: 0 }
    ]
  : [
      { name: 'VIP', price: '$120', available: 4 + (id % 6) * 2 },
      { name: 'Preferente', price: '$80', available: 8 + (id % 5) * 3 },
      { name: 'General', price: '$45', available: 12 + (id % 7) * 4 }
    ];

const events = [
  { id: 1, category: 'Cine', name: 'Escape Nocturno', date: '2026-06-12', time: '20:30', room: 'Sala A', type: 'Película', poster: 'https://picsum.photos/seed/cine1/800/520', description: 'Thriller nocturno con atmósfera intensa, ideal para quienes buscan intriga y gran pantalla.', status: 'published', sales_start_at: '2026-05-01T09:00:00Z', sales_end_at: '2026-06-13T23:59:59Z', zones: createZones(1), link: 'https://example.com/eventos/escape-nocturno' },
  { id: 2, category: 'Cine', name: 'Amor en La Gran Ciudad', date: '2026-06-16', time: '18:00', room: 'Sala B', type: 'Romance', poster: 'https://picsum.photos/seed/cine2/800/520', description: 'Una historia romántica urbana con personajes entrañables y una banda sonora conmovedora.', status: 'published', sales_start_at: '2026-05-01T09:00:00Z', sales_end_at: '2026-06-17T23:59:59Z', zones: createZones(2), link: 'https://example.com/eventos/amor-gran-ciudad' },
  { id: 3, category: 'Cine', name: 'Aventura Espacial', date: '2026-06-18', time: '21:00', room: 'IMAX', type: 'Ciencia ficción', poster: 'https://picsum.photos/seed/cine3/800/520', description: 'Aventura espacial familiar con efectos visuales de alta calidad en formato gigante.', status: 'published', sales_start_at: '2026-05-01T09:00:00Z', sales_end_at: '2026-06-19T23:59:59Z', zones: createZones(3), link: 'https://example.com/eventos/aventura-espacial' },
  { id: 4, category: 'Cine', name: 'Noir Retro', date: '2026-06-21', time: '19:15', room: 'Sala C', type: 'Misterio', poster: 'https://picsum.photos/seed/cine4/800/520', description: 'Cine clásico renovado con estilo noir y un debate posterior sobre su trama.', status: 'published', sales_start_at: '2026-05-05T09:00:00Z', sales_end_at: '2026-06-22T23:59:59Z', zones: createZones(4), link: 'https://example.com/eventos/noir-retro' },
  { id: 5, category: 'Cine', name: 'Festival de Documentales', date: '2026-06-25', time: '17:30', room: 'Sala D', type: 'Documental', poster: 'https://picsum.photos/seed/cine5/800/520', description: 'Selección de documentales inspiradores con historias reales y poderosas.', status: 'published', sales_start_at: '2026-05-10T09:00:00Z', sales_end_at: '2026-06-26T23:59:59Z', zones: createZones(5), link: 'https://example.com/eventos/festival-documentales' },
  { id: 6, category: 'Cine', name: 'Animación Fantástica', date: '2026-06-29', time: '16:00', room: 'Sala A', type: 'Familiar', poster: 'https://picsum.photos/seed/cine6/800/520', description: 'Diversión para niños y adultos con personajes animados llenos de color.', status: 'draft', sales_start_at: '2026-06-20T09:00:00Z', sales_end_at: '2026-06-30T23:59:59Z', zones: createZones(6), link: 'https://example.com/eventos/animacion-fantastica' },
  { id: 7, category: 'Cine', name: 'Suspenso Urbano', date: '2026-06-11', time: '22:00', room: 'Sala B', type: 'Thriller', poster: 'https://picsum.photos/seed/cine7/800/520', description: 'Un thriller contemporáneo que atrapa al espectador con cada giro.', status: 'published', sales_start_at: '2026-05-01T09:00:00Z', sales_end_at: '2026-06-12T23:59:59Z', zones: createZones(7), link: 'https://example.com/eventos/suspenso-urbano' },
  { id: 8, category: 'Cine', name: 'Comedia Retro', date: '2026-06-20', time: '18:45', room: 'Sala C', type: 'Comedia', poster: 'https://picsum.photos/seed/cine8/800/520', description: 'Risas garantizadas con humor clásico y personajes inolvidables.', status: 'published', sales_start_at: '2026-05-08T09:00:00Z', sales_end_at: '2026-06-21T23:59:59Z', zones: createZones(8), link: 'https://example.com/eventos/comedia-retro' },
  { id: 9, category: 'Teatro', name: 'El Jardín Secreto', date: '2026-06-13', time: '19:00', room: 'Teatro Mayor', type: 'Drama', poster: 'https://picsum.photos/seed/teatro1/800/520', description: 'Obra dramática que explora secretos familiares con un montaje íntimo.', status: 'published', sales_start_at: '2026-05-01T09:00:00Z', sales_end_at: '2026-06-14T23:59:59Z', zones: createZones(9), link: 'https://example.com/eventos/el-jardin-secreto' },
  { id: 10, category: 'Teatro', name: 'Títeres de Noche', date: '2026-06-14', time: '15:00', room: 'Sala Familiar', type: 'Infantil', poster: 'https://picsum.photos/seed/teatro2/800/520', description: 'Función mágica para niños con marionetas y música en vivo.', status: 'published', sales_start_at: '2026-05-03T09:00:00Z', sales_end_at: '2026-06-15T23:59:59Z', zones: createZones(10), link: 'https://example.com/eventos/titeres-de-noche' },
  { id: 11, category: 'Teatro', name: 'Música y Memoria', date: '2026-06-16', time: '20:00', room: 'Teatro Principal', type: 'Musical', poster: 'https://picsum.photos/seed/teatro3/800/520', description: 'Viaje teatral con canciones en vivo y recuerdos que emocionan.', status: 'published', sales_start_at: '2026-05-01T09:00:00Z', sales_end_at: '2026-06-17T23:59:59Z', zones: createZones(11), link: 'https://example.com/eventos/musica-memoria' },
  { id: 12, category: 'Teatro', name: 'Comedia de Enredos', date: '2026-06-18', time: '18:30', room: 'Teatro Sala 2', type: 'Comedia', poster: 'https://picsum.photos/seed/teatro4/800/520', description: 'Obra ligera para disfrutar en pareja o con amigos.', status: 'published', sales_start_at: '2026-05-05T09:00:00Z', sales_end_at: '2026-06-19T23:59:59Z', zones: createZones(12), link: 'https://example.com/eventos/comedia-enredos' },
  { id: 13, category: 'Teatro', name: 'Shakespeare Moderno', date: '2026-06-24', time: '20:30', room: 'Teatro Alterno', type: 'Clásico', poster: 'https://picsum.photos/seed/teatro5/800/520', description: 'Una versión contemporánea y vibrante del clásico de Shakespeare.', status: 'published', sales_start_at: '2026-05-10T09:00:00Z', sales_end_at: '2026-06-25T23:59:59Z', zones: createZones(13), link: 'https://example.com/eventos/shakespeare-moderno' },
  { id: 14, category: 'Teatro', name: 'Teatro Musical', date: '2026-06-26', time: '21:00', room: 'Teatro Mayor', type: 'Musical', poster: 'https://picsum.photos/seed/teatro6/800/520', description: 'Producción grande con coreografías vibrantes y voces en vivo.', status: 'published', sales_start_at: '2026-05-12T09:00:00Z', sales_end_at: '2026-06-27T23:59:59Z', zones: createZones(14), link: 'https://example.com/eventos/teatro-musical' },
  { id: 15, category: 'Teatro', name: 'Monólogo de Vida', date: '2026-06-27', time: '19:45', room: 'Sala Intima', type: 'Monólogo', poster: 'https://picsum.photos/seed/teatro7/800/520', description: 'Relato íntimo en primera persona con protagonistas cercanos y directos.', status: 'published', sales_start_at: '2026-05-15T09:00:00Z', sales_end_at: '2026-06-28T23:59:59Z', zones: createZones(15), link: 'https://example.com/eventos/monologo-vida' },
  { id: 16, category: 'Teatro', name: 'Improvisación Total', date: '2026-06-28', time: '18:00', room: 'Teatro Alterno', type: 'Improvisación', poster: 'https://picsum.photos/seed/teatro8/800/520', description: 'Cada función es nueva: el público decide y los actores improvisan en vivo.', status: 'published', sales_start_at: '2026-05-08T09:00:00Z', sales_end_at: '2026-06-29T23:59:59Z', zones: createZones(16), link: 'https://example.com/eventos/improvisacion-total' },
  { id: 17, category: 'Conciertos', name: 'Noche de Rock', date: '2026-06-13', time: '22:30', room: 'Arena Central', type: 'Rock', poster: 'https://picsum.photos/seed/musica1/800/520', description: 'Concierto electrizante con bandas emergentes y energía total.', status: 'published', sales_start_at: '2026-05-01T09:00:00Z', sales_end_at: '2026-06-14T23:59:59Z', zones: createZones(17), link: 'https://example.com/eventos/noche-de-rock' },
  { id: 18, category: 'Conciertos', name: 'Jazz y Café', date: '2026-06-14', time: '20:00', room: 'Club Jazz', type: 'Jazz', poster: 'https://picsum.photos/seed/musica2/800/520', description: 'Noche íntima con jazz en vivo y ambiente elegante.', status: 'published', sales_start_at: '2026-05-01T09:00:00Z', sales_end_at: '2026-06-15T23:59:59Z', zones: createZones(18), link: 'https://example.com/eventos/jazz-y-cafe' },
  { id: 19, category: 'Conciertos', name: 'Pop Urbano', date: '2026-06-20', time: '19:30', room: 'Estadio 1', type: 'Pop', poster: 'https://picsum.photos/seed/musica3/800/520', description: 'Show pop moderno con coreografías y efectos visuales actuales.', status: 'published', sales_start_at: '2026-05-05T09:00:00Z', sales_end_at: '2026-06-21T23:59:59Z', zones: createZones(19), link: 'https://example.com/eventos/pop-urbano' },
  { id: 20, category: 'Conciertos', name: 'Festival Indie', date: '2026-06-22', time: '17:00', room: 'Parque del Arte', type: 'Indie', poster: 'https://picsum.photos/seed/musica4/800/520', description: 'Festival al aire libre con bandas independientes y ambiente libre.', status: 'published', sales_start_at: '2026-05-08T09:00:00Z', sales_end_at: '2026-06-23T23:59:59Z', zones: createZones(20), link: 'https://example.com/eventos/festival-indie' },
  { id: 21, category: 'Conciertos', name: 'Música Latina', date: '2026-06-23', time: '20:30', room: 'Plaza de la Cultura', type: 'Latino', poster: 'https://picsum.photos/seed/musica5/800/520', description: 'Ritmos latinos y baile con artistas invitados en vivo.', status: 'published', sales_start_at: '2026-05-10T09:00:00Z', sales_end_at: '2026-06-24T23:59:59Z', zones: createZones(21), link: 'https://example.com/eventos/musica-latina' },
  { id: 22, category: 'Conciertos', name: 'Electrónica Nocturna', date: '2026-06-24', time: '23:00', room: 'Club Neon', type: 'Electrónica', poster: 'https://picsum.photos/seed/musica6/800/520', description: 'Set electrónico con DJs y producción lumínica vibrante.', status: 'published', sales_start_at: '2026-05-12T09:00:00Z', sales_end_at: '2026-06-25T23:59:59Z', zones: createZones(22), link: 'https://example.com/eventos/electronica-nocturna' },
  { id: 23, category: 'Conciertos', name: 'Tributo Legendario', date: '2026-06-26', time: '21:00', room: 'Auditorio', type: 'Tributo', poster: 'https://picsum.photos/seed/musica7/800/520', description: 'Homenaje a éxitos clásicos con banda en vivo.', status: 'published', sales_start_at: '2026-05-15T09:00:00Z', sales_end_at: '2026-06-27T23:59:59Z', zones: createZones(23), link: 'https://example.com/eventos/tributo-legendario' },
  { id: 24, category: 'Conciertos', name: 'Ritmos del Mundo', date: '2026-06-27', time: '18:30', room: 'Teatro Abierto', type: 'Fusión', poster: 'https://picsum.photos/seed/musica8/800/520', description: 'Sonidos globales y artistas de diferentes países en un mismo escenario.', status: 'published', sales_start_at: '2026-05-15T09:00:00Z', sales_end_at: '2026-06-28T23:59:59Z', zones: createZones(24), link: 'https://example.com/eventos/ritmos-del-mundo' },
  { id: 25, category: 'Calle', name: 'Mercado Nocturno', date: '2026-06-13', time: '19:00', room: 'Plaza Central', type: 'Mercado', poster: 'https://picsum.photos/seed/calle1/800/520', description: 'Mercado urbano con puestos de comida, diseño y música al aire libre.', status: 'published', sales_start_at: '2026-05-01T09:00:00Z', sales_end_at: '2026-06-14T23:59:59Z', zones: createZones(25), link: 'https://example.com/eventos/mercado-nocturno' },
  { id: 26, category: 'Calle', name: 'Festival de Murales', date: '2026-06-15', time: '17:00', room: 'Barrio Creativo', type: 'Arte urbano', poster: 'https://picsum.photos/seed/calle2/800/520', description: 'Exhibición de murales en vivo con artistas locales y performances.', status: 'published', sales_start_at: '2026-05-03T09:00:00Z', sales_end_at: '2026-06-16T23:59:59Z', zones: createZones(26), link: 'https://example.com/eventos/festival-murales' },
  { id: 27, category: 'Calle', name: 'Carnaval de Barrio', date: '2026-06-17', time: '16:00', room: 'Avenida Principal', type: 'Cultural', poster: 'https://picsum.photos/seed/calle3/800/520', description: 'Carnaval callejero con comparsas, música y arte popular.', status: 'published', sales_start_at: '2026-05-08T09:00:00Z', sales_end_at: '2026-06-18T23:59:59Z', zones: createZones(27), link: 'https://example.com/eventos/carnaval-barrio' },
  { id: 28, category: 'Calle', name: 'Tardes de Circo', date: '2026-06-18', time: '17:30', room: 'Plaza Mayor', type: 'Circo', poster: 'https://picsum.photos/seed/calle4/800/520', description: 'Función de circo al aire libre con acróbatas y malabaristas.', status: 'published', sales_start_at: '2026-05-10T09:00:00Z', sales_end_at: '2026-06-19T23:59:59Z', zones: createZones(28), link: 'https://example.com/eventos/tardes-de-circo' },
  { id: 29, category: 'Calle', name: 'Cine al Parque', date: '2026-06-20', time: '20:00', room: 'Parque Verde', type: 'Cine al aire libre', poster: 'https://picsum.photos/seed/calle5/800/520', description: 'Proyección gratuita bajo las estrellas con ambiente familiar.', status: 'published', sales_start_at: '2026-05-12T09:00:00Z', sales_end_at: '2026-06-21T23:59:59Z', zones: createZones(29), link: 'https://example.com/eventos/cine-al-parque' },
  { id: 30, category: 'Calle', name: 'Batalla de Street Dance', date: '2026-06-22', time: '19:15', room: 'Plaza del Ritmo', type: 'Danza urbana', poster: 'https://picsum.photos/seed/calle6/800/520', description: 'Competencia de danza urbana con grupos de hip-hop y break dance.', status: 'published', sales_start_at: '2026-05-15T09:00:00Z', sales_end_at: '2026-06-23T23:59:59Z', zones: createZones(30, true), link: 'https://example.com/eventos/street-dance' }
];

const categories = ['Todo', 'Cine', 'Teatro', 'Conciertos', 'Calle'];

function parseDate(dateString) {
  return new Date(dateString);
}

function formatEventDate(dateString) {
  const date = parseDate(dateString);
  return {
    day: String(date.getDate()).padStart(2, '0'),
    month: date.toLocaleString('es-ES', { month: 'short' }).replace('.', ''),
  };
}

function isSoldOut(evento) {
  return evento.zones.every(zone => zone.available === 0);
}

function TubeletaApp() {
  const [activeCategory, setActiveCategory] = useState('Todo');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchDate, setSearchDate] = useState('Fecha');
  const [searchCity, setSearchCity] = useState('Bogotá');

  const now = new Date();
  const visibleEvents = events.filter(evento => {
    if (evento.status !== 'published') return false;
    const start = parseDate(evento.sales_start_at);
    const end = parseDate(evento.sales_end_at);
    return start <= now && now <= end;
  });

  const filteredEvents = activeCategory === 'Todo'
    ? visibleEvents
    : visibleEvents.filter(evento => evento.category === activeCategory);

  const displayEvents = filteredEvents.filter(evento => {
    const queryLower = searchQuery.trim().toLowerCase();
    if (!queryLower) return true;
    return evento.name.toLowerCase().includes(queryLower)
      || evento.description.toLowerCase().includes(queryLower)
      || evento.category.toLowerCase().includes(queryLower)
      || evento.room.toLowerCase().includes(queryLower);
  });

  const featuredEvents = displayEvents.slice(0, 2);
  const regularEvents = displayEvents.slice(2);

  const currentEvent = selectedEvent && visibleEvents.find(evento => evento.id === selectedEvent.id);

  return (
    <div className="tubeleta-shell">
      <header className="hero-shell">
        <div className="top-nav">
          <div className="brand-row">
            <div className="brand-logo-holder">
              <img className="brand-logo" src="./logo-orbix.png" alt="OrbiX logo" onError={(e) => { e.target.style.display = 'none'; }} />
              <div className="brand-labels">
                <strong>OrbiX</strong>
                <span>El centro de tus eventos</span>
              </div>
            </div>
            <nav className="main-menu">
              <a href="#">Conciertos</a>
              <a href="#">Teatro</a>
              <a href="#">Deportes</a>
              <a href="#">Ventas a empresas</a>
              <a href="#">Más</a>
            </nav>
          </div>
          <div className="top-actions">
            <a href="#">Bono Regalo</a>
            <a href="#">Pásala</a>
            <a href="#">Contáctanos</a>
            <button className="pass-button">Tuboleta Pass</button>
          </div>
        </div>

        <div className="search-panel">
          <div className="search-filters">
            <button className="search-pill"><span>Ciudad</span><strong>{searchCity}</strong></button>
            <button className="search-pill"><span>Categoría</span><strong>{activeCategory}</strong></button>
            <button className="search-pill"><span>Fecha</span><strong>{searchDate}</strong></button>
          </div>

          <div className="search-input-wrap">
            <div className="search-icon">🔍</div>
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar por artista, evento..."
            />
            <button className="search-cta">Buscar</button>
          </div>
        </div>
      </header>

      <div className="portal-info highlight">
        <strong>Destacados</strong>
        <p>Explora los mejores eventos con filtros rápidos y entradas disponibles ahora mismo.</p>
      </div>

      <nav className="category-bar">
        {categories.map(category => (
          <button
            key={category}
            className={category === activeCategory ? 'category pill active' : 'category pill'}
            onClick={() => {
              setActiveCategory(category);
              setSelectedEvent(null);
            }}
          >
            {category}
          </button>
        ))}
      </nav>

      {currentEvent ? (
        <section className="detail-view">
          <button className="back-button" onClick={() => setSelectedEvent(null)}>← Volver a la cartelera</button>
          <article className="detail-card">
            <div className="detail-poster" style={{ backgroundImage: `url(${currentEvent.poster})` }}>
              <div className="detail-badge">{currentEvent.type}</div>
              {isSoldOut(currentEvent) && <div className="sold-out-badge">Agotado</div>}
            </div>
            <div className="detail-content">
              <div className="detail-topline">
                <span className="detail-category">{currentEvent.category}</span>
                <span className="detail-room">{currentEvent.room}</span>
              </div>
              <h1>{currentEvent.name}</h1>
              <p className="detail-datetime">{currentEvent.date} · {currentEvent.time}</p>
              <p className="detail-description">{currentEvent.description}</p>

              <div className="zones-section">
                <div className="zones-title">
                  <h2>Zonas y disponibilidad</h2>
                  {isSoldOut(currentEvent)
                    ? <span className="zone-status sold">Este evento está agotado</span>
                    : <span className="zone-status available">Hay asientos disponibles</span>
                  }
                </div>
                <div className="zone-grid">
                  {currentEvent.zones.map(zone => (
                    <div key={zone.name} className="zone-card">
                      <div className="zone-name">{zone.name}</div>
                      <div className="zone-price">{zone.price}</div>
                      <div className={`zone-availability ${zone.available === 0 ? 'empty' : 'stock'}`}>
                        {zone.available === 0 ? 'Agotado' : `${zone.available} asientos`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button className="buy-button" disabled={!isAuthenticated || isSoldOut(currentEvent)}>
                Comprar entradas
              </button>
              <p className="buy-note">
                {isSoldOut(currentEvent)
                  ? 'No hay disponibilidad. El evento está agotado.'
                  : isAuthenticated
                    ? 'Puedes comprar entradas con tu sesión activa.'
                    : 'Inicia sesión para activar el botón de compra.'
                }
              </p>
            </div>
          </article>
        </section>
      ) : (
        <>
          <section className="featured-section">
            <div className="section-header">
              <div>
                <span className="section-label">Destacados</span>
                <h2>Eventos con mayor demanda</h2>
              </div>
              <p>Recomendados por su popularidad y disponibilidad inmediata.</p>
            </div>
            <div className="featured-grid">
              {featuredEvents.map(evento => {
                const eventDate = formatEventDate(evento.date);
                return (
                  <article key={evento.id} className="featured-card" onClick={() => setSelectedEvent(evento)}>
                    <div className="featured-image" style={{ backgroundImage: `url(${evento.poster})` }}>
                      <div className="featured-chip">{evento.category}</div>
                      <div className="featured-date">
                        <span>{eventDate.day}</span>
                        <small>{eventDate.month}</small>
                      </div>
                    </div>
                    <div className="featured-content">
                      <span className="featured-type">{evento.type}</span>
                      <h3>{evento.name}</h3>
                      <div className="featured-meta">
                        <span>{evento.room}</span>
                        <span>{evento.time}</span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <main className="event-grid">
            {displayEvents.length === 0 ? (
              <div className="empty-state">No hay eventos publicados con venta activa en este momento.</div>
            ) : (
              regularEvents.map(evento => {
                const eventDate = formatEventDate(evento.date);
                return (
                  <article key={evento.id} className="event-card" onClick={() => setSelectedEvent(evento)}>
                    <div className="event-image" style={{ backgroundImage: `url(${evento.poster})` }}>
                      <div className="event-date-badge">
                        <span className="event-date-day">{eventDate.day}</span>
                        <span className="event-date-month">{eventDate.month}</span>
                      </div>
                      <span className={`event-chip event-chip-${evento.category.toLowerCase()}`}>{evento.type}</span>
                    </div>
                    <div className="event-body">
                      <h2>{evento.name}</h2>
                      <div className="event-meta">
                        <span><strong>Sala</strong> {evento.room}</span>
                        <span><strong>Hora</strong> {evento.time}</span>
                        <span><strong>Fecha</strong> {evento.date}</span>
                      </div>
                      <button className="details-button" type="button">Ver información completa</button>
                    </div>
                  </article>
                );
              })
            )}
          </main>
        </>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<TubeletaApp />);
