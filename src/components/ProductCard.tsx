
"use client";

import Link from "next/link";
import { Product } from "@/types";
import { useShop } from "@/context/ShopContext"; 
import { useRouter } from "next/navigation"; 
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, deleteProduct } = useShop(); 
  const router = useRouter(); 
  const [isAdding, setIsAdding] = useState(false);

  const discountRate = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  // --- FONKSİYONLAR ---
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    if (confirm(`${product.productName} ürününü silmek istediğinize emin misiniz?`)) {
      deleteProduct(product.productId); 
    }
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    addToCart(product); 
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 1500);
  };
  
  

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
      <Link href={`/product/${product.productId}`} className="text-decoration-none">
        <div className="card h-100 border-0 shadow-sm product-card-hover overflow-hidden group">
          
          {/* ... (RESİM ALANI ve FİYAT HESAPLAMA KISMI BURADA TAMAMEN DÜZGÜN KABUL EDİLMİŞTİR) ... */}

          <div className="card-body px-3 py-3">
            <h6 className="card-title fw-bold text-dark text-truncate mb-1">
              {product.productName}
            </h6>
            
            <p className="text-muted small mb-2">{product.sellerInfo}</p>
            
            {/* Fiyat Gösterimi */}
            {/* ... (Fiyat kodları) ... */}

            {/* --- SEPETE EKLE BUTONU (SON HALİ) --- */}
            <div className="mt-3">
              <button
                className={`btn w-100 rounded-1 ${isAdding ? 'btn-success' : 'btn-dark'}`}
                onClick={handleAddToCart}
                disabled={isAdding}
              >
                {isAdding ? 'Eklendi! ✅' : 'Sepete Ekle 🛒'}
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}