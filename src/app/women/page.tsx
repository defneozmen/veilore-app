"use client";

import { useShop } from "@/context/ShopContext"; 
import ProductCard from "@/components/ProductCard";

export default function WomenPage() {
  const { products } = useShop(); 

  // HATA ÇÖZÜMÜ: (products || []) kullanarak veri gelmediyse boş kabul et diyoruz.
  const womenProducts = (products || []).filter((p) => p.category === "women");

  return (
    <div style={{ backgroundColor: "#fffbfc", minHeight: "100vh" }} className="py-5">
      <div className="container">
        
        <div className="text-center mb-5">
          <h2 className="display-6 fw-bold text-dark" style={{ color: "#be185d" }}>Kadın Koleksiyonu</h2>
          <p className="text-muted">Toplam {womenProducts.length} ürün listeleniyor.</p>
        </div>

        <div className="row g-4">
          {womenProducts.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}

          {womenProducts.length === 0 && (
             <div className="text-center py-5">
                <h3>Henüz ürün bulunamadı.</h3>
                <p>Admin panelinden yeni ürün ekleyebilirsiniz.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}