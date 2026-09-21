import Image from 'next/image';

export default function WhyChooseUs() {
  const features = [
    {
      num: '01',
      title: 'Registry-Ready Plots',
      desc: 'Clear titles, verified paperwork, and prompt registry execution with complete peace of mind.',
    },
    {
      num: '02',
      title: 'Verified Land Titles & Approvals',
      desc: 'Zero legal ambiguity. Every plot in our portfolio undergoes thorough due diligence before listing.',
    },
    {
      num: '03',
      title: 'Guided On-Site Inspections',
      desc: 'Complimentary private site tours from Delhi/NCR to Holy Family Township, Dudhola, and Yamuna Expressway.',
    },
    {
      num: '04',
      title: 'End-to-End Documentation & Support',
      desc: 'Complete assistance from land demarcation to mutation and municipal registration records.',
    },
  ];

  return (
    <section className="section" style={{ backgroundColor: 'var(--color-cream)' }}>
      <div className="container">
        <div className="why-section">
          <div className="why-image">
            <Image 
              src="/images/real/project1.jpg" 
              alt="AKS Infinity Real Plot Site Inspection" 
              width={600} 
              height={800} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div className="why-content">
            <span className="eyebrow">THE AKS INFINITY DIFFERENCE</span>
            <h2 className="heading-2">
              Land is Personal.<br />Our Approach is Too.
            </h2>
            <p className="body-lg">
              AKS Infinity offers an effective and affordable range of plot investments with verified capital appreciation. We guide you through every milestone — from choosing the right dimensions to the final registry seal.
            </p>

            <div className="why-features">
              {features.map((item) => (
                <div key={item.num} className="why-feature">
                  <span className="why-feature-number">{item.num}</span>
                  <div>
                    <h4 className="why-feature-text" style={{ fontSize: 'var(--text-lg)', marginBottom: '4px' }}>
                      {item.title}
                    </h4>
                    <p className="body-sm" style={{ color: 'var(--color-stone)', lineHeight: 1.6 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
