"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-600  mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-800 w-full">
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items - Spans 2 Columns on Larger Screens */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md"
            >
              {/* Image - Fix Sizing */}
              <div className="relative h-24 w-24 flex-shrink-0">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>

              {/* Product Info - Prevent Extra Space Issues */}
              <div className="flex-1 min-w-0 px-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                  {item.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  ${item.price}
                </p>
              </div>

              {/* Quantity Controls - Keep in Row */}
              <div className="flex items-center border rounded-md dark:text-white">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  disabled={item.quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 text-center min-w-[3rem]">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* Remove Button - Keep Small */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="p-2 text-red-500 hover:text-red-600 transition-colors"
                aria-label="Remove item"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary - Sticky on Large Screens */}
        <div className="lg:col-span-1 lg:sticky top-16 h-fit bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Order Summary
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between text-base">
              <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
              <span className="font-medium text-gray-900 dark:text-white">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-base">
              <span className="text-gray-600 dark:text-gray-300">Shipping</span>
              <span className="font-medium text-gray-900 dark:text-white">
                Free
              </span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex justify-between text-lg font-semibold">
                <span className="text-gray-900 dark:text-white">Total</span>
                <span className="text-gray-900 dark:text-white">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="w-full inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              Proceed to Checkout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
    </section>

  );
}
