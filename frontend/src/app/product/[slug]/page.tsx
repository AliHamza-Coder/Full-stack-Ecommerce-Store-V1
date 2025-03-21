import { notFound } from "next/navigation";
import { getProduct, getRelatedProducts } from "@/utils/fetchData";
import ProductDetail from "./product-detail";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await the promise to get the params object
  const resolvedParams = await params;

  if (!resolvedParams || !resolvedParams.slug) return notFound(); // Ensure slug exists

  const product = await getProduct(resolvedParams.slug); // Fetch the product

  if (!product) return notFound(); // If no product, return 404

  // Fetch related products
  const relatedProducts = await getRelatedProducts(product.slug);

  return <ProductDetail product={product} relatedProducts={relatedProducts} />;
}
