"use client";

import { CSSProperties } from "react";

/**
 * Team Member Interface
 * Represents the artisans behind the fragrances.
 */
interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
}

/**
 * Master Perfumers Data
 * Simulating real experts in the olfactory industry.
 */
const teamMembers: TeamMember[] = [
  { 
    id: 1, 
    name: "Nisa Elsan", 
    role: "Baş Parfümör (The Nose)", 
    description: "Grasse, Fransa'da koku eğitimi aldı. İmza parfümlerimizin yaratıcısı." 
  },
  { 
    id: 2, 
    name: "Alperen Burak Küçük", 
    role: "Kimya Mühendisi & Esans Uzmanı", 
    description: "Kokuların kalıcılığını ve notaların uyumunu formüle eden bilim insanı." 
  },
];

/**
 * About Page Component - Perfume Edition.
 * Focuses on the art of perfumery, scent notes, and brand heritage.
 * Uses a luxurious, sensory-focused design language.
 * * @component
 */
export default function AboutPage() {

  /**
   * Hero Background Style
   * A golden-amber gradient evoking the feeling of luxury essences and sunset.
   */
  const heroStyle: CSSProperties = {
    background: "radial-gradient(circle at top center, #fffbeb, #fef2f2, #fff)", // Amber & Rose undertones
    padding: "120px 0 80px 0",
    position: "relative"
  };

  return (
    <main className="overflow-hidden">
      
      {/* --- HERO SECTION: THE ESSENCE --- */}
      <section style={heroStyle} className="text-center px-4">
        {/* Background Blur Effect */}
        <div 
            className="position-absolute rounded-circle opacity-30"
            style={{ 
              width: "600px", height: "600px", 
              background: "radial-gradient(#fde68a, transparent)", 
              filter: "blur(100px)", top: "-200px", left: "50%", transform: "translateX(-50%)" 
            }}
        />

        <div className="container position-relative z-1">
          <span className="badge bg-warning bg-opacity-10 text-warning px-3 py-2 rounded-pill mb-4 tracking-wider fw-bold text-uppercase text-dark">
            Est. 2026 • İstanbul
          </span>
          <h1 className="display-3 fw-bold mb-4 text-dark" style={{ letterSpacing: "-1px" }}>
            Bir Parfümden <br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(to right, #d97706, #be185d)" }}>
              Çok Daha Fazlası.
            </span>
          </h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "700px", lineHeight: "1.9" }}>
            Veilore, kokuların hafızamızdaki en güçlü imza olduğuna inanır. 
            Her şişemiz, nadide çiçek özleri, egzotik baharatlar ve ustalıkla işlenmiş 
            notaların birleşiminden doğan bir hikayeyi anlatır.
          </p>
        </div>
      </section>

      {/* --- SECTION 2: THE CRAFT (STORY & IMAGE) --- */}
      <section className="py-5 bg-white">
        <div className="container py-lg-5">
          <div className="row align-items-center g-5">
            {/* Visual Side: Perfume Bottle / Ingredients */}
            <div className="col-lg-6 order-2 order-lg-1">
              <div className="position-relative">
                <div 
                  className="rounded-4 shadow-lg overflow-hidden position-relative hover-scale"
                  style={{ height: "550px" }}
                >
                   {/* Unsplash image representing perfume/luxury */}
                  <img 
                    src="https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=1000&auto=format&fit=crop" 
                    alt="Veilore Perfume Craftsmanship" 
                    className="w-100 h-100 object-fit-cover"
                  />
                  
                  {/* Floating Badge */}
                  <div className="position-absolute bottom-0 start-0 m-4 p-3 bg-white bg-opacity-90 backdrop-blur rounded shadow-sm">
                    <p className="mb-0 fw-bold text-dark small">✨ %25 Oranında Saf Esans</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Side */}
            <div className="col-lg-6 order-1 order-lg-2">
              <h5 className="text-warning text-uppercase fw-bold letter-spacing-2 small mb-3">Sanat ve Bilim</h5>
              <h2 className="display-6 fw-bold mb-4">Koku Piramidi</h2>
              <p className="text-muted mb-4" style={{ fontSize: "1.05rem" }}>
                Bir parfüm, tende yaşayan canlı bir organizmadır. Veilore parfümleri, 
                zamanla açılarak farklı karakterlere bürünmek üzere tasarlanmıştır.
              </p>
              
              {/* The Notes Breakdown */}
              <div className="d-flex flex-column gap-4 mt-4">
                <div className="d-flex">
                  <div className="flex-shrink-0 mt-1">
                    <span className="fs-4 text-warning">🍋</span>
                  </div>
                  <div className="ms-3">
                    <h6 className="fw-bold mb-1">Üst Notalar (İlk İzlenim)</h6>
                    <p className="small text-muted mb-0">Sıkıldığı an duyulan, taze ve uçucu kokular. Bergamot, Limon, Neroli.</p>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="flex-shrink-0 mt-1">
                    <span className="fs-4 text-danger">🌹</span>
                  </div>
                  <div className="ms-3">
                    <h6 className="fw-bold mb-1">Orta Notalar (Parfümün Kalbi)</h6>
                    <p className="small text-muted mb-0">Karakterin ortaya çıktığı gövde. Yasemin, Gül, Lavanta.</p>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="flex-shrink-0 mt-1">
                    <span className="fs-4 text-dark">🪵</span>
                  </div>
                  <div className="ms-3">
                    <h6 className="fw-bold mb-1">Alt Notalar (İmza)</h6>
                    <p className="small text-muted mb-0">Tenle bütünleşen ve gün boyu kalan derinlik. Amber, Misk, Sandal Ağacı.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: PERFUME FEATURES --- */}
      <section className="py-5" style={{ background: "linear-gradient(to bottom, #fff, #fef2f2)" }}>
        <div className="container py-4">
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="p-4 rounded-4 bg-white shadow-sm h-100 hover-scale border-0">
                <div className="fs-1 mb-3">💧</div>
                <h4 className="fw-bold fs-5">EDP Yoğunluğu</h4>
                <p className="text-muted small">Tüm parfümlerimiz Eau de Parfum (EDP) formundadır ve yüksek esans oranı içerir.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 rounded-4 bg-white shadow-sm h-100 hover-scale border-0">
                <div className="fs-1 mb-3">🐰</div>
                <h4 className="fw-bold fs-5">Cruelty Free</h4>
                <p className="text-muted small">Ürünlerimizin hiçbiri hayvanlar üzerinde test edilmez. Doğaya ve yaşama saygılıyız.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 rounded-4 bg-white shadow-sm h-100 hover-scale border-0">
                <div className="fs-1 mb-3">⏳</div>
                <h4 className="fw-bold fs-5">48 Saat Kalıcılık</h4>
                <p className="text-muted small">Özel fiksatörlerimiz sayesinde kokunuz gün boyu tazeliğini korur.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: THE NOSES (TEAM) --- */}
      <section className="py-5 bg-white">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold display-6">Kokunun Arkasındaki İsimler</h2>
            <p className="text-muted">Laboratuvarımızdaki tutkulu uzmanlar.</p>
          </div>

          <div className="row g-4 justify-content-center">
            {teamMembers.map((member) => (
              <div key={member.id} className="col-lg-5 col-md-6">
                <div className="card h-100 border-0 shadow-sm p-4 text-center" style={{ background: "#fffbfc" }}>
                   <div 
                    className="mx-auto rounded-circle mb-4 d-flex align-items-center justify-content-center fw-bold text-white fs-3 shadow-sm"
                    style={{ 
                      width: "100px", 
                      height: "100px", 
                      background: "linear-gradient(135deg, #d97706, #fbbf24)",
                    }}
                  >
                    {member.name.substring(0,1).toUpperCase()}
                  </div>
                  <h4 className="fw-bold mb-1">{member.name}</h4>
                  <span className="badge bg-dark text-white mb-3 d-inline-block mx-auto">{member.role}</span>
                  <p className="text-muted fst-italic">"{member.description}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}