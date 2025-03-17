import { featuredProducts } from "@/utils/fetchData";
import ProductCard from "./product-card";

export default async function FeaturedProducts() {
  const products = await featuredProducts();

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Featured Products
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our top-rated sports gear and equipment for your athletic
            journey.
          </p>
        </div>

        {!products || products.length === 0 || products.length < 4 ? (
          <div className="flex items-center justify-center text-center h-64">
            <p className="text-lg font-medium text-gray-600 dark:text-gray-300 w-1/3">
              We currently don't have any products available. Please check back
              soon for our new arrivals!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
