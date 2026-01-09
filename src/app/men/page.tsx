"use client";

import { useShop } from "@/context/ShopContext"; 
import ProductCard from "@/components/ProductCard";

export default function MenPage() {
  // Context'ten ürünleri ve silme fonksiyonunu çekiyoruz
  const { products, removeProduct } = useShop();

  // Sadece Erkek kategorisindeki ürünleri filtrele
  const menProducts = (products || []).filter((p) => p.category === "men");

  // Silme Butonuna Basılınca Çalışacak Fonksiyon
  const handleDeleteClick = (id: string) => {
    if (window.confirm("Bu ürünü silmek istediğinize emin misiniz?")) {
      removeProduct(id);
    }
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }} className="py-5">
      <div className="container">
        
        {/* Başlık Alanı */}
        <div className="text-center mb-5">
          <h2 className="display-6 fw-bold text-dark">Erkek Koleksiyonu</h2>
          <p className="text-muted">Toplam {menProducts.length} ürün listeleniyor.</p>
        </div>

        {/* Ürün Listesi */}
        <div className="row g-4">
          {menProducts.map((product) => (
            // Her kartı bir kolon içine alıyoruz
            <div key={product.productId} className="col-12 col-sm-6 col-md-4 col-lg-3">
              
              <div className="position-relative shadow-sm rounded-4 h-100 overflow-hidden group-hover-container">
                {/* 1. Ürün Kartı */}
                <ProductCard product={product} />

                {/* 2. SİLME BUTONU (Sağ Üst Köşe) */}
                <button
                  onClick={() => handleDeleteClick(product.productId)}
                  className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2 rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "35px", height: "35px", zIndex: 10, boxShadow: "0 2px 5px rgba(0,0,0,0.2)" }}
                  title="Ürünü Sil"
                >
                  {/* Çöp Kutusu İkonu */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                  </svg>
                </button>
              </div>

            </div>
          ))}

          {/* Ürün Yoksa Gösterilecek Alan */}
          {menProducts.length === 0 && (
            <div className="col-12 text-center py-5">
                <div className="text-muted display-1 mb-3">🛍️</div>
                <h3>Henüz erkek kategorisinde ürün yok.</h3>
                <p>Admin panelinden yeni ürünler ekleyebilirsiniz.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}