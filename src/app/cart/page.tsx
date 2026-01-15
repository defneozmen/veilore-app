"use client";

import { useShop } from "@/context/ShopContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart } = useShop();

  const defaultWomen = "https://images.unsplash.com/photo-1592914610354-fd354ea45e48?q=80&w=300&auto=format&fit=crop";
  const defaultMen = "https://images.unsplash.com/photo-1616949755610-8c97da44f137?q=80&w=300&auto=format&fit=crop";

  const subtotal = cart.reduce((acc, item) => 
    acc + (item.discountPrice ? item.discountPrice : item.price), 0
  );

  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4">Alışveriş Sepetim ({cart.length})</h1>

      {cart.length === 0 ? (
        <div className="alert alert-warning text-center">
          Sepetiniz boş. <Link href="/" className="fw-bold text-dark">Alışverişe Başla</Link>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-lg-8">
            {cart.map((item) => {
              const fallback = item.category === 'men' ? defaultMen : defaultWomen;
              const image = (item.images?.[0]) ? item.images[0] : fallback;

              return (
                <div key={item.productId} className="card border-0 shadow-sm mb-3 p-3">
                  <div className="d-flex align-items-center gap-3">
                    {/* Resim Ayarı Güncellendi */}
                    <div className="bg-white rounded d-flex align-items-center justify-content-center overflow-hidden" style={{ width: "80px", height: "80px", border: "1px solid #eee" }}>
                      <img 
                        src={image} 
                        alt={item.productName} 
                        className="img-fluid" 
                        style={{ objectFit: "contain" }} 
                        onError={(e) => { e.currentTarget.src = fallback; }}
                      />
                    </div>
                    
                    <div className="flex-grow-1">
                      <h5 className="mb-1 fw-bold">{item.productName}</h5>
                      <span className="text-muted small text-uppercase">
                        {item.category === 'men' ? 'Erkek Parfümü' : 'Kadın Parfümü'}
                      </span>
                    </div>

                    <div className="text-end">
                      <div className="fw-bold fs-5 mb-2">
                        {item.discountPrice ? item.discountPrice : item.price} TL
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.productId)}
                        className="btn btn-sm btn-outline-danger border-0"
                      >
                         Kaldır
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm p-4 sticky-top" style={{top: "100px", zIndex: 1}}>
              <h4 className="fw-bold mb-3">Sipariş Özeti</h4>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Ara Toplam</span>
                <span className="fw-bold">{subtotal.toLocaleString('tr-TR')} TL</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Kargo</span>
                <span className="text-success fw-bold">Bedava</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between align-items-center mb-4">
                <span className="fs-5 fw-bold">Toplam</span>
                <span className="fs-4 fw-bolder text-primary">{subtotal.toLocaleString('tr-TR')} TL</span>
              </div>
              <button className="btn btn-dark w-100 py-3 fw-bold rounded-2">
                Ödemeyi Tamamla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}