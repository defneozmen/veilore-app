"use client";

import { useShop } from "@/context/ShopContext";
import Link from "next/link";

export default function CartPage() {
  // Context'ten verileri çekiyoruz
  const { cart, removeFromCart, cartTotal } = useShop();

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }} className="py-5">
      <div className="container">
        
        <h1 className="fw-bold mb-4">Alışveriş Sepetim ({cart.length})</h1>

        {/* --- DURUM 1: SEPET BOŞSA --- */}
        {cart.length === 0 ? (
          <div className="text-center bg-white p-5 rounded-4 shadow-sm">
            <div className="mb-3" style={{ fontSize: "4rem" }}>🛒</div>
            <h3 className="fw-bold">Sepetinizde ürün yok.</h3>
            <p className="text-muted">Hemen alışverişe başlayıp harika fırsatları yakalayın!</p>
            <Link href="/" className="btn btn-dark px-5 py-3 rounded-pill fw-bold mt-3">
              Alışverişe Başla
            </Link>
          </div>
        ) : (
          /* --- DURUM 2: SEPET DOLUYSA --- */
          <div className="row g-4">
            
            {/* SOL TARAF: Ürün Listesi */}
            <div className="col-lg-8">
              <div className="bg-white rounded-4 shadow-sm overflow-hidden">
                {cart.map((item) => (
                  <div key={item.productId} className="d-flex align-items-center p-3 border-bottom gap-3">
                    
                    {/* Resim */}
                    <div style={{ width: "100px", height: "100px" }} className="bg-light rounded-3 p-2 flex-shrink-0 border">
                      <img 
                        src={item.images?.[0]} 
                        alt={item.productName} 
                        className="w-100 h-100" 
                        style={{ objectFit: "contain", mixBlendMode: "multiply" }} 
                      />
                    </div>

                    {/* Bilgiler */}
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between">
                        <h5 className="fw-bold text-dark mb-1">{item.productName}</h5>
                        {/* Fiyat */}
                        <span className="fw-bold fs-5">
                          {item.discountPrice || item.price} TL
                        </span>
                      </div>
                      
                      <p className="text-muted small mb-2">
                        {item.category === 'men' ? 'Erkek Parfümü' : 'Kadın Parfümü'}
                      </p>

                      {/* Sil Butonu */}
                      <button 
                        onClick={() => removeFromCart(item.productId)}
                        className="btn btn-sm btn-outline-danger border-0 p-0 d-flex align-items-center gap-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg>
                        Sepetten Kaldır
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* SAĞ TARAF: Özet Kartı */}
            <div className="col-lg-4">
              <div className="bg-white rounded-4 shadow-sm p-4 sticky-top" style={{ top: "20px" }}>
                <h4 className="fw-bold mb-4">Sipariş Özeti</h4>
                
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Ara Toplam</span>
                  <span className="fw-semibold">{cartTotal} TL</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Kargo</span>
                  <span className="text-success fw-bold">Bedava</span>
                </div>
                
                <hr />
                
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <span className="fw-bold fs-5">Toplam</span>
                  <span className="fw-bold fs-4 text-primary">{cartTotal} TL</span>
                </div>

                <button className="btn btn-dark w-100 py-3 rounded-3 fw-bold shadow-sm transition-btn">
                  Ödemeyi Tamamla 💳
                </button>

                <div className="text-center mt-3">
                  <Link href="/" className="text-muted small text-decoration-none">
                     ← Alışverişe Devam Et
                  </Link>
                </div>

              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}