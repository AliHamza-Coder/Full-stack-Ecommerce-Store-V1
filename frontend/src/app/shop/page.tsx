import ProductCard from "@/Components/ui/product-card";
import { getProducts } from "@/utils/fetchData";

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <section className="bg-gray-50 dark:bg-gray-800 w-full">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-lvh">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          All Products
        </h1>
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Showing {products?.length || 0} products
        </div>
      </div>
      {!products || products.length === 0 ? (
        <div className="flex items-center justify-center text-center min-h-96">
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300 w-1/3">
            We currently don't have any products available. Please check back
            soon for our new arrivals!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 my-16">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
    </section>
  );
}
