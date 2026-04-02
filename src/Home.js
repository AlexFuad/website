import React from 'react';

const Home = () => {
  return (
    <div className="page-container">
      <h1>Hi, We are Caniel. Your Digital Solution Partner.</h1>
      <p>We craft modern, responsive, and user-friendly digital solutions that drive growth and innovation for your business.</p>
      <p>From custom web development to intuitive UI/UX design and powerful cloud solutions, we're here to turn your vision into reality.</p>
      <div style={{ marginTop: '30px' }}>
        <a href="/products" className="form-button" style={{ marginRight: '15px' }}>Explore Our Work</a>
        <a href="/contact" className="action-button edit-button">Get in Touch</a>
      </div>
      <h2 style={{ marginTop: '60px', marginBottom: '30px', color: 'var(--secondary-color)' }}>Our Core Expertise</h2>
      <div className="grid">
        <div className="card">
          <h3>Web Development</h3>
          <p>Building robust and scalable web applications.</p>
        </div>
        <div className="card">
          <h3>UI/UX Design</h3>
          <p>Crafting intuitive and engaging user experiences.</p>
        </div>
        <div className="card">
          <h3>Cloud Solutions</h3>
          <p>Leveraging cloud power for efficiency and scalability.</p>
        </div>
        <div className="card">
          <h3>SEO Optimization</h3>
          <p>Boosting your online visibility and organic traffic.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;