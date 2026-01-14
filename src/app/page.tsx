"use client";

import Link from "next/link";
import { useShop } from "@/context/ShopContext";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const { products } = useShop();
  const recentProducts = [...products].reverse().slice(0, 4);

  return (
    <main className="position-relative min-vh-100">
      
      {/* 1. TÜM SAYFAYI KAPLAYAN SABİT ARKA PLAN */}
      <div 
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=1600&auto=format&fit=crop')", 
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1 // Her şeyin arkasında kalması için
        }}
      >
        {/* Tüm sayfayı kapsayan hafif bir karartma (İçeriklerin okunması için) */}
        <div className="w-100 h-100" style={{ background: "rgba(0,0,0,0.4)" }}></div>
      </div>

      {/* 2. GİRİŞ (HERO) ALANI */}
      <section className="d-flex align-items-center justify-content-center text-center text-white" style={{ height: "100vh" }}>
        <div className="p-4">
          <span className="text-uppercase tracking-wider small fw-bold mb-3 d-block" style={{ letterSpacing: "8px", opacity: 0.8 }}>LÜKS & ZARAFET</span>
          <h1 className="display-1 fw-bolder mb-4">İmza Kokunu Keşfet</h1>
          <p className="lead mb-5 mx-auto opacity-75" style={{ maxWidth: "700px" }}>
            Büyüleyici notalar ve kalıcı esanslarla dolu eşsiz parfüm koleksiyonumuzla tarzınızı tamamlayın.
          </p>
          <div className="d-flex gap-4 justify-content-center">
            <Link href="/women" className="btn btn-light rounded-pill px-5 py-3 fw-bold border-0">KADIN KOLEKSİYONU</Link>
            <Link href="/men" className="btn btn-outline-light rounded-pill px-5 py-3 fw-bold">ERKEK KOLEKSİYONU</Link>
          </div>
        </div>
      </section>

      {/* 3. AVANTAJLAR (Şeffaf ve Cam Efektli) */}
      <section className="py-5" style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)" }}>
        <div className="container py-4">
          <div className="row text-center text-white g-4">
            <div className="col-md-3">✨ <h6 className="mt-2 fw-bold small ls-2">ORİJİNAL ÜRÜN</h6></div>
            <div className="col-md-3">🚚 <h6 className="mt-2 fw-bold small ls-2">HIZLI KARGO</h6></div>
            <div className="col-md-3">🎁 <h6 className="mt-2 fw-bold small ls-2">ÖZEL PAKETLEME</h6></div>
            <div className="col-md-3">🛡️ <h6 className="mt-2 fw-bold small ls-2">GÜVENLİ ÖDEME</h6></div>
          </div>
        </div>
      </section>

      {/* 4. VİTRİN KOLEKSİYONU (Buzlu Cam Paneli Üzerinde) */}
      <section className="py-5">
        <div className="container py-5 my-5" style={{ 
          background: "rgba(255,255,255,0.1)", 
          backdropFilter: "blur(20px)",
          borderRadius: "40px",
          border: "1px solid rgba(255,255,255,0.1)",
          padding: "50px"
        }}>
          <div className="text-center mb-5">
            <h2 className="fw-bold display-5 text-white">Vitrin Koleksiyonu</h2>
            <div className="mx-auto bg-white mt-3" style={{ width: "60px", height: "2px", opacity: 0.5 }}></div>
          </div>

          <div className="row g-4">
            {recentProducts.map((product) => (
              <div key={product.productId} className="col-md-3">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-5">
            <Link href="/women" className="btn btn-outline-light rounded-pill px-5 py-2">Tümünü Gör</Link>
          </div>
        </div>
      </section>

      <footer className="py-5 text-center text-white-50 small">
        © 2026 VEILORA. Tüm Hakları Saklıdır.
      </footer>
    </main>
  );
}