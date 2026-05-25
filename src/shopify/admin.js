'use server'

import { nanoid } from 'nanoid'

async function adminRequest(query, variables = {}) {
  const res = await fetch(
    `https://${process.env.SHOPIFY_STORE}.myshopify.com/admin/api/2025-07/graphql.json`,
    {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    }
  )
  const json = await res.json()
  if (json.errors?.length) throw new Error(JSON.stringify(json.errors))
  return json
}

export async function createUnpaidOrder(address, lineItems) {
  const token = nanoid(16)
  const { data } = await adminRequest(`
    mutation orderCreate($order: OrderCreateOrderInput!) {
      orderCreate(order: $order) {
        order { id name tags totalPriceSet { shopMoney { amount currencyCode } } }
        userErrors { field message }
      }
    }
  `, {
    order: {
      email: address.email,
      financialStatus: 'PENDING',
      tags: [`token_${token}`],
      lineItems: lineItems.map(i => ({ variantId: i.variantId, quantity: i.quantity })),
      shippingAddress: {
        firstName:   address.firstName,
        lastName:    address.lastName,
        phone:       address.phone ?? '',
        address1:    address.address1,
        city:        address.city,
        province:    address.province ?? '',
        zip:         address.zip,
        countryCode: address.countryCode ?? 'ID',
      },
    }
  })
  const errors = data?.orderCreate?.userErrors
  if (errors?.length) throw new Error(errors.map(e => e.message).join(', '))
  const numericId = data?.orderCreate?.order?.id?.split('/').pop()
  return { ...data?.orderCreate?.order, token: numericId }
}
export async function getOrderByToken(id) {
  const { data } = await adminRequest(`{
    order(id: "gid://shopify/Order/${id}") {
      id name tags
      displayFinancialStatus
      createdAt
      email
      totalPriceSet { shopMoney { amount currencyCode } }
      lineItems(first: 20) {
        nodes {
          title
          quantity
          originalUnitPriceSet { shopMoney { amount } }
          image { url altText }
          variant {
            sku
            selectedOptions { name value }
            image { url altText }
          }
        }
      }
      shippingAddress {
        firstName lastName
        address1 city province zip countryCodeV2
      }
    }
  }`)
  return data?.order ?? null
}

export async function claimOrder(orderId, existingTags) {
  await adminRequest(`
    mutation tagsAdd($id: ID!, $tags: [String!]!) {
      tagsAdd(id: $id, tags: $tags) {
        userErrors { message }
      }
    }
  `, { id: orderId, tags: [...existingTags, 'payment:claimed'] })
}