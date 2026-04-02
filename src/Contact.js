import React from 'react';

const Contact = () => {
  return (
    <div className="page-container">
      <h1>Get in Touch with Caniel</h1>
      <p>Kami selalu senang mendengar dari Anda! Apakah Anda memiliki pertanyaan, ingin berdiskusi tentang proyek baru, atau sekadar ingin menyapa, jangan ragu untuk menghubungi kami.</p>
      <form className="contact-form">
        <input type="text" placeholder="Nama Lengkap Anda" className="form-input" required />
        <input type="email" placeholder="Email Anda" className="form-input" required />
        <input type="text" placeholder="Subjek" className="form-input" />
        <textarea placeholder="Pesan Anda" className="form-textarea" rows="6" required></textarea>
        <button type="submit" className="form-button">Kirim Pesan</button>
      </form>
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <p style={{ marginBottom: '10px' }}>Atau hubungi kami melalui:</p>
        <p><strong>Email:</strong> info@caniel.my.id</p>
        <p><strong>Telepon:</strong> +62 812-3456-7890</p>
      </div>
    </div>
  );
};

export default Contact;