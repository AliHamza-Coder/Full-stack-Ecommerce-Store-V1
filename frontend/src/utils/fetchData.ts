// Exporting the interfaces for BannerImages
export interface OtherImages {
  id: number;
  banner1_image: string;
  banner2_image: string;
  about_us_image: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string; // Added slug property
  price: number;
  description: string;
  rating: number;
  image: string;
  title: string;
  Variation_Options: string[];
  Variation_Prices: string[];
  gallery: string[];
}

// Function to generate slug from product name
export const generateSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// Function to fetch all products and add slug
export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_Backend_APP_URL}/items/products?fields=*,gallery.*,Variations.*`);
    const data = await res.json();

    return data.data?.map((item: any) => {
      const imageUrl = item.image ? `${process.env.NEXT_Asset_URL}/${item.image}` : null;
      const galleryImages = item.gallery && item.gallery.length > 0
        ? item.gallery.map((img: any) => img.directus_files_id ? `${process.env.NEXT_Asset_URL}/${img.directus_files_id}` : null)
        : [];

      // Add the main image at the top of the gallery (if it's available)
      const updatedGallery = imageUrl ? [imageUrl, ...galleryImages] : galleryImages;

      return {
        id: item.id,
        name: item.name,
        slug: generateSlug(item.name), // Generate slug from name
        price: item.price,
        description: item.description,
        rating: item.rating,
        image: imageUrl, // Keep the main image as a separate field
        title: item.Variations?.title || "",
        Variation_Options: item.Variations?.Options || [],
        Variation_Prices: item.Variations?.prices || [],
        gallery: updatedGallery, // Gallery starts with the main image
      };
    }) || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Function to fetch a single product by slug
export async function getProduct(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((product) => product.slug === slug) || null;
}

// Function to fetch related products (excluding the current product)
export async function getRelatedProducts(currentProductSlug: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((product) => product.slug !== currentProductSlug).slice(0, 4);
}

// Function to fetch featured products (first 4)
export async function featuredProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.slice(0, 4);
}

// Function to fetch banner images
export const fetchOtherImages = async (): Promise<OtherImages | null> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_Backend_APP_URL}/items/Other_Images`);
    const data = await res.json();
    const otherImages: OtherImages = data.data;

    if (otherImages) {
      otherImages.banner1_image = `${process.env.NEXT_Asset_URL}/${otherImages.banner1_image}`;
      otherImages.banner2_image = `${process.env.NEXT_Asset_URL}/${otherImages.banner2_image}`;
      otherImages.about_us_image = `${process.env.NEXT_Asset_URL}/${otherImages.about_us_image}`;
    }
    
    return otherImages;
  } catch (error) {
    console.error("Error fetching banner images:", error);
    return null;
  }
};
