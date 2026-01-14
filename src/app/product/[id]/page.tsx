"use client";

import { useParams } from "next/navigation";
import { useShop } from "@/context/ShopContext";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ProductDetailPage() {
  const params = useParams();
  const { products, addToCart } = useShop();
  const [product, setProduct] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [activeTab, setActiveTab] = useState("desc");

  const defaultWomen = "https://images.unsplash.com/photo-1592914610354-fd354ea45e48?q=80&w=800&auto=format&fit=crop";
  const defaultMen = "https://images.unsplash.com/photo-1616949755610-8c97da44f137?q=80&w=800&auto=format&fit=crop";

  useEffect(() => {
    if (params.id && products.length > 0) {
      setProduct(products.find((p) => p.productId === params.id) || null);
    }
  }, [params.id, products]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setIsAdding(true);
      setTimeout(() => setIsAdding(false), 1500);
    }
  };

  if (!product) return <div className="text-center py-5">Yükleniyor...</div>;

  const fallbackImage = product.category === 'men' ? defaultMen : defaultWomen;
  const displayImage = (product.images?.[0]) ? product.images[0] : fallbackImage;
  const discountRate = product.discountPrice ? Math.round(((product.price - product.discountPrice) / product.price) * 100) : 0;

  return (
    <div className="py-5 bg-white min-vh-100">
      <div className="container">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb small text-uppercase">
            <li className="breadcrumb-item"><Link href="/" className="text-muted text-decoration-none">Ana Sayfa</Link></li>
            <li className="breadcrumb-item text-muted">{product.category === 'men' ? 'Erkek' : 'Kadın'}</li>
            <li className="breadcrumb-item active fw-bold">{product.productName}</li>
          </ol>
        </nav>

        <div className="row g-5">
          <div className="col-lg-6">
            <div className="bg-light p-5 d-flex justify-content-center align-items-center position-relative" style={{ minHeight: "500px" }}>
              {discountRate > 0 && (
                <div className="position-absolute top-0 start-0 m-4 bg-danger text-white rounded-circle d-flex align-items-center justify-content-center shadow fw-bold" style={{ width: "60px", height: "60px" }}>%{discountRate}</div>
              )}
              {/* Resim ayarı güncellendi */}
              <img src={displayImage} alt={product.productName} className="img-fluid shadow-lg" style={{ maxHeight: "450px", objectFit: "contain" }} onError={(e) => { e.currentTarget.src = fallbackImage; }} />
            </div>
          </div>

          <div className="col-lg-6 d-flex flex-column justify-content-center">
            <span className="text-uppercase text-muted small fw-bold mb-2">VEILORA KOLEKSİYONU</span>
            <h1 className="display-4 fw-bold mb-3">{product.productName}</h1>
            <div className="mb-4 text-muted fst-italic">Satıcı: <span className="text-dark fw-semibold">{product.sellerInfo || "Veilora"}</span></div>
            <div className="mb-4 d-flex align-items-center gap-3">
              {product.discountPrice ? (
                <>
                   <span className="text-decoration-line-through text-muted fs-4">{product.price} TL</span>
                   <span className="display-6 fw-bold text-danger">{product.discountPrice} TL</span>
                </>
              ) : (
                <span className="display-6 fw-bold text-dark">{product.price} TL</span>
              )}
            </div>
            
            <div className="mb-5">
               <div className="d-flex border-bottom mb-3">
                 <button onClick={() => setActiveTab("desc")} className={`btn btn-link text-decoration-none pb-2 px-0 me-4 ${activeTab === 'desc' ? 'text-dark fw-bold border-bottom border-dark border-2' : 'text-muted'}`}>Ürün Açıklaması</button>
                 <button onClick={() => setActiveTab("notes")} className={`btn btn-link text-decoration-none pb-2 px-0 ${activeTab === 'notes' ? 'text-dark fw-bold border-bottom border-dark border-2' : 'text-muted'}`}>Koku Notaları 🌸</button>
               </div>
               <div style={{ minHeight: "80px" }}>
                 {activeTab === "desc" ? (
                   <p className="text-muted">{product.category === 'men' ? 'Güçlü ve maskülen bir imza.' : 'Gizemli ve çekici bir koku.'}</p>
                 ) : (
                   <div className="row">
                     <div className="col-4"><strong>Üst:</strong><br/><span className="text-muted small">Bergamot</span></div>
                     <div className="col-4"><strong>Kalp:</strong><br/><span className="text-muted small">Yasemin</span></div>
                     <div className="col-4"><strong>Dip:</strong><br/><span className="text-muted small">Vanilya</span></div>
                   </div>
                 )}
               </div>
            </div>

            <button onClick={handleAddToCart} disabled={isAdding} className={`btn btn-lg w-100 rounded-0 fw-bold py-3 ${isAdding ? 'btn-success text-white' : 'btn-dark text-white'}`}>
                {isAdding ? 'SEPETE EKLENDİ ✔' : 'SEPETE EKLE'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}