import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";

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
   * Decide which badge should appear.
   *
   * Featured takes priority over Trending.
   */
  const badge = product.featured
    ? "POPULAR"
    : product.trending
      ? "TRENDING"
      : null;

  const inStock = product.stock > 0;

  return (
    <Link
      href={`/catalogue/${product.id}`}
      className="group block min-w-0"
    >
      <article
        className="
          overflow-hidden
          rounded-[0.7rem]
          border border-[#E6E2EB]
          bg-white
          transition-all duration-300
          hover:border-[#D8D0E2]
          hover:shadow-[0_6px_18px_rgba(41,32,92,0.07)]
        "
      >

        {/* =====================================
            PRODUCT IMAGE
        ====================================== */}

        <div className="relative aspect-[1/0.94] overflow-hidden bg-[#F5F3F7]">

          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="
                h-full
                w-full
                object-cover
                transition-transform
                duration-500
                ease-out
                group-hover:scale-[1.025]
              "
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-[8px] uppercase tracking-[0.18em] text-[#9A91A4]">
                No image
              </span>
            </div>
          )}

          {/* =================================
              FAVOURITE
          ================================== */}

          <div className="absolute right-2.5 top-2.5">
            <button
              type="button"
              aria-label={`Add ${product.name} to favourites`}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
              className="
                flex h-7 w-7
                items-center justify-center
                rounded-full
                bg-white/90
                text-[#68627A]
                shadow-sm
                backdrop-blur-sm
                transition-colors
                hover:text-[#6539B8]
              "
            >
              <Heart
                size={13}
                strokeWidth={1.5}
              />
            </button>
          </div>

          {/* =================================
              BADGE
          ================================== */}

          {badge && (
            <div className="absolute left-2.5 top-2.5">
              <span
                className="
                  rounded-[0.35rem]
                  bg-[#6539B8]
                  px-2
                  py-1
                  text-[7px]
                  font-semibold
                  uppercase
                  tracking-[0.08em]
                  text-white
                "
              >
                {badge}
              </span>
            </div>
          )}

        </div>

        {/* =====================================
            PRODUCT INFORMATION
        ====================================== */}

        <div className="px-2.5 pb-2.5 pt-2.5">

          {/* Product name */}

          <h2
            className="
              truncate
              text-[11px]
              font-medium
              leading-4
              text-[#29205C]
              transition-colors
              group-hover:text-[#6539B8]
            "
          >
            {product.name}
          </h2>

          {/* Price */}

          <p className="mt-0.5 text-[11px] font-semibold text-[#29205C]">
            ${product.price.toFixed(2)}
          </p>

          {/* =================================
              BOTTOM ROW
          ================================== */}

          <div className="mt-1.5 flex items-center justify-between gap-2">

            {/* Stock */}

            <div className="flex min-w-0 items-center gap-1.5">

              <span
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                  inStock
                    ? "bg-[#58B89A]"
                    : "bg-[#B7B2BF]"
                }`}
              />

              <span className="truncate text-[8px] text-[#817A8F]">
                {inStock
                  ? `${product.stock} available`
                  : "Out of stock"}
              </span>

            </div>

            {/* Cart button */}

            <button
              type="button"
              aria-label={`Add ${product.name} to cart`}
              disabled={!inStock}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
              className={`
                flex h-7 w-7 shrink-0
                items-center justify-center
                rounded-[0.4rem]
                transition-all duration-200
                ${
                  inStock
                    ? "bg-[#F1E9FF] text-[#6539B8] hover:bg-[#6539B8] hover:text-white"
                    : "cursor-not-allowed bg-[#F3F1F4] text-[#B7B2BF]"
                }
              `}
            >
              <ShoppingCart
                size={13}
                strokeWidth={1.6}
              />
            </button>

          </div>

        </div>
      </article>
    </Link>
  );
}