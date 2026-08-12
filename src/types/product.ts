/**
 * A single variation belonging to a Square catalogue item.
 */
export type ProductVariation = {
  /**
   * Square variation ID.
   */
  id: string;

  /**
   * Variation name from Square.
   *
   * Example: "Gojo", "Geto", "Silver", "Large".
   */
  name: string;

  /**
   * Variation price in the product currency.
   */
  price: number;

  /**
   * Currency returned by Square.
   */
  currency: string;

  /**
   * Current inventory for this variation.
   */
  stock: number;

  /**
   * Image belonging specifically to this variation.
   */
  imageUrl?: string;
};

/**
 * A Square catalogue item displayed by Lazuli.
 *
 * A product can contain one or many variations.
 */
export type Product = {
  /**
   * Square catalogue item ID.
   */
  id: string;

  /**
   * Existing/default Square variation ID.
   *
   * Kept for backwards compatibility while the
   * variation system is introduced.
   */
  variationId: string;

  /**
   * Product name.
   */
  name: string;

  /**
   * Product description.
   */
  description?: string;

  /**
   * Current/default product price.
   *
   * This will eventually come from the selected
   * variation on the product page.
   */
  price: number;

  /**
   * Product currency.
   */
  currency: string;

  /**
   * Default/product image.
   */
  imageUrl?: string;

  /**
   * Product category.
   */
  category?: string;

  /**
   * Current/default stock.
   *
   * This remains temporarily for compatibility
   * with existing cards and catalogue filtering.
   */
  stock: number;

  /**
   * All Square variations belonging to this product.
   *
   * Products with no meaningful variation choices
   * will contain one variation.
   */
  variations: ProductVariation[];

  /**
   * Whether the product is featured.
   */
  featured?: boolean;

  /**
   * Whether the product is trending.
   */
  trending?: boolean;
};