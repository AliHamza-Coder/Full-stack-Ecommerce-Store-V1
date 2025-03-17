import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function OrderConfirmationPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-6">
          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-300" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-600 mb-4">Thank You for Your Order!</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
          Your order has been confirmed and will be shipped soon. We'll send you an email with tracking information once
          your order is on its way.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

