"use client";

import { useEffect, useState } from "react";
import { CartItem } from "@/types";
import Link from "next/link";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Sepeti LocalStorage'dan Çek
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
  }, []);

  // Toplam Fiyatı Hesapla (Sepet her değiştiğinde)
  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotalPrice(total);
    // LocalStorage'ı da güncelle (Miktar değişimleri için)
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Ürün Silme
  const removeFromCart = (indexToRemove: number) => {
    if(confirm("Bu ürünü sepetten çıkarmak istiyor musunuz?")) {
        const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
        setCartItems(updatedCart);
        // Header'daki sepet sayısını güncellemek için event fırlatılabilir (İleri seviye)
        // Şimdilik sadece sayfayı yenilemek en basit çözüm:
        setTimeout(() => window.location.reload(), 100);
    }
  };

  // Miktar Güncelleme (Artır/Azalt)
  const updateQuantity = (index: number, change: number) => {
    const newCart = [...cartItems];
    const item = newCart[index];

    // Yeni miktar 1'den küçük olamaz
    if (item.quantity + change < 1) return;
    
    // Stok kontrolü de yapılabilir ama şimdilik basit tutuyoruz
    item.quantity += change;
    setCartItems(newCart);
  };

  if (cartItems.length === 0) {
    return (
        <div className="container py-5 text-center">
            <div className="mb-4">
                <span className="display-1">🛒</span>
            </div>
            <h2 className="fw-bold">Sepetiniz Boş</h2>
            <p className="text-muted mb-4">Henüz sepetinize hiç ürün eklemediniz.</p>
            <Link href="/women" className="btn btn-dark px-5 py-3 rounded-pill fw-bold">
                ALIŞVERİŞE BAŞLA
            </Link>
        </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4">SEPETİM ({cartItems.length} Ürün)</h1>

      <div className="row g-5">
        {/* SOL TARAF: Ürün Listesi */}
        <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    {cartItems.map((item, index) => (
                        <div key={index} className="d-flex align-items-center p-3 border-bottom">
                            {/* Resim */}
                            <div style={{width: '100px', height: '100px'}} className="flex-shrink-0 bg-light rounded overflow-hidden">
                                <img 
                                    src={item.image || "https://via.placeholder.com/100"} 
                                    alt={item.name} 
                                    className="w-100 h-100" 
                                    style={{objectFit: 'cover'}}
                                />
                            </div>

                            {/* Bilgiler */}
                            <div className="ms-3 flex-grow-1">
                                <h5 className="fw-bold mb-1">{item.name}</h5>
                                <p className="text-muted small mb-0">Adet Fiyatı: {item.price.toLocaleString('tr-TR')} TL</p>
                            </div>

                            {/* Miktar Kontrolü */}
                            <div className="d-flex align-items-center border rounded-pill px-2 py-1 mx-3">
                                <button 
                                    className="btn btn-sm btn-link text-dark text-decoration-none fw-bold"
                                    onClick={() => updateQuantity(index, -1)}
                                >-</button>
                                <span className="mx-2 fw-bold">{item.quantity}</span>
                                <button 
                                    className="btn btn-sm btn-link text-dark text-decoration-none fw-bold"
                                    onClick={() => updateQuantity(index, 1)}
                                >+</button>
                            </div>

                            {/* Toplam ve Sil */}
                            <div className="text-end" style={{minWidth: '100px'}}>
                                <div className="fw-bold fs-5 mb-2">
                                    {(item.price * item.quantity).toLocaleString('tr-TR')} TL
                                </div>
                                <button 
                                    className="btn btn-sm btn-outline-danger border-0"
                                    onClick={() => removeFromCart(index)}
                                    title="Sepetten Çıkar"
                                >
                                    🗑️ Sil
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* SAĞ TARAF: Özet ve Ödeme */}
        <div className="col-lg-4">
            <div className="card border-0 shadow-sm bg-light">
                <div className="card-body p-4">
                    <h4 className="fw-bold mb-4">Sipariş Özeti</h4>
                    
                    <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">Ara Toplam</span>
                        <span className="fw-bold">{totalPrice.toLocaleString('tr-TR')} TL</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                        <span className="text-muted">Kargo</span>
                        <span className="text-success fw-bold">Bedava</span>
                    </div>
                    
                    <hr />
                    
                    <div className="d-flex justify-content-between mb-4">
                        <span className="fs-5 fw-bold">TOPLAM</span>
                        <span className="fs-4 fw-bold text-danger">{totalPrice.toLocaleString('tr-TR')} TL</span>
                    </div>

                    <button className="btn btn-dark w-100 py-3 fw-bold rounded-3">
                        SEPETİ ONAYLA 💳
                    </button>
                    
                    <div className="text-center mt-3">
                        <small className="text-muted">Güvenli Ödeme & 100% İade Garantisi</small>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}