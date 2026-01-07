"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  // Bootstrap JS'in çalışması için (Dropdown menü için gerekli)
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 sticky-top">
      <div className="container">
        {/* LOGO */}
        <Link className="navbar-brand fw-bold text-uppercase text-danger spacing-2" href="/">
          VEILORA
        </Link>

        {/* MOBİL MENÜ BUTONU */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* LİNKLER */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center gap-3">
            
            {/* ÜRÜN EKLE BUTONU (Senin istediğin özel buton) */}
            <li className="nav-item">
              <Link 
                className={`btn btn-outline-dark rounded-pill px-4 fw-bold ${pathname === '/add-product' ? 'active' : ''}`} 
                href="/add-product"
              >
                + ÜRÜN EKLE
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-semibold text-dark" href="/about">
                HAKKIMIZDA
              </Link>
            </li>

            {/* AÇILIR MENÜ (Kadın - Erkek) */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle fw-semibold text-dark"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                ÜRÜNLER
              </a>
              <ul className="dropdown-menu border-0 shadow">
                <li>
                  <Link className="dropdown-item py-2" href="/women">
                    👩 Kadın
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item py-2" href="/men">
                    👨 Erkek
                  </Link>
                </li>
              </ul>
            </li>

            {/* SEPET */}
            <li className="nav-item ms-2">
              <Link className="btn btn-danger text-white rounded-pill px-4" href="/cart">
                SEPET
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}