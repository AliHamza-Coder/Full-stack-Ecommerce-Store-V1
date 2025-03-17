import Image from "next/image";
import Link from "next/link";
import { fetchOtherImages } from "@/utils/fetchData";

export default async function ProductBanners() {
  const bannerImages = await fetchOtherImages();

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Banner 1: Image Left, Content Right */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src={
                  bannerImages?.banner1_image || "/placeholder.svg?height=800&width=800"
                }
                alt="Premium Sports Equipment"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
            </div>
            <div className="lg:pl-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Premium Sports Equipment
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Discover our collection of high-quality sports equipment
                designed for professional athletes and enthusiasts alike. Our
                products are crafted with precision and durability in mind,
                ensuring optimal performance during your activities.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Professional-grade materials
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Ergonomic designs for comfort
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Tested by professional athletes
                </li>
              </ul>
              <Link
                href="/shop"
                className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-md transition-colors"
              >
                Shop Equipment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Banner 2: Content Left, Image Right */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Athletic Apparel Collection
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Elevate your performance with our premium athletic apparel.
                Designed with advanced moisture-wicking technology and
                breathable fabrics, our clothing ensures maximum comfort during
                intense workouts.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
                  <div className="text-primary font-bold text-2xl mb-1 dark:text-gray-300">
                    30%
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">
                    Improved breathability
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
                  <div className="text-primary font-bold text-2xl mb-1 dark:text-gray-300">2x</div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">
                    Durability compared to standard
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
                  <div className="text-primary font-bold text-2xl mb-1 dark:text-gray-300">
                    100%
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">
                    Satisfaction guarantee
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
                  <div className="text-primary font-bold text-2xl mb-1 dark:text-gray-300">
                    UPF 50+
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">
                    Sun protection factor
                  </div>
                </div>
              </div>
              <Link
                href="/shop/apparel"
                className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-md transition-colors"
              >
                Explore Apparel
              </Link>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden order-1 lg:order-2">
              <Image
                src={ bannerImages?.banner2_image ||"/placeholder.svg?height=800&width=800"}
                alt="Athletic Apparel"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/40 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

