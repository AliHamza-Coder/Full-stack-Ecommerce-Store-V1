import FeaturedProducts from "@/Components/featured-products";
import ImageSlider from "@/Components/image-slider";
import OurServices from "@/Components/our-services";
import ProductBanners from "@/Components/product-banners";

export default function Home() {
  return (
    <main>
      <ImageSlider />
      <FeaturedProducts />
      <OurServices />
      <ProductBanners />
    </main>
  )
}