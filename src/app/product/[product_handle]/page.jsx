// layout.jsx
import ProductPage from "./client-page"
import { getCollection, getProduct } from "@/shopify/fetches"
import '@/styles/product.css'

export default async function layout({ children, params }) {
  const { product_handle } = await params
  const product = await getProduct(product_handle)

  // Get 2nd collection id, fallback to 1st, fallback to null
  const collections = product?.collections ?? []
  const targetCollection = collections[1] ?? collections[0] ?? null

  const similarProducts = targetCollection
    ? (await getCollection(targetCollection.id))?.products ?? []
    : []
    console.log('similarProducts',similarProducts)
const collectionId = targetCollection?.id?.split('/').pop() ?? null // "123456789"

  return (
    <div>
      <ProductPage product={product} similarProducts={similarProducts} similarProductCollectionId={collectionId} />
    </div>
  )
}