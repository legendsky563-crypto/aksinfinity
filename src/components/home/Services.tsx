export default function Services() {
  const services = [
    {
      num: '01',
      title: 'PLOT ACQUISITION',
      desc: 'Find the right plot with dedicated advisory. We help you select prime sizes based on location, budget, and long-term appreciation potential.',
    },
    {
      num: '02',
      title: 'INVESTMENT ADVISORY',
      desc: 'Strategic land investment blueprints. Capitalize on high-growth nodes like Jewar Airport and Yamuna Expressway with calculated entry points.',
    },
    {
      num: '03',
      title: 'REGISTRY & TITLE SUPPORT',
      desc: 'Hassle-free documentation and official registry handling. We coordinate all legal paperwork and sub-registrar formalities.',
    },
    {
      num: '04',
      title: 'ON-SITE GUIDED TOURS',
      desc: 'Personalized site visits across Greater Noida, Dudhola Farm House, and Holy Family Township with land specialists.',
    },
    {
      num: '05',
      title: 'RESALE & LIQUIDATION',
      desc: 'Monetize existing plots at optimal valuation. We connect your land holding directly with vetted and motivated cash buyers.',
    },
    {
      num: '06',
      title: 'DUE DILIGENCE & VERIFICATION',
      desc: 'Comprehensive title searches, encumbrance verifications, and master-plan zoning checks prior to any transaction commitment.',
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">WHAT WE DELIVER</span>
          <h2 className="heading-2">Bespoke Plot Services</h2>
          <p className="body-lg">
            Complete institutional-grade advisory for land buyers, residential builders, and wealth-building real estate investors.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div key={service.num} className="service-card">
              <span className="service-card-number">{service.num}</span>
              <h3 className="service-card-title">{service.title}</h3>
              <p className="service-card-desc">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
