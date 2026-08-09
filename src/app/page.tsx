import Hero from "@/components/home/Hero";
import { getSquareCatalog } from "@/lib/square/catalog";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Footer from "@/components/layout/Footer"

export default async function HomePage() {
  const products = await getSquareCatalog();

  return (
    <main>
      <Hero products={products} />
      <FeaturedProducts products={products} />
      <Footer />
    </main>
  );
}
