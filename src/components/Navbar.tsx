"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useShop } from "@/context/ShopContext"; // 1. Context'i ekledik

export default function Navbar() {
  const pathname = usePathname();
  const { cart } = useShop(); // 2. Sepet verisini çektik (Sayıyı göstermek için)

  // Bootstrap JS'in çalışması için
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  // --- 3. MENÜYÜ KAPATMA FONKSİYONU (YENİ) ---
  const closeMenu = () => {
    // Menü elementini bul
    const navbarCollapse = document.getElementById("navbarNav");
    // Eğer menü açıksa (show class'ı varsa) o class'ı sil ve kapat
    if (navbarCollapse && navbarCollapse.classList.contains("show")) {
      navbarCollapse.classList.remove("show");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 sticky-top">
      <div className="container">
        
        {/* LOGO */}
        <Link 
          className="navbar-brand fw-bold text-uppercase text-danger spacing-2" 
          href="/"
          onClick={closeMenu} // Logoya basınca da menü kapansın
        >
          VEILORA
        </Link>

        {/* MOBİL MENÜ BUTONU (Hamburger) */}
        <button
          className="navbar-toggler border-0" // Çerçeveyi kaldırdım daha şık dursun
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* LİNKLER */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center gap-3 mt-3 mt-lg-0">
            
            {/* ÜRÜN EKLE */}
            <li className="nav-item">
              <Link 
                className={`btn btn-outline-dark rounded-pill px-4 fw-bold ${pathname === '/add-product' ? 'active' : ''}`} 
                href="/add-product"
                onClick={closeMenu} // <-- Tıklayınca kapatır
              >
                + ÜRÜN EKLE
              </Link>
            </li>

            {/* HAKKIMIZDA */}
            <li className="nav-item">
              <Link 
                className="nav-link fw-semibold text-dark" 
                href="/about"
                onClick={closeMenu} // <-- Tıklayınca kapatır
              >
                HAKKIMIZDA
              </Link>
            </li>

            {/* ÜRÜNLER (Dropdown) */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle fw-semibold text-dark"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                ÜRÜNLER
              </a>
              <ul className="dropdown-menu border-0 shadow text-center text-lg-start">
                <li>
                  <Link 
                    className="dropdown-item py-2" 
                    href="/women"
                    onClick={closeMenu} // <-- Seçim yapınca kapatır
                  >
                    👩 Kadın
                  </Link>
                </li>
                <li>
                  <Link 
                    className="dropdown-item py-2" 
                    href="/men"
                    onClick={closeMenu} // <-- Seçim yapınca kapatır
                  >
                    👨 Erkek
                  </Link>
                </li>
              </ul>
            </li>

            {/* SEPET (SAYAÇLI) */}
            <li className="nav-item ms-lg-2">
              <Link 
                className="btn btn-danger text-white rounded-pill px-4 d-flex align-items-center gap-2 justify-content-center" 
                href="/cart"
                onClick={closeMenu} // <-- Tıklayınca kapatır
              >
                <span>SEPET</span>
                {/* Sepet boş değilse sayıyı göster */}
                {cart.length > 0 && (
                  <span className="badge bg-white text-danger rounded-pill shadow-sm" style={{fontSize: "0.8rem"}}>
                    {cart.length}
                  </span>
                )}
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}