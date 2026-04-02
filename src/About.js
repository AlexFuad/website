import React from 'react';

const About = () => {
  return (
    <div className="page-container">
      <h1>About Caniel</h1>
      <p>Caniel is a dedicated team of digital innovators, passionate about crafting robust and scalable digital solutions that empower businesses to thrive in the modern era.</p>
      <p>Our journey began with a shared fascination for how technology can solve real-world problems and drive meaningful impact. We believe in the power of clean code, intuitive design, and continuous improvement.</p>
      <h2 style={{ marginTop: '40px', marginBottom: '20px', color: 'var(--secondary-color)' }}>Our Vision</h2>
      <p>To be the leading digital partner, recognized for our innovative solutions, unwavering quality, and commitment to client success.</p>
      <h2 style={{ marginTop: '40px', marginBottom: '20px', color: 'var(--secondary-color)' }}>Our Core Values</h2>
      <div className="grid">
        <div className="card">
          <h3>Innovation</h3>
          <p>Continuously exploring new technologies and creative approaches.</p>
        </div>
        <div className="card">
          <h3>Quality</h3>
          <p>Delivering solutions that are reliable, efficient, and maintainable.</p>
        </div>
        <div className="card">
          <h3>Client-Centricity</h3>
          <p>Prioritizing our clients' needs and building long-term partnerships.</p>
        </div>
        <div className="card">
          <h3>Integrity</h3>
          <p>Operating with transparency, honesty, and ethical practices.</p>
        </div>
      </div>
    </div>
  );
};

export default About;