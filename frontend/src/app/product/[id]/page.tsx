import { getProduct, getRelatedProducts } from "@/utils/fetchData";
import ProductDetail from "./product-detail";

// Convert ProductPage to an async function with explicit params handling
export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const productId = Number.parseInt(params.id); // Convert params.id to a number

  // Fetch the product details using the parsed productId
  const product = await getProduct(productId);

  // Handle case if the product is not found
  if (!product) {
    return null;
  }

  // Fetch related products for the current product
  const relatedProducts = await getRelatedProducts(product.id);

  // Render the product details page with the fetched product and related products
  return <ProductDetail product={product} relatedProducts={relatedProducts} />;
}

// import { getProduct, getRelatedProducts } from "@/utils/products"
// import ProductDetail from "./product-detail"

// export default async function ProductPage({ params }: { params: { id: string } }) {
//   const product = await getProduct(Number.parseInt(params.id))

//   if (!product) {
//     return null
//   }

//   const relatedProducts = await getRelatedProducts(product.id)

//   return <ProductDetail product={product} relatedProducts={relatedProducts} />
// }
