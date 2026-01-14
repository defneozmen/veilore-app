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

  // --- GARANTİ LİNKLER (En net görünenler) ---
  const defaultWomen = "https://images.unsplash.com/photo-1592914610354-fd354ea45e48?q=80&w=600&auto=format&fit=crop";
  
  // YENİ ERKEK RESMİ (Daha aydınlık, kesin gözükür)
  const defaultMen = "https://images.unsplash.com/photo-1616949755610-8c97da44f137?q=80&w=600&auto=format&fit=crop";

  const fallbackImage = product.category === 'men' ? defaultMen : defaultWomen;

  const discountPercentage =
    product.discountPrice && product.discountPrice < product.price
      ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
      : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 1500);
  };

  const displayImage = (product.images && product.images.length > 0 && product.images[0] !== "") 
    ? product.images[0] 
    : fallbackImage;

  return (
    <div className="card h-100 border-0 shadow-sm bg-white rounded-3 overflow-hidden d-flex flex-column group-hover-container">
      <Link href={`/product/${product.productId}`} className="text-decoration-none position-relative d-block overflow-hidden bg-white" style={{ height: "280px" }}>
        
        {/* RESİM AYARLARI (Görünmezlik kodu silindi!) */}
        <img
          src={displayImage}
          alt={product.productName}
          className="w-100 h-100 transition-transform duration-500"
          style={{ objectFit: "contain" }} 
          onError={(e) => { e.currentTarget.src = fallbackImage; }}
        />
        
        {discountPercentage > 0 && (
          <div className="position-absolute top-0 start-0 m-2 z-2 badge bg-danger text-white rounded-pill shadow-sm px-3 py-2 fw-bold">
            %{discountPercentage} İNDİRİM
          </div>
        )}
      </Link>

      <div className="card-body d-flex flex-column p-4 text-center">
        <div className="text-uppercase text-muted fw-bold small mb-2 ls-1" style={{ fontSize: "10px" }}>
          {product.category === "men" ? "ERKEK" : "KADIN"}
        </div>
        <Link href={`/product/${product.productId}`} className="text-decoration-none text-dark">
          <h5 className="card-title fw-bold mb-2 text-truncate">{product.productName}</h5>
        </Link>
        <p className="text-muted small mb-3 fst-italic">{product.sellerInfo || "Veilora"}</p>
        <div className="mt-auto mb-4 d-flex justify-content-center align-items-center gap-2">
          {product.discountPrice && product.discountPrice < product.price ? (
            <>
              <span className="text-decoration-line-through text-muted small">{product.price} TL</span>
              <span className="fw-bolder text-danger fs-5">{product.discountPrice} TL</span>
            </>
          ) : (
            <span className="fw-bolder text-dark fs-5">{product.price} TL</span>
          )}
        </div>
        <button onClick={handleAddToCart} disabled={isAdding} className={`btn w-100 py-2 rounded-0 fw-bold transition-all ${isAdding ? 'btn-success text-white' : 'btn-dark text-white'}`}>
          {isAdding ? 'Sepete Eklendi' : 'Sepete Ekle'}
        </button>
      </div>
    </div>
  );
}