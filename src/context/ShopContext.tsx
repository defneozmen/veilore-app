"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/types";

// Context içinde nelerin olacağını tanımlıyoruz
interface ShopContextType {
  products: Product[];
  cart: Product[];
  addNewProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addToCart: (product: Product) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  // Ürünler Listesi
  const [products, setProducts] = useState<Product[]>([]);
  // Sepet Listesi
  const [cart, setCart] = useState<Product[]>([]);

  // Sayfa yüklendiğinde LocalStorage'dan ürünleri çek
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      try {
        setProducts(JSON.parse(storedProducts));
      } catch (error) {
        console.error("Veri okuma hatası:", error);
        setProducts([]); // Hata olursa boş dizi ata
      }
    }
  }, []);

  // --- FONKSİYONLAR ---

  // 1. Yeni Ürün Ekle
  const addNewProduct = (product: Product) => {
    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  // 2. Ürün Sil (ProductCard için gerekli)
  const deleteProduct = (id: string) => {
    const updatedProducts = products.filter((p) => p.productId !== id);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  // 3. Sepete Ekle (ProductCard için gerekli)
  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
    // İstersen sepeti de localstorage'a kaydedebilirsin
    console.log(`${product.productName} sepete eklendi.`);
  };

  return (
    <ShopContext.Provider 
      value={{ 
        products, 
        cart, 
        addNewProduct, 
        deleteProduct, 
        addToCart 
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}