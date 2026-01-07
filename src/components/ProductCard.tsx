import Link from "next/link";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // İndirim Oranı Hesaplama
  const calculateDiscount = () => {
    if (product.discountedPrice && product.discountedPrice < product.price) {
      const discount = ((product.price - product.discountedPrice) / product.price) * 100;
      return Math.round(discount);
    }
    return 0;
  };

  const discountRate = calculateDiscount();

  return (
    <div className="col-md-4 col-sm-6 mb-4">
      <div className="card h-100 border-0 shadow-sm">
        <div style={{ height: "250px", overflow: "hidden", position: "relative" }}>
          <img 
            src={product.images[0]} 
            className="card-img-top w-100 h-100 object-fit-cover" 
            alt={product.name} 
          />
          {/* İndirim Rozeti */}
          {discountRate > 0 && (
            <span className="position-absolute top-0 end-0 bg-danger text-white px-2 py-1 m-2 rounded fw-bold">
              -%{discountRate}
            </span>
          )}
        </div>
        
        <div className="card-body">
          <h5 className="card-title text-truncate">{product.name}</h5>
          
          <div className="mt-3">
            {product.discountedPrice ? (
              <div className="d-flex align-items-center gap-2">
                <span className="text-decoration-line-through text-muted fs-6">
                  {product.price.toLocaleString('tr-TR')} TL
                </span>
                <span className="text-danger fw-bold fs-5">
                  {product.discountedPrice.toLocaleString('tr-TR')} TL
                </span>
              </div>
            ) : (
              <span className="fw-bold fs-5 text-dark">
                {product.price.toLocaleString('tr-TR')} TL
              </span>
            )}
          </div>
          
          <Link href={`/products/${product.id}`} className="btn btn-outline-dark w-100 mt-3 stretched-link">
            İncele
          </Link>
        </div>
      </div>
    </div>
  );
}