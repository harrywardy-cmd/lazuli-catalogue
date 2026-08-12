import Hero from "@/components/home/Hero";
import { getSquareCatalog } from "@/lib/square/catalog";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Footer from "@/components/layout/Footer"
import CallToAction from "@/components/home/CallToAction";

export default async function HomePage() {
  const products = await getSquareCatalog();

  return (
    <main>
      <Hero products={products} />
      <FeaturedProducts products={products} />
      <CallToAction />
      <Footer />
    </main>
  );
}
