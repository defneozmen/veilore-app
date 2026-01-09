"use client";

import { useState, useEffect } from "react";
import { useShop } from "@/context/ShopContext";
import { Product } from "@/types";

// Regex Kuralları (Validasyon için)
const RULES = {
  productName: /^[a-zA-ZğüşıöçĞÜŞİÖÇ]/,
  sellerInfo: /^[a-zA-Z0-9ğüşıöçĞÜŞİÖÇ][a-zA-Z0-9ğüşıöçĞÜŞİÖÇ\-\.\s]*$/,
  stock: /^\d+$/,
  price: /^\d+([.,]\d+)?$/, // Virgüllü sayı formatı
  category: /^[a-zA-ZğüşıöçĞÜŞİÖÇ][a-zA-ZğüşıöçĞÜŞİÖÇ\s]*$/,
  image: /^https:\/\//
};

// Formun Başlangıç Değerleri
const INITIAL_STATE = {
  productName: "",
  price: "",
  discountPrice: "",
  category: "men",
  image: "",
  sellerInfo: "",
  stock: ""
};

export default function AddProductPage() {
  const { addNewProduct } = useShop();

  // 1. ID Yönetimi
  const generateNewId = () => "PRD-" + Math.random().toString(36).substr(2, 6).toUpperCase();
  const [generatedId, setGeneratedId] = useState("");

  useEffect(() => {
    setGeneratedId(generateNewId());
  }, []);

  // 2. State Yönetimi
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [showToast, setShowToast] = useState(false);

  // CHANGE HANDLER (GÜNCELLENDİ: Sadece Sayı İzni)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // --- YENİ EKLENEN KISIM: Sadece Sayı Filtresi ---
    if (name === "price" || name === "discountPrice" || name === "stock") {
      // Eğer girilen değer boş değilse KONTROL ET
      if (value !== "") {
        // Stok alanı: Sadece dümdüz rakam (virgül yok)
        if (name === "stock") {
           if (!/^\d*$/.test(value)) return; // Rakam değilse yazma, çık.
        } 
        // Fiyat alanları: Rakam ve en fazla bir nokta/virgül
        else {
           // Regex: Rakamla başla, opsiyonel tek bir nokta/virgül, sonra yine rakam
           if (!/^\d*[.,]?\d*$/.test(value)) return; // Formata uymazsa yazma, çık.
        }
      }
    }
    // ------------------------------------------------

    // State Güncelle
    setFormData(prev => ({ ...prev, [name]: value }));

    // Hata Varsa ve Düzelttiyse Hatayı Sil
    if (errors[name]) {
      let isValid = true;
      if (name === "productName" && RULES.productName.test(value)) isValid = true;
      else if (name === "sellerInfo" && RULES.sellerInfo.test(value)) isValid = true;
      else if (name === "stock" && RULES.stock.test(value)) isValid = true;
      else if (name === "price" && RULES.price.test(value)) isValid = true;
      else if (name === "image" && RULES.image.test(value)) isValid = true;
      else if (name === "category" && RULES.category.test(value)) isValid = true;
      else if (name === "discountPrice") {
         if (value === "" || RULES.price.test(value)) isValid = true;
      }
      else isValid = false;

      if (isValid) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
  };

  // BLUR HANDLER
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let errorMsg = "";

    if (!value && name !== "discountPrice") return; 

    switch (name) {
      case "productName": if (!RULES.productName.test(value)) errorMsg = "Ürün adı harf ile başlamalıdır."; break;
      case "sellerInfo": if (!RULES.sellerInfo.test(value)) errorMsg = "Sadece harf, rakam, nokta ve tire kullanılabilir."; break;
      case "stock": if (!RULES.stock.test(value)) errorMsg = "Stok sadece rakam içermelidir."; break;
      case "price": if (!RULES.price.test(value)) errorMsg = "Geçerli bir fiyat giriniz."; break;
      case "image": if (!RULES.image.test(value)) errorMsg = "Görsel URL'i https:// ile başlamalıdır."; break;
      case "discountPrice": if (value && !RULES.price.test(value)) errorMsg = "Geçerli bir tutar giriniz."; break;
    }

    if (errorMsg) setErrors(prev => ({ ...prev, [name]: errorMsg }));
  };

  // VALIDATION ON SUBMIT
  const validateOnSubmit = () => {
    const newErrors: {[key: string]: string} = {};
    if (!RULES.productName.test(formData.productName)) newErrors.productName = "Ürün adı harf ile başlamalıdır.";
    if (!RULES.sellerInfo.test(formData.sellerInfo)) newErrors.sellerInfo = "Satıcı bilgisi geçersiz.";
    if (!RULES.stock.test(formData.stock)) newErrors.stock = "Stok sadece rakam olmalı.";
    if (!RULES.price.test(formData.price)) newErrors.price = "Fiyat formatı hatalı.";
    if (!RULES.category.test(formData.category)) newErrors.category = "Kategori hatalı.";
    if (!RULES.image.test(formData.image)) newErrors.image = "URL https ile başlamalı.";

    if (formData.discountPrice) {
      const p = parseFloat(formData.price.replace(',', '.'));
      const d = parseFloat(formData.discountPrice.replace(',', '.'));
      if (d >= p) newErrors.discountPrice = "İndirimli fiyat normalden düşük olmalı.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // SUBMIT İŞLEMİ
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateOnSubmit()) return;

    const newProduct: Product = {
      productId: generatedId,
      productName: formData.productName,
      price: parseFloat(formData.price.replace(',', '.')), 
      discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice.replace(',', '.')) : undefined,
      category: formData.category as "men" | "women",
      images: [formData.image],
      sellerInfo: formData.sellerInfo,
      stock: parseInt(formData.stock)
    };

    addNewProduct(newProduct);
    
    // Temizlik ve Bildirim
    setFormData(INITIAL_STATE);
    setErrors({});
    setGeneratedId(generateNewId());

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  return (
    <div className="d-flex align-items-center justify-content-center py-5" 
         style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      
      {/* ----------------- TOAST BİLDİRİMİ (SOL ÜST) ----------------- */}
      {showToast && (
        <div style={{
          position: 'fixed',
          top: '80px',   
          left: '20px', 
          zIndex: 1050,
          minWidth: '320px',
          animation: 'fadeIn 0.5s',
          opacity: 0.95
        }}>
          <div className="alert alert-success shadow-lg border-0 d-flex align-items-center rounded-3 p-3" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-check-circle-fill me-3" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </svg>
            <div>
              <h6 className="fw-bold mb-0">İşlem Başarılı!</h6>
              <small>Ürün eklendi, yeni giriş yapabilirsiniz.</small>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 0.95; transform: translateY(0); }
        }
      `}</style>
      
      {/* ----------------- FORM ALANI ----------------- */}
      <div className="card border-0 shadow-lg rounded-4 overflow-hidden" 
           style={{ maxWidth: "800px", width: "100%", margin: "0 15px" }}>
        
        <div className="card-header bg-white border-0 pt-4 pb-0 text-center">
           <h3 className="fw-bold text-dark mb-1">Yeni Ürün Ekle</h3>
           <div className="badge bg-light text-dark border px-3 py-2 rounded-pill mt-2">
             ID: <span className="font-monospace fw-bold text-primary">{generatedId}</span>
           </div>
        </div>

        <div className="card-body p-4 p-md-5">
          <form onSubmit={handleSubmit} className="row g-3">
            
            <div className="col-md-12">
              <div className="form-floating">
                <input 
                  type="text" name="productName" 
                  className={`form-control ${errors.productName ? 'is-invalid' : ''}`} 
                  id="nameInput" placeholder="Ürün Adı"
                  value={formData.productName} onChange={handleChange} onBlur={handleBlur}     
                />
                <label htmlFor="nameInput">Ürün Adı *</label>
                <div className="invalid-feedback">{errors.productName}</div>
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-floating">
                <input 
                  type="text" name="sellerInfo"
                  className={`form-control ${errors.sellerInfo ? 'is-invalid' : ''}`} 
                  id="sellerInput" placeholder="Satıcı"
                  value={formData.sellerInfo} onChange={handleChange} onBlur={handleBlur}
                />
                <label htmlFor="sellerInput">Satıcı Bilgisi *</label>
                <div className="invalid-feedback">{errors.sellerInfo}</div>
              </div>
            </div>

            {/* FİYAT - ARTIK SADECE SAYI KABUL EDİYOR */}
            <div className="col-md-6">
              <div className="form-floating">
                <input 
                  type="text" name="price"
                  className={`form-control ${errors.price ? 'is-invalid' : ''}`} 
                  id="priceInput" placeholder="Fiyat"
                  value={formData.price} onChange={handleChange} onBlur={handleBlur}
                />
                <label htmlFor="priceInput">Fiyat (TL) *</label>
                <div className="invalid-feedback">{errors.price}</div>
              </div>
            </div>

            {/* İNDİRİM - ARTIK SADECE SAYI KABUL EDİYOR */}
            <div className="col-md-6">
              <div className="form-floating">
                <input 
                  type="text" name="discountPrice"
                  className={`form-control ${errors.discountPrice ? 'is-invalid' : ''}`} 
                  id="discountInput" placeholder="İndirim"
                  value={formData.discountPrice} onChange={handleChange} onBlur={handleBlur}
                />
                <label htmlFor="discountInput">İndirimli Fiyat (Opsiyonel)</label>
                <div className="invalid-feedback">{errors.discountPrice}</div>
              </div>
            </div>

            {/* STOK - ARTIK SADECE RAKAM KABUL EDİYOR */}
            <div className="col-md-6">
              <div className="form-floating">
                <input 
                  type="text" name="stock"
                  className={`form-control ${errors.stock ? 'is-invalid' : ''}`} 
                  id="stockInput" placeholder="Stok"
                  value={formData.stock} onChange={handleChange} onBlur={handleBlur}
                />
                <label htmlFor="stockInput">Stok Adedi *</label>
                <div className="invalid-feedback">{errors.stock}</div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-floating">
                <select 
                  className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                  id="catInput" name="category"
                  value={formData.category} onChange={handleChange} onBlur={handleBlur}
                >
                  <option value="men">Erkek Parfümü</option>
                  <option value="women">Kadın Parfümü</option>
                </select>
                <label htmlFor="catInput">Kategori *</label>
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-floating">
                <input 
                  type="text" name="image"
                  className={`form-control ${errors.image ? 'is-invalid' : ''}`} 
                  id="imgInput" placeholder="https://..."
                  value={formData.image} onChange={handleChange} onBlur={handleBlur}
                />
                <label htmlFor="imgInput">Resim URL (https:// ile başlamalı) *</label>
                <div className="invalid-feedback">{errors.image}</div>
              </div>

              <div className="mt-3 p-3 bg-light border rounded text-center" style={{minHeight: "100px"}}>
                 {formData.image ? (
                    <img src={formData.image} alt="Önizleme" style={{maxHeight: "150px", maxWidth: "100%", objectFit: "contain"}} 
                         onError={(e) => (e.currentTarget.style.display = 'none')} 
                    />
                 ) : (
                    <span className="text-muted small">Görsel önizlemesi burada görünecek</span>
                 )}
              </div>
            </div>

            <div className="col-12 mt-4">
              <button type="submit" className="btn btn-dark w-100 py-3 fw-bold rounded-3 shadow-sm">
                + Ürünü Kaydet
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}