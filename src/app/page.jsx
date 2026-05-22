

import { Collections, Hero, MoreProof, ProofStrip } from '@/components/home';
import { HomePageProductsClient } from '@/components/home-products';
import { getCollection } from '@/shopify/fetches';
import { Suspense } from 'react';

// ─── PAGE EXPORT ──────────────────────────────────────────────────────────────
export default function StorePage() {
  return (
    <>
      {/* <Nav /> */}
      <Hero />
      <ProofStrip />
      <Collections />
     <Suspense fallback={<p>Loading…</p>}>
  <HomePageProducts />
</Suspense>
      <MoreProof />
    </>
  );
}

 async function HomePageProducts() {
  const collection = await getCollection("488234778870")
  const products = collection.products
  if (products.length === 0) return <>No products!</>
  return <HomePageProductsClient products={products} paginateBy={32}/>
}
 