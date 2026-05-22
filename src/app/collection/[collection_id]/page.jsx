// layout.jsx
import CollectionPage, { CollectionHero } from "./client-page"
import { ShopifyProvider } from "./provider"
import { getCollection } from "@/shopify/fetches"

const COLLECTION_IDS = [
  "488234778870",
  "488967012598",
  "488966979830",
  "488865530102",
  "488967045366",
  "488967110902",
  "488967078134",
]
export default async function layout({ children, params, searchParams }) {
  const { collection_id }    = await params
  const resolvedSearchParams = await searchParams
  const results     = await Promise.all(COLLECTION_IDS.map(id => getCollection(id)))
  const collections = Object.fromEntries(COLLECTION_IDS.map((id, i) => [id, results[i]]))

  return (
    <ShopifyProvider
      collections={collections}
      activeId={collection_id}
      searchParams={resolvedSearchParams}
    >
      <div>
        <CollectionHero />
        <CollectionPage searchParams={resolvedSearchParams}/>
      </div>
    </ShopifyProvider>
  )
}