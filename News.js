import React from 'react';
import { Link } from 'react-router-dom';

const News = () => {
  const blogs = [
    { id: 1, title: 'Peluncuran Website Caniel: Era Baru Solusi Digital', date: '24 Mei 2024', summary: 'Resmi meluncurkan website baru kami, caniel.my.id, sebagai platform untuk berbagi inovasi dan layanan digital kami yang komprehensif.' },
    { id: 2, title: 'Tips Optimasi SEO 2024: Tingkatkan Peringkat Anda!', date: '20 Mei 2024', summary: 'Panduan lengkap untuk meningkatkan peringkat website Anda di mesin pencari dengan strategi SEO terbaru di tahun 2024, dari on-page hingga technical SEO.' },
    { id: 3, title: 'Pentingnya UI/UX untuk Bisnis: Mengapa Ini Krusial?', date: '15 Mei 2024', summary: 'Mengapa desain antarmuka pengguna (UI) dan pengalaman pengguna (UX) sangat krusial dalam menarik dan mempertahankan pelanggan Anda di pasar digital yang kompetitif.' },
    { id: 4, title: 'Memilih Teknologi Frontend yang Tepat untuk Proyek Anda', date: '10 Mei 2024', summary: 'Panduan mendalam tentang faktor-faktor yang perlu dipertimbangkan saat memilih framework frontend seperti React, Angular, atau Vue.js.' },
    { id: 5, title: 'Keamanan Siber untuk Bisnis Kecil: Langkah-langkah Esensial', date: '05 Mei 2024', summary: 'Melindungi aset digital Anda adalah prioritas. Pelajari langkah-langkah penting untuk meningkatkan keamanan siber bisnis kecil Anda.' }
  ];

  return (
    <div className="page-container">
      <h1>Latest News & Blogs</h1>
      <p>Ikuti perkembangan terbaru dari Caniel, dapatkan insight industri, dan temukan tips bermanfaat seputar dunia digital.</p>
      <div className="grid" style={{ marginTop: '40px' }}>
        {blogs.map(post => (
          <div key={post.id} className="card">
            <h3>{post.title}</h3>
            <small style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '10px' }}>{post.date}</small>
            <p>{post.summary}</p>
            {/* Link to a detailed news page (you'd create /news/:id route and component later) */}
            <Link to={`/news/${post.id}`} className="action-button edit-button" style={{ marginTop: '15px', display: 'inline-block' }}>Read More</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;