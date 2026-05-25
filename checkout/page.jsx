'use client'

import { useState } from 'react'
import { createUnpaidOrder } from '@/shopify/admin'
import { readCartCookie } from '@/shopify/cart'
import { fetchCartFromShopify, clearShopifyCart } from '@/shopify/fetches'

export default function CheckoutPage() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const fd = new FormData(e.target)

    const cartId = await readCartCookie('midnightMuse')
    if (!cartId) return (setLoading(false), setError('No cart found.'))

    const { cart } = await fetchCartFromShopify(cartId)
    if (!cart?.lines?.nodes?.length) return (setLoading(false), setError('Cart is empty.'))

    try {
      const order = await createUnpaidOrder({
        email:       fd.get('email'),
        firstName:   fd.get('firstName'),
        lastName:    fd.get('lastName'),
        phone:       fd.get('phone'),
        address1:    fd.get('address1'),
        city:        fd.get('city'),
        province:    fd.get('province'),
        zip:         fd.get('zip'),
        countryCode: 'ID',
      }, cart.lines.nodes.map(l => ({ variantId: l.merchandise.id, quantity: l.quantity })))

      await clearShopifyCart(cartId, cart.lines.nodes.map(l => l.id))
      window.location.href = `/order/${order.token}`
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '60px auto', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', gap: 10 }}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input name="email"     placeholder="Email"      autoComplete="email"           required style={inp} />
      <input name="firstName" placeholder="First name" autoComplete="given-name"      required style={inp} />
      <input name="lastName"  placeholder="Last name"  autoComplete="family-name"     required style={inp} />
      <input name="phone"     placeholder="Phone"      autoComplete="tel"                      style={inp} />
      <input name="address1"  placeholder="Address"    autoComplete="address-line1"   required style={inp} />
      <input name="city"      placeholder="City"       autoComplete="address-level2"  required style={inp} />
      <input name="province"  placeholder="Province"   autoComplete="address-level1"           style={inp} />
      <input name="zip"       placeholder="ZIP"        autoComplete="postal-code"     required style={inp} />
      <button type="submit" disabled={loading} style={{ padding: 12, background: '#000', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 15 }}>
        {loading ? 'Placing…' : 'Place order'}
      </button>
    </form>
  )
}

const inp = { padding: '10px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 15, width: '100%', boxSizing: 'border-box' }