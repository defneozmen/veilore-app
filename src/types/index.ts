/**
 * Represents a single product in the e-commerce application.
 */
export interface Product {
productId: string;     // ProductCard içinde productId kullanılıyor
  productName: string;
  price: number;
  discountPrice?: number; // ProductCard içinde bu isimle kullanmışsın
  category: "men" | "women";
  images: string[];
  sellerInfo: string;
  stock: number;
}

/**
 * Represents an item in the shopping cart.
 */
export interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
  id: string;
}