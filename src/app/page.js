import { Suspense } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PriceTicker from "./components/PriceTicker";
import CategoryNav from "./components/CategoryNav";
import Footer from "./components/Footer";
import ProductSection from "./components/ProductSection";
import { getProducts, getCategories } from "./lib/api";

export default async function Home() {
  try {
    const [products, categories] = await Promise.all([
      getProducts(),
      getCategories(),
    ]);

    const priceUpProducts = products
      .filter((product) => product.change?.dir === "up")
      .slice(0, 6);
      
    const priceDownProducts = products
      .filter((product) => product.change?.dir === "down")
      .slice(0, 6);

    return (
      <div className="min-h-screen bg-[#F6FBF6]">
        <Navbar />
        <PriceTicker products={products} />
        <Hero />
        <main className="mx-auto max-w-7xl px-4 py-8">
          <CategoryNav categories={categories} />
          
          <Suspense fallback={<p>লোড হচ্ছে...</p>}>
            <ProductSection 
              title="আজকে দাম বেড়েছে" 
              description="যেসব পণ্যের দাম আজ বেড়েছে" 
              products={priceUpProducts} 
            />
          </Suspense>

          <Suspense fallback={<p>লোড হচ্ছে...</p>}>
            <ProductSection 
              title="আজকে দাম কমেছে" 
              description="যেসব পণ্যের দাম আজ কমেছে" 
              products={priceDownProducts} 
            />
          </Suspense>
          
          <Suspense fallback={<p>লোড হচ্ছে...</p>}>
            <ProductSection 
              title="সব পণ্য" 
              description="বাজারের উপলব্ধ সব পণ্য তালিকা" 
              products={products} 
            />
          </Suspense>
        </main>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Home page error:", error);
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F6FBF6]">
        <p className="text-red-500">
          ডেটা লোড করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।
        </p>
      </main>
    );
  }
}
