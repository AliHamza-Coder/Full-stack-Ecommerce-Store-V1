import { Shield, Truck, RotateCcw, HeadphonesIcon } from "lucide-react"

const services = [
  {
    id: 1,
    title: "Free Shipping",
    description: "Free shipping on all orders over $100",
    icon: Truck,
  },
  {
    id: 2,
    title: "Secure Payment",
    description: "100% secure payment methods",
    icon: Shield,
  },
  {
    id: 3,
    title: "Easy Returns",
    description: "30-day money-back guarantee",
    icon: RotateCcw,
  },
  {
    id: 4,
    title: "24/7 Support",
    description: "Dedicated support team available",
    icon: HeadphonesIcon,
  },
]

export default function OurServices() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Our Services</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We provide exceptional services to enhance your shopping experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center 
                        transition-all duration-300 hover:shadow-lg hover:bg-primary hover:text-white 
                        dark:hover:bg-primary group"
            >
              <div
                className="inline-flex items-center justify-center p-3 bg-primary text-white rounded-full mb-4
                            group-hover:bg-white group-hover:text-primary"
              >
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-white">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 group-hover:text-white">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

