'use client'

import { styled } from '../context/vstitches.config'
import { useCart } from '../context/CartContext'
import Link from 'next/link'

const CartButton = styled('button', {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  position: 'relative',
})

const CartCount = styled('span', {
  position: 'absolute',
  top: '-8px',
  right: '-8px',
  backgroundColor: '$blue500',
  color: 'white',
  borderRadius: '50%',
  padding: '2px 6px',
  fontSize: '0.75rem',
})

export default function CartIcon() {
  const { state } = useCart()
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Link href="/cart">
      <CartButton>
        🛒
        {itemCount > 0 && <CartCount>{itemCount}</CartCount>}
      </CartButton>
    </Link>
  )
}

