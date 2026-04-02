import React from 'react';

const Products = () => {
  const services = [
    { id: 1, name: 'Web Development', desc: 'Custom website solutions.' },
    { id: 2, name: 'UI/UX Design', desc: 'Beautiful user interfaces.' },
    { id: 3, name: 'SEO Optimization', desc: 'Boost your search ranking.' }
  ];

  return (
    <div className="page-container">
      <h1>Our Product & Services</h1>
      <div className="grid">
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