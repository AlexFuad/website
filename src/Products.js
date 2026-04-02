import React from 'react';

const Products = () => {
  const services = [
    { id: 1, name: 'Web Development', desc: 'From dynamic front-ends to robust back-ends, we build custom web applications tailored to your business needs, ensuring scalability and performance.' },
    { id: 2, name: 'UI/UX Design', desc: 'Creating intuitive, engaging, and aesthetically pleasing user interfaces that enhance user experience, drive conversions, and reflect your brand identity.' },
    { id: 3, name: 'SEO Optimization', desc: 'Improve your online visibility and drive organic traffic with our comprehensive search engine optimization strategies, including keyword research, on-page, and technical SEO.' },
    { id: 4, name: 'Mobile App Development', desc: 'Develop native or cross-platform mobile applications for iOS and Android, ensuring seamless performance, engaging user experiences, and broad market reach.' },
    { id: 5, name: 'Cloud Solutions', desc: 'Leverage the power of cloud computing with our expertise in AWS, Azure, and Google Cloud for scalable, secure, and cost-effective infrastructure management.' },
    { id: 6, name: 'Digital Marketing Strategy', desc: 'Crafting data-driven digital marketing strategies to reach your target audience, build brand awareness, and achieve your business objectives.' }
  ];

  return (
    <div className="page-container">
      <h1>Our Products & Services</h1>
      <p>At Caniel, we offer a comprehensive suite of digital solutions designed to elevate your business and achieve your goals. Explore our core offerings below:</p>
      <div className="grid" style={{ marginTop: '40px' }}>
        {services.map(service => (
          <div key={service.id} className="card">
            <h3>{service.name}</h3>
            <p>{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;