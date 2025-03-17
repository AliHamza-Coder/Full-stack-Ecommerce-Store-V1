"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ShoppingCart,
  Minus,
  Plus,
} from "lucide-react";
import type { Product } from "@/utils/fetchData";
import { useCart } from "@/lib/cart-context";
import ProductCard from "@/Components/product-card";
import { Button } from "@/Components/ui/button";

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetail({
  product,
  relatedProducts,
}: ProductDetailProps) {
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % product.gallery.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + product.gallery.length) % product.gallery.length
    );
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-600  mb-8 group"
      >
        <ArrowLeft className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
        Back
      </button>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative  w-full aspect-square overflow-hidden rounded-lg">
            <Image
              src={product.gallery[currentImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.gallery.map((image, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={`relative aspect-square overflow-hidden rounded-lg ${
                  currentImage === i ? "ring-2 ring-primary" : ""
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} view ${i + 1}`}
                  fill
                  className={`object-cover transition-opacity ${
                    currentImage === i
                      ? "opacity-100"
                      : "opacity-50 hover:opacity-75"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-600 mb-4">
            {product.name}
          </h1>

          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2 text-gray-600 dark:text-gray-400">
              ({product.rating})
            </span>
          </div>

          <div className="text-3xl font-bold text-gray-900 dark:text-gray-600 mb-6">
            ${product.price}
          </div>

          <div
            className="text-gray-600 dark:text-gray-300 mb-8"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />


          <div className="flex items-center space-x-4 mb-8">
            <div className="flex items-center border rounded-md">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-4 py-2 text-center min-w-[3rem]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button onClick={handleAddToCart} className="flex-1" size="lg">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {/* You May Also Like */}
      <div className="border-t dark:border-gray-800 pt-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          You May Also Like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {!relatedProducts || relatedProducts.length === 0 ? (
            <div className="flex items-center justify-center text-center">
              <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
                We currently don't have any products available. Please check
                back soon for our new arrivals!
              </p>
            </div>
          ) : (
            relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
