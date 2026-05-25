import { getOrderByToken } from '@/shopify/admin'
import OrderClient from './page-client'

export default async function OrderPage({ params }) {
  const { token } = await params
  const order = await getOrderByToken(token)

  if (!order) {
    return <p style={{ fontFamily: 'sans-serif', margin: 60 }}>Order not found.</p>
  }

  return <OrderClient order={order} token={token} />
}