import Link from "next/link";
import { Heart } from "lucide-react";

type Product = {
  id: string;
  variationId: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  imageUrl?: string;
  category?: string;
  stock: number;
  featured?: boolean;
  trending?: boolean;
};

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  /*
   * Decide which badge should appear on the product.
   *
   * Featured takes priority over Trending.
   */
  const badge = product.featured
    ? "POPULAR"
    : product.trending
      ? "TRENDING"
      : null;

  return (
    <Link
      href={`/catalogue/${product.id}`}
      className="group block"
    >
      <article className="overflow-hidden rounded-2xl border border-[#E8E3F0] bg-white shadow-[0_2px_10px_rgba(81,74,120,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(81,74,120,0.12)]">

        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-[#F1EDF8]">

          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-[#8A8697]">
              No image available
            </div>
          )}

          {/* Product Badge */}
          {badge && (
            <div className="absolute left-3 top-3">
              <span className="rounded-md bg-[#5C28AD] px-2 py-1 text-[9px] font-semibold tracking-wide text-white">
                {badge}
              </span>
            </div>
          )}

          {/* Favourite Icon */}
          <div className="absolute right-3 top-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-all duration-200 group-hover:bg-white">
              <Heart
                size={15}
                strokeWidth={1.8}
                className="text-[#6E6A7D] transition-colors group-hover:text-[#5C28AD]"
              />
            </div>
          </div>
        </div>

        {/* Product Information */}
        <div className="px-3.5 pb-4 pt-3">

          {/* Product Name */}
          <h2 className="truncate text-sm font-medium text-[#29263A] transition-colors group-hover:text-[#5C28AD]">
            {product.name}
          </h2>

          {/* Price */}
          <p className="mt-1 text-sm font-semibold text-[#5C28AD]">
            ${product.price.toFixed(2)}
          </p>

          {/* Stock */}
          <div className="mt-2 flex items-center gap-1.5">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                product.stock > 0
                  ? "bg-[#58B89A]"
                  : "bg-[#9A96A7]"
              }`}
            />

            <span className="text-[10px] text-[#8A8697]">
              {product.stock > 0
                ? "In Stock"
                : "Currently unavailable"}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}