import Image from "next/image"
import { fetchOtherImages } from "@/utils/fetchData";

export default async function AboutPage() {
  const aboutImage = await fetchOtherImages();

  return (
    <section className="bg-gray-50 dark:bg-gray-800 w-full">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">About Atlantis Sports</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Your trusted partner in sports and fitness equipment since 2010.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div className="relative h-[400px] rounded-lg overflow-hidden bg-white">
          <Image
            src={
              aboutImage?.about_us_image || "/placeholder.svg?height=800&width=800"
            }
            alt="About Atlantis Sports"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">Our Story</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Founded in 2010, Atlantis Sports has been dedicated to providing high-quality sports equipment and gear to
            athletes of all levels. Our journey began with a simple mission: to make premium sports equipment accessible
            to everyone.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Over the years, we've grown from a small local shop to a trusted name in the sports industry, serving
            thousands of satisfied customers worldwide. Our commitment to quality, innovation, and customer satisfaction
            remains at the heart of everything we do.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <div className="text-3xl font-bold dark:text-gray-300 text-primary mb-2">10K+</div>
          <div className="text-gray-600 dark:text-gray-300">Happy Customers</div>
        </div>
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <div className="text-3xl font-bold dark:text-gray-300 text-primary mb-2">1000+</div>
          <div className="text-gray-600 dark:text-gray-300">Products</div>
        </div>
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <div className="text-3xl font-bold dark:text-gray-300 text-primary mb-2">50+</div>
          <div className="text-gray-600 dark:text-gray-300">Brand Partners</div>
        </div>
      </div>

      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">Our Values</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          We believe in providing the highest quality products, exceptional customer service, and fostering a community
          of sports enthusiasts. Our team is passionate about helping you achieve your fitness goals with the right
          equipment and support.
        </p>
      </div>
    </div>
    </section>
  )
}

