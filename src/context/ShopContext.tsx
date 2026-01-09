"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/types";

interface ShopContextType {
  products: Product[];
  cart: Product[];
  addNewProduct: (product: Product) => void;
  removeProduct: (id: string) => void; // Mağazadan siler
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void; // Sepetten siler (YENİ)
  cartTotal: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  // 1. Verileri LocalStorage'dan Çek
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    const storedCart = localStorage.getItem("cart");
    
    if (storedProducts) setProducts(JSON.parse(storedProducts));
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  // 2. Sepet Değişince LocalStorage'a Kaydet
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // --- FONKSİYONLAR ---

  // Ürün Ekle (Admin)
  const addNewProduct = (product: Product) => {
    const updated = [...products, product];
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  };

  // Ürün Sil (Admin)
  const removeProduct = (id: string) => {
    const updated = products.filter((p) => p.productId !== id);
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  };

  // Sepete Ekle
  const addToCart = (product: Product) => {
    // Aynı ürün tekrar eklenmesin (İstersen bu kontrolü kaldırabilirsin)
    const exists = cart.find(item => item.productId === product.productId);
    if (exists) {
      alert("Bu ürün zaten sepetinizde var!");
      return;
    }
    setCart((prev) => [...prev, product]);
  };

  // --- (YENİ) SEPETTEN SİLME FONKSİYONU ---
  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.productId !== productId);
      return updatedCart;
    });
  };

  // Sepet Toplam Tutarı
  const cartTotal = cart.reduce((total, item) => {
    const price = item.discountPrice || item.price;
    return total + price;
  }, 0);

  return (
    <ShopContext.Provider 
      value={{ 
        products, 
        cart, 
        addNewProduct, 
        removeProduct, 
        addToCart,
        removeFromCart, // <-- Artık dışarıya aktarılıyor
        cartTotal
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop must be used within a ShopProvider");
  return context;
}