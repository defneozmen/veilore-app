"use client";

import Link from "next/link";
import { CSSProperties } from "react";

/**
 * The main landing page component for the Veilore e-commerce application.
 * It serves as the entry point, featuring a prominent hero section with glassmorphism aesthetic,
 * direct navigation links to primary product categories (Men/Women), and a section highlighting brand values.
 *
 * @component
 * @returns {JSX.Element} The rendered homepage.
 */
export default function Home() {
  
  /**
   * Base styles for the main container to establish the premium feel background.
   * Uses a subtle radial gradient blending cool and warm tones.
   */
  const pageWrapperStyle: CSSProperties = {
    background: "radial-gradient(circle at top center, #f8fafc, #fff1f2)",
    minHeight: "100vh",
  };

  /**
   * Inline styles for the decorative blurred shapes in the background.
   * These add depth to the glassmorphism effect in the hero section.
   */
  const blobStyle: CSSProperties = {
    position: "absolute",
    borderRadius: "50%",
    filter: "blur(90px)",
    zIndex: 0,
    opacity: 0.4
  };

  return (
    <main style={pageWrapperStyle} className="position-relative overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="d-flex flex-column justify-content-center align-items-center px-4 py-5 min-vh-75 position-relative">
        
        {/* Decorative Background Blobs */}
        <div style={{ ...blobStyle, top: "-10%", left: "-5%", width: "500px", height: "500px", background: "linear-gradient(135deg, #bfdbfe, #3b82f6)" }} />
        <div style={{ ...blobStyle, bottom: "-10%", right: "-5%", width: "400px", height: "400px", background: "linear-gradient(135deg, #fbcfe8, #db2777)" }} />

        {/* Main Glassmorphism Content Box */}
        <div 
          className="p-5 rounded-5 shadow-lg text-center position-relative z-1 mx-auto"
          style={{
            maxWidth: "900px",
            width: "100%",
            background: "rgba(255, 255, 255, 0.7)", // High transparency for glass effect
            backdropFilter: "blur(25px)", // Strong blur for realism
            border: "1px solid rgba(255, 255, 255, 0.5)",
          }}
        >
          <span className="d-inline-block py-1 px-3 mb-4 rounded-pill bg-white text-primary fw-bold small tracking-wider shadow-sm">
            Yeni Sezon Yayında
          </span>
          
          <h1 className="display-3 fw-bold mb-4 text-dark lh-1">
            Kendi Tarzını <br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(to right, #2563eb, #db2777)" }}>
              Veilore
            </span> İle Yarat.
          </h1>
          
          <p className="lead text-muted mb-5 mx-auto" style={{ maxWidth: "650px" }}>
            Modern çizgiler, premium kumaşlar ve zamansız tasarımlar. 
            Sizi yansıtan o mükemmel parçayı bulmak için koleksiyonları keşfedin.
          </p>

          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link href="/men" className="btn btn-primary btn-lg rounded-pill px-5 py-3 fw-semibold hover-scale">
              Erkek Koleksiyonu
            </Link>
            <Link href="/women" className="btn btn-light text-dark border btn-lg rounded-pill px-5 py-3 fw-semibold hover-scale">
              Kadın Koleksiyonu
            </Link>
          </div>
        </div>
      </section>

      {/* --- CATEGORY SPOTLIGHT SECTION --- */}
      <section className="container py-5 position-relative z-1">
        <div className="row g-4">
          {/* Men's Category Card */}
          <div className="col-lg-6">
            <Link href="/men" className="text-decoration-none">
              <div 
                className="card h-100 border-0 rounded-5 overflow-hidden text-white shadow hover-scale"
                style={{ 
                  minHeight: "350px",
                  background: "linear-gradient(160deg, #0f172a 0%, #1e40af 100%)" // Deep blue gradient
                }}
              >
                <div className="card-body p-5 d-flex flex-column justify-content-end align-items-start">
                  <h2 className="display-6 fw-bold mb-2">Erkek</h2>
                  <p className="text-white-50 mb-4">Güçlü, modern ve sofistike duruş.</p>
                  <span className="btn btn-sm btn-outline-light rounded-pill px-4 stretched-link">İncele &rarr;</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Women's Category Card */}
          <div className="col-lg-6">
            <Link href="/women" className="text-decoration-none">
              <div 
                className="card h-100 border-0 rounded-5 overflow-hidden text-white shadow hover-scale"
                style={{ 
                  minHeight: "350px",
                  background: "linear-gradient(160deg, #831843 0%, #be185d 100%)" // Deep rose gradient
                }}
              >
                <div className="card-body p-5 d-flex flex-column justify-content-end align-items-start">
                  <h2 className="display-6 fw-bold mb-2">Kadın</h2>
                  <p className="text-white-50 mb-4">Zarif detaylar, feminen ve estetik çizgiler.</p>
                  <span className="btn btn-sm btn-outline-light rounded-pill px-4 stretched-link">İncele &rarr;</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* --- FEATURES / VALUE PROPOSITION SECTION --- */}
      <section className="container py-5 mb-5 position-relative z-1">
        <div className="row g-4 text-center py-4 rounded-4 bg-white shadow-sm border">
          <div className="col-md-4">
            <div className="p-3">
              <div className="fs-1 mb-3">💎</div>
              <h5 className="fw-bold">Premium Kalite</h5>
              <p className="text-muted small mb-0">En iyi kumaşlar ve ustalıkla işlenmiş detaylar.</p>
            </div>
          </div>
          <div className="col-md-4 border-start border-end">
            <div className="p-3">
              <div className="fs-1 mb-3">🚀</div>
              <h5 className="fw-bold">Hızlı & Güvenli Kargo</h5>
              <p className="text-muted small mb-0">Siparişleriniz özenle paketlenir ve hızla ulaştırılır.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3">
              <div className="fs-1 mb-3">🛡️</div>
              <h5 className="fw-bold">Güvenli Ödeme</h5>
              <p className="text-muted small mb-0">256-bit SSL sertifikası ile korunan güvenli altyapı.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}