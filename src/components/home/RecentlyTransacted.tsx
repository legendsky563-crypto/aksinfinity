import Image from 'next/image';

export default function RecentlyTransacted() {
  const transacted = [
    {
      id: 1,
      title: 'Residential Plot • 120 sq.yd.',
      location: 'Holy Family Township, Greater Noida',
      image: '/images/real/gallery1.jpg',
    },
    {
      id: 2,
      title: 'Investment Plot • 200 sq.yd.',
      location: 'Garhi Saamstipur, Yamuna Expressway',
      image: '/images/real/project2.jpg',
    },
    {
      id: 3,
      title: 'Farmhouse Plot • 500 sq.yd.',
      location: 'Dudhola, Greater Noida',
      image: '/images/real/dhudhola_farmhouse.jpg',
    },
    {
      id: 4,
      title: 'Strategic Plot • 150 sq.yd.',
      location: 'Near Jewar Airport Corridor',
      image: '/images/real/jewar.jpg',
    },
  ];

  return (
    <section className="section" style={{ backgroundColor: 'var(--color-cream)' }}>
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">PROVEN TRACK RECORD</span>
          <h2 className="heading-2">Recently Transacted Plots</h2>
          <p className="body-lg">
            A selection of recent plots verified, registered, and handed over to proud investors and future homeowners.
          </p>
        </div>

        <div className="transacted-grid">
          {transacted.map((plot) => (
            <div key={plot.id} className="transacted-card">
              <Image 
                src={plot.image} 
                alt={plot.title} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              <div className="transacted-card-overlay">
                <span className="transacted-badge">Successfully Transacted</span>
                <h3 className="transacted-card-name">{plot.title}</h3>
                <p className="transacted-card-location">{plot.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
