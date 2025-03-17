"use client"

import React, { useEffect, useState } from 'react';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  rating: number;
  image: string;
  title: string;
  Variation_Options: string[];
  gallery: string[];
}

const Test = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_Backend_APP_URL;
        const apiUrl = `${backendUrl}/items/products?fields=*,gallery.*,Variations.*`;

        // console.log("Fetching from:", apiUrl); // Debugging line

        const res = await fetch(apiUrl);
        const responseData = await res.json();

        if (responseData.data) {
          const formattedProducts: Product[] = responseData.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            description: item.description,
            rating: item.rating,
            image: item.image,
            title: item.Variations?.title || '',
            Variation_Options: item.Variations?.Options || [],
            Variation_Prices: item.Variations?.prices || [],
            gallery: item.gallery || [],
          }));

          setProducts(formattedProducts);
          console.log("Fetched Products:", formattedProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Test</h1>
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </div>
  );
};

export default Test;
