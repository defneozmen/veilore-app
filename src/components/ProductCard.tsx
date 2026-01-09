"use client";

import Link from "next/link";
import { Product } from "@/types";
import { useShop } from "@/context/ShopContext"; 
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useShop(); 
  const [isAdding, setIsAdding] = useState(false);

  // İndirim Oranı Hesaplama
  const discountRate = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Link'e tıklamayı engeller
    e.stopPropagation();
    
    addToCart(product); 
    setIsAdding(true);
    
    // Buton rengini 1.5 saniye sonra eski haline getir
    setTimeout(() => setIsAdding(false), 1500);
  };

  return (
    <div className="card h-100 border-0 shadow-sm bg-white rounded-4 overflow-hidden d-flex flex-column">
      
      {/* 1. RESİM ALANI (Tıklayınca Detaya Gider) */}
      <Link href={`/product/${product.productId}`} className="text-decoration-none">
        <div className="position-relative p-4 text-center bg-light" style={{ height: "260px" }}>
          
          {/* Ürün Resmi */}
          <img
            src={product.images && product.images[0] ? product.images[0] : ""}
            alt={product.productName}
            className="w-100 h-100"
            style={{ objectFit: "contain", mixBlendMode: "multiply" }}
            onError={(e) => (e.currentTarget.style.display = 'none')} // Kırık resim gizleme
          />

          {/* İndirim Rozeti (Varsa) */}
          {discountRate > 0 && (
            <div className="position-absolute top-0 start-0 m-2 badge bg-danger rounded-pill px-3 py-2 shadow-sm">
              %{discountRate} İndirim
            </div>
          )}
        </div>
      </Link>

      {/* 2. KART İÇERİĞİ */}
      <div className="card-body d-flex flex-column p-4">
        
        {/* Kategori */}
        <div className="text-uppercase text-muted fw-bold small mb-2" style={{ fontSize: "11px", letterSpacing: "1px" }}>
          {product.category === "men" ? "ERKEK" : "KADIN"}
        </div>

        {/* Başlık (Tıklanabilir) */}
        <Link href={`/product/${product.productId}`} className="text-decoration-none text-dark">
          <h5 className="card-title fw-bold mb-1 text-truncate">
            {product.productName}
          </h5>
        </Link>
        
        {/* Satıcı */}
        <p className="text-muted small mb-3">{product.sellerInfo}</p>
        
        {/* Fiyat Alanı */}
        <div className="mt-auto mb-3">
          {product.discountPrice ? (
            <div className="d-flex align-items-center gap-2">
              <span className="text-decoration-line-through text-muted small">{product.price} TL</span>
              <span className="fw-bold text-danger fs-5">{product.discountPrice} TL</span>
            </div>
          ) : (
            <span className="fw-bold text-dark fs-5">{product.price} TL</span>
          )}
        </div>

        {/* 3. SEPETE EKLE BUTONU (YATAY VE GENİŞ) */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`btn w-100 py-2 rounded-3 fw-semibold transition-all ${
            isAdding ? 'btn-success text-white' : 'btn-dark text-white'
          }`}
          style={{ transition: "all 0.3s ease" }}
        >
          {isAdding ? (
            <span>✔ Eklendi</span>
          ) : (
            <span>Sepete Ekle 🛒</span>
          )}
        </button>
      </div>
    </div>
  );
}