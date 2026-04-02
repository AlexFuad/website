import React from 'react';

const Contact = () => {
  return (
    <div className="page-container">
      <h1>Contact Us</h1>
      <p>Silakan hubungi kami untuk konsultasi lebih lanjut.</p>
      <form className="contact-form">
        <input type="text" placeholder="Nama Anda" className="form-input" />
        <input type="email" placeholder="Email Anda" className="form-input" />
        <textarea placeholder="Pesan Anda" className="form-textarea"></textarea>
        <button type="submit" className="form-button">Kirim Pesan</button>
      </form>
    </div>
  );
};

export default Contact;