"use client"

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface SlideProps {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
}

const tempSlider: SlideProps[] = [
  {
    id: 1,
    imageUrl: "/placeholder.svg?height=600&width=1200",
    title: "New Collection",
    description: "Discover our latest sports gear",
  },
  {
    id: 2,
    imageUrl: "/placeholder.svg?height=600&width=1200",
    title: "Summer Sale",
    description: "Up to 50% off on selected items",
  },
  {
    id: 3,
    imageUrl: "/placeholder.svg?height=600&width=1200",
    title: "Premium Equipment",
    description: "Professional gear for serious athletes",
  },
]

export default function ImageSlider() {
  const [slides, setSlides] = useState<SlideProps[]>(tempSlider);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_Backend_APP_URL}/items/slider_images`);
        const data = await res.json();
  
        if (data && data.data) {
          const sliderImages: SlideProps[] = data.data.map((item: any) => ({
            id: item.id,
            imageUrl: item.image
              ? `${process.env.NEXT_PUBLIC_Backend_APP_URL}/assets/${item.image}`
              : "/placeholder.svg",
            title: item.title,
            description: item.description,
          }));
          setSlides(sliderImages);
        }
      } catch (error) {
        setSlides(tempSlider); // Fallback to tempSlider
      }
    };
  
    fetchSlides();
  }, []);
  

  useEffect(() => {
    if (slides.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [slides]);

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      {slides.length > 0 && (
        <>
          <div
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide) => (
              <div key={slide.id} className="min-w-full h-full relative">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <Image
                  src={slide.imageUrl || "/placeholder.svg"}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20 p-4 text-center">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">{slide.title}</h2>
                  <p className="text-lg md:text-xl">{slide.description}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={goToPrevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-30 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={goToNextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-30 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${currentSlide === index ? "bg-white" : "bg-white/50"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}







// "use client"

// import { useState, useEffect } from "react"
// import { ChevronLeft, ChevronRight } from "lucide-react"
// import Image from "next/image"

// interface SlideProps {
//   id: number
//   imageUrl: string
//   title: string
//   description: string
// }

// // Sample slide data
// const slides = [
//   {
//     id: 1,
//     imageUrl: "/placeholder.svg?height=600&width=1200",
//     title: "New Collection",
//     description: "Discover our latest sports gear",
//   },
//   {
//     id: 2,
//     imageUrl: "/placeholder.svg?height=600&width=1200",
//     title: "Summer Sale",
//     description: "Up to 50% off on selected items",
//   },
//   {
//     id: 3,
//     imageUrl: "/placeholder.svg?height=600&width=1200",
//     title: "Premium Equipment",
//     description: "Professional gear for serious athletes",
//   },
// ]

// export default function ImageSlider() {
//   const [currentSlide, setCurrentSlide] = useState(0)

//   // Auto-slide functionality
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
//     }, 5000)

//     return () => clearInterval(interval)
//   }, [])

//   const goToPrevSlide = () => {
//     setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
//   }

//   const goToNextSlide = () => {
//     setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
//   }

//   return (
//     <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
//       {/* Slides */}
//       <div
//         className="flex transition-transform duration-500 ease-in-out h-full"
//         style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//       >
//         {slides.map((slide) => (
//           <div key={slide.id} className="min-w-full h-full relative">
//             <div className="absolute inset-0 bg-black/40 z-10" />
//             <Image
//               src={slide.imageUrl || "/placeholder.svg"}
//               alt={slide.title}
//               fill
//               className="object-cover"
//               priority
//             />
//             <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20 p-4 text-center">
//               <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">{slide.title}</h2>
//               <p className="text-lg md:text-xl">{slide.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Navigation Arrows */}
//       <button
//         onClick={goToPrevSlide}
//         className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-30 transition-colors"
//         aria-label="Previous slide"
//       >
//         <ChevronLeft className="h-6 w-6" />
//       </button>

//       <button
//         onClick={goToNextSlide}
//         className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-30 transition-colors"
//         aria-label="Next slide"
//       >
//         <ChevronRight className="h-6 w-6" />
//       </button>

//       {/* Slide Indicators */}
//       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentSlide(index)}
//             className={`w-3 h-3 rounded-full ${currentSlide === index ? "bg-white" : "bg-white/50"}`}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }

