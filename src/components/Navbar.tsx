"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useShop } from "@/context/ShopContext";

export default function Navbar() {
  const pathname = usePathname(); // Şu an hangi sayfadayız?
  const { cart } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);

  // Ana sayfa haricindeki sayfalarda (ürünler, sepet vb.) Navbar siyah olsun
  const isDarkPage = pathname !== "/";

  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => {
    const dropdowns = document.querySelectorAll('.dropdown-menu');
    dropdowns.forEach(dd => dd.classList.remove('show'));
  };

  return (
    <>
      <style jsx global>{`
        .glass-header {
          position: fixed !important;
          top: 25px;
          left: 5%;
          right: 5%;
          width: 90%;
          z-index: 9999;
          padding: 10px 25px;
          transition: all 0.4s ease;
          border-radius: 100px !important; 
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          
          /* VARSAYILAN: Şeffaf Cam (Ana Sayfa İçin) */
          background-color: rgba(255, 255, 255, 0.08) !important;
          backdrop-filter: blur(30px) saturate(150%) !important;
          -webkit-backdrop-filter: blur(30px) saturate(150%) !important;
        }

        /* ÜRÜN SAYFALARINDA VEYA KAYDIRINCA SİYAH OLSUN */
        .glass-header.is-dark, .glass-header.scrolled {
          background-color: rgba(0, 0, 0, 0.85) !important; /* Net görünen siyah */
          top: 15px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
          border-color: rgba(255, 255, 255, 0.05) !important;
        }

        .brand-logo {
          font-family: 'Playfair Display', serif;
          color: #ffffff !important;
          font-weight: 800;
          letter-spacing: 4px;
          text-decoration: none;
        }

        .nav-link-item {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 700;
          color: #ffffff !important;
          cursor: pointer;
        }

        .dropdown-menu-custom {
          background: rgba(255, 255, 255, 0.98) !important;
          border-radius: 20px !important;
          border: none !important;
          padding: 15px 0 !important;
          margin-top: 20px !important;
        }

        .dropdown-item-custom {
          font-size: 0.7rem !important;
          text-transform: uppercase !important;
          letter-spacing: 2px !important;
          font-weight: 600 !important;
          padding: 10px 25px !important;
          color: #000 !important;
        }

        .btn-add-minimal {
          border: 1px solid rgba(255, 255, 255, 0.5);
          color: #ffffff;
          font-size: 0.65rem;
          font-weight: 700;
          padding: 8px 18px;
          border-radius: 50px;
          text-decoration: none;
        }
      `}</style>

      {/* Dinamik sınıflar: Sayfa aşağı kaydıysa veya koyu sayfalardaysak 'is-dark' ve 'scrolled' sınıflarını ekle */}
      <nav className={`navbar navbar-expand-lg glass-header ${isScrolled ? 'scrolled' : ''} ${isDarkPage ? 'is-dark' : ''}`}>
        <div className="container-fluid d-flex align-items-center justify-content-between">
          
          <div className="d-flex align-items-center gap-4">
            <Link className="btn-add-minimal" href="/add-product" onClick={closeMenu}>
              Ürün Ekle
            </Link>

            <div className="nav-item dropdown">
              <span 
                className="nav-link-item dropdown-toggle" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                Ürünler
              </span>
              <ul className="dropdown-menu dropdown-menu-custom border-0 shadow-lg">
                <li><Link className="dropdown-item dropdown-item-custom" href="/women" onClick={closeMenu}>Kadın Koleksiyonu</Link></li>
                <li><Link className="dropdown-item dropdown-item-custom" href="/men" onClick={closeMenu}>Erkek Koleksiyonu</Link></li>
              </ul>
            </div>
          </div>

          <div className="position-absolute start-50 top-50 translate-middle">
            <Link className="brand-logo fs-2" href="/" onClick={closeMenu}>
              VEILORA
            </Link>
          </div>

          <div>
            <Link className="position-relative d-flex align-items-center" href="/cart" onClick={closeMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#ffffff" viewBox="0 0 16 16">
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
              </svg>
              {cart.length > 0 && (
                <span className="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle" style={{fontSize: "0.55rem"}}>
                  {cart.length}
                </span>
              )}
            </Link>
          </div>

        </div>
      </nav>
    </>
  );
}