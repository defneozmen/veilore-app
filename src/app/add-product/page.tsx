"use client";

import { useState, useEffect } from "react";
import { useShop } from "@/context/ShopContext";
import { Product } from "@/types";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const { addNewProduct } = useShop();
  const router = useRouter();

  // 1. Otomatik ID Oluşturma (Sayfa açılınca)
  const [generatedId, setGeneratedId] = useState("");
  useEffect(() => {
    // Örn: PRD-K7L2M (Rastgele ve benzersiz)
    const uniqueId = "PRD-" + Math.random().toString(36).substr(2, 6).toUpperCase();
    setGeneratedId(uniqueId);
  }, []);

  // 2. Form Verileri
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    discountPrice: "", // İndirimli fiyat opsiyonel
    category: "men",
    image: "",
    sellerInfo: "",
    stock: ""
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // 3. Validasyon Kuralları (Senin İsterlerin)
  const validate = () => {
    const newErrors: {[key: string]: string} = {};

    // Ürün Adı: Harf ile başlamalı
    if (!/^[a-zA-ZğüşıöçĞÜŞİÖÇ]/.test(formData.productName)) {
      newErrors.productName = "Ürün adı harf ile başlamalıdır.";
    }

    // Satıcı: Harf/Rakam ile başlar, sadece - ve . içerir
    if (!/^[a-zA-Z0-9ğüşıöçĞÜŞİÖÇ][a-zA-Z0-9ğüşıöçĞÜŞİÖÇ\-\.\s]*$/.test(formData.sellerInfo)) {
      newErrors.sellerInfo = "Satıcı bilgisi geçersiz (Sadece harf, rakam, nokta, tire).";
    }

    // Stok: Sadece Rakam (type=number yasak)
    if (!/^\d+$/.test(formData.stock)) {
      newErrors.stock = "Stok sadece rakam içermelidir.";
    }

    // Fiyat: Virgüllü veya noktalı sayı (type=number yasak)
    if (!/^\d+([.,]\d+)?$/.test(formData.price)) {
      newErrors.price = "Geçerli bir fiyat giriniz (Örn: 100 veya 100.50).";
    }

    // İndirimli Fiyat (Doluysa kontrol et)
    if (formData.discountPrice && !/^\d+([.,]\d+)?$/.test(formData.discountPrice)) {
      newErrors.discountPrice = "Geçerli bir tutar giriniz.";
    }

    // İndirim Normal Fiyattan Büyük Olamaz
    if (formData.discountPrice) {
      const p = parseFloat(formData.price.replace(',', '.'));
      const d = parseFloat(formData.discountPrice.replace(',', '.'));
      if (d >= p) newErrors.discountPrice = "İndirimli fiyat normal fiyattan küçük olmalıdır.";
    }

    // Kategori: Sadece harf ve boşluk (Boşlukla başlayamaz)
    if (!/^[a-zA-ZğüşıöçĞÜŞİÖÇ][a-zA-ZğüşıöçĞÜŞİÖÇ\s]*$/.test(formData.category)) {
      newErrors.category = "Kategori sadece harf içerebilir.";
    }

    // Resim: HTTPS zorunluluğu
    if (!formData.image.startsWith("https://")) {
      newErrors.image = "Görsel URL'i https ile başlamalıdır.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Hata yoksa true döner
  };

  // 4. Gönderme İşlemi
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return; // Hata varsa dur

    const newProduct: Product = {
      productId: generatedId,
      productName: formData.productName,
      // Virgülü noktaya çevirip sayıya dönüştürüyoruz
      price: parseFloat(formData.price.replace(',', '.')), 
      discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice.replace(',', '.')) : undefined,
      category: formData.category as "men" | "women",
      images: [formData.image],
      sellerInfo: formData.sellerInfo,
      stock: parseInt(formData.stock)
    };

    addNewProduct(newProduct);
    alert("✨ Ürün Başarıyla Eklendi!");
    router.push(`/${formData.category}`); // İlgili kategoriye git
  };

  return (
    <div className="d-flex align-items-center justify-content-center py-5" 
         style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      
      {/* Container: Genişlik Sınırlandırıldı (Max 800px) */}
      <div className="card border-0 shadow-lg rounded-4 overflow-hidden" 
           style={{ maxWidth: "800px", width: "100%", margin: "0 15px" }}>
        
        {/* Başlık Alanı */}
        <div className="card-header bg-white border-0 pt-4 pb-0 text-center">
           <h3 className="fw-bold text-dark mb-1">Yeni Ürün Ekle</h3>
           <div className="badge bg-light text-dark border px-3 py-2 rounded-pill mt-2">
             ID: <span className="font-monospace fw-bold text-primary">{generatedId}</span>
           </div>
        </div>

        <div className="card-body p-4 p-md-5">
          <form onSubmit={handleSubmit} className="row g-3">
            
            {/* 1. Ürün Adı */}
            <div className="col-md-12">
              <div className="form-floating">
                <input 
                  type="text" 
                  className={`form-control ${errors.productName ? 'is-invalid' : ''}`} 
                  id="nameInput" 
                  placeholder="Ürün Adı"
                  value={formData.productName} 
                  onChange={(e) => setFormData({...formData, productName: e.target.value})}
                />
                <label htmlFor="nameInput">Ürün Adı *</label>
                <div className="invalid-feedback">{errors.productName}</div>
              </div>
            </div>

            {/* 2. Satıcı Bilgisi */}
            <div className="col-md-12">
              <div className="form-floating">
                <input 
                  type="text" 
                  className={`form-control ${errors.sellerInfo ? 'is-invalid' : ''}`} 
                  id="sellerInput" 
                  placeholder="Satıcı"
                  value={formData.sellerInfo} 
                  onChange={(e) => setFormData({...formData, sellerInfo: e.target.value})}
                />
                <label htmlFor="sellerInput">Satıcı Bilgisi *</label>
                <div className="invalid-feedback">{errors.sellerInfo}</div>
              </div>
            </div>

            {/* 3. Fiyat ve İndirim */}
            <div className="col-md-6">
              <div className="form-floating">
                <input 
                  type="text" // number KULLANILMADI
                  className={`form-control ${errors.price ? 'is-invalid' : ''}`} 
                  id="priceInput" 
                  placeholder="Fiyat"
                  value={formData.price} 
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                />
                <label htmlFor="priceInput">Fiyat (TL) *</label>
                <div className="invalid-feedback">{errors.price}</div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating">
                <input 
                  type="text" 
                  className={`form-control ${errors.discountPrice ? 'is-invalid' : ''}`} 
                  id="discountInput" 
                  placeholder="İndirim"
                  value={formData.discountPrice} 
                  onChange={(e) => setFormData({...formData, discountPrice: e.target.value})}
                />
                <label htmlFor="discountInput">İndirimli Fiyat (Opsiyonel)</label>
                <div className="invalid-feedback">{errors.discountPrice}</div>
              </div>
            </div>

            {/* 4. Stok ve Kategori */}
            <div className="col-md-6">
              <div className="form-floating">
                <input 
                  type="text" // number KULLANILMADI
                  className={`form-control ${errors.stock ? 'is-invalid' : ''}`} 
                  id="stockInput" 
                  placeholder="Stok"
                  value={formData.stock} 
                  onChange={(e) => setFormData({...formData, stock: e.target.value})}
                />
                <label htmlFor="stockInput">Stok Adedi *</label>
                <div className="invalid-feedback">{errors.stock}</div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating">
                <select 
                  className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                  id="catInput"
                  value={formData.category} 
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="men">Erkek Parfümü</option>
                  <option value="women">Kadın Parfümü</option>
                </select>
                <label htmlFor="catInput">Kategori *</label>
              </div>
            </div>

            {/* 5. Resim URL */}
            <div className="col-md-12">
              <div className="form-floating">
                <input 
                  type="text" 
                  className={`form-control ${errors.image ? 'is-invalid' : ''}`} 
                  id="imgInput" 
                  placeholder="https://..."
                  value={formData.image} 
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                />
                <label htmlFor="imgInput">Resim URL (https:// ile başlamalı) *</label>
                <div className="invalid-feedback">{errors.image}</div>
              </div>

              {/* Resim Önizleme */}
              <div className="mt-3 p-3 bg-light border rounded text-center" style={{minHeight: "100px"}}>
                 {formData.image ? (
                    <img src={formData.image} alt="Önizleme" style={{maxHeight: "150px", maxWidth: "100%", objectFit: "contain"}} />
                 ) : (
                    <span className="text-muted small">Görsel önizlemesi burada görünecek</span>
                 )}
              </div>
            </div>

            {/* Buton */}
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