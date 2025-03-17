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
  price: number;
  description: string;
  rating: number;
  image: string;
  title:string;
  Variation_Options:string[];
  Variation_Prices:string[];
  gallery: string[];
}


// use this code while backend not run then it still stable app 
// export async function getProducts(): Promise<Product[]> {
//   const fetchData = async (url: string) => {
//     try {
//       const res = await fetch(url);
//       if (!res.ok) throw new Error(`Failed to fetch from ${url}`);
//       const data = await res.json();
//       return data.data;
//     } catch (error) {
//       console.error(`Error fetching from ${url}:`, error);
//       return null;
//     }
//   };

//   // First API attempt
//   let products = await fetchData(`${process.env.NEXT_PUBLIC_Backend_APP_URL}/items/products?fields=*,gallery.*,Variations.*`);

//   // If first API fails, try the fallback API
//   if (!products) {
//     products = await fetchData(`${process.env.NEXT_PUBLIC_Backend_APP_URL}/api/products`);
//   }

//   // If both fail, throw an error
//   if (!products) {
//     throw new Error("Failed to fetch products from both sources.");
//   }

//   return products.map((item: any) => {
//     const imageUrl = item.image ? `${process.env.NEXT_Asset_URL}/${item.image}` : null;
//     const galleryImages = item.gallery && item.gallery.length > 0
//       ? item.gallery.map((img: any) => img.directus_files_id ? `${process.env.NEXT_Asset_URL}/${img.directus_files_id}` : null)
//       : [];

//     const updatedGallery = imageUrl ? [imageUrl, ...galleryImages] : galleryImages;

//     return {
//       id: item.id,
//       name: item.name,
//       price: item.price,
//       description: item.description,
//       rating: item.rating,
//       image: imageUrl,
//       title: item.Variations?.title || '',
//       Variation_Options: item.Variations?.Options || [],
//       gallery: updatedGallery,
//     };
//   });
// }


export async function getProducts(): Promise<Product[]> {
  try{
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
      price: item.price,
      description: item.description,
      rating: item.rating,
      image: imageUrl, // Keep the main image as a separate field
      title: item.Variations?.title || '',
      Variation_Options: item.Variations?.Options || [],
      Variation_Prices: item.Variations?.prices || [],
      gallery: updatedGallery, // Gallery starts with the main image
    };
  });
  }

  catch (error) {
    return [];
  }
}

export async function getProduct(id: number): Promise<Product | null> {
  const products = await getProducts();
  return products.find((product) => product.id === id) || null;
}

export async function getRelatedProducts(currentProductId: number): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((product) => product.id !== currentProductId).slice(0, 4);
}

export async function featuredProducts() : Promise<Product[]> {
  const products = await getProducts();
  if(!products){
    return[];
  }
  return products.filter((product) => product).slice(0, 4);
}

// Function to fetch banner images
export const fetchOtherImages = async (): Promise<OtherImages | null> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_Backend_APP_URL}/items/Other_Images`);
    const data = await res.json();
    const OtherImages: OtherImages = data.data;
    if(OtherImages){
      OtherImages.banner1_image = `${process.env.NEXT_Asset_URL}/${OtherImages.banner1_image}`
      OtherImages.banner2_image = `${process.env.NEXT_Asset_URL}/${OtherImages.banner2_image}`
      OtherImages.about_us_image = `${process.env.NEXT_Asset_URL}/${OtherImages.about_us_image}`
    }
    return OtherImages;
  } catch (error) {
    return null;
  }
};