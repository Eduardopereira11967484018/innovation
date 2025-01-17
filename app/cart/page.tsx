'use client'

import { styled } from '../context/vstitches.config'
import Header from '../components/Header'
import { useCart } from '../context/CartContext'

const Main = styled('main', {
  maxWidth: '800px',
  margin: '2rem auto',
  padding: '0 1rem',
})

const CartItem = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  backgroundColor: 'white',
  borderRadius: '8px',
  marginBottom: '1rem',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',

  '@md': {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

const ItemInfo = styled('div', {
  marginBottom: '1rem',

  '@md': {
    marginBottom: 0,
    flex: 1,
  },
})

const ItemName = styled('h3', {
  marginBottom: '0.5rem',
})

const ItemPrice = styled('p', {
  color: '$primary',
})

const ItemActions = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  '@md': {
    justifyContent: 'flex-end',
  },
})

const QuantityInput = styled('input', {
  width: '50px',
  padding: '0.25rem',
  marginRight: '1rem',
})

const RemoveButton = styled('button', {
  backgroundColor: '#ef4444',
  color: 'white',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#dc2626',
  },
})

const Total = styled('div', {
  fontSize: '1.25rem',
  fontWeight: 'bold',
  textAlign: 'right',
  marginTop: '2rem',

  '@md': {
    fontSize: '1.5rem',
  },
})

export default function CartPage() {
  const { state, dispatch } = useCart()

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  const total = state.items.reduce((sum, item) => {
    const itemPrice = typeof item.price === 'number' ? item.price : 0
    const itemQuantity = typeof item.quantity === 'number' ? item.quantity : 0
    return sum + itemPrice * itemQuantity
  }, 0)

  return (
    <>
      <Header />
      <Main>
        <h1>Seu Carrinho</h1>
        {state.items.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          <>
            {state.items.map((item) => (
              <CartItem key={item.id}>
                <ItemInfo>
                  <ItemName>{item.name}</ItemName>
                  <ItemPrice>
                    R$ {typeof item.price === 'number' ? item.price.toFixed(2) : '0.00'}
                  </ItemPrice>
                </ItemInfo>
                <ItemActions>
                  <QuantityInput
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                  />
                  <RemoveButton onClick={() => removeItem(item.id)}>
                    Remover
                  </RemoveButton>
                </ItemActions>
              </CartItem>
            ))}
            <Total>Total: R$ {total.toFixed(2)}</Total>
          </>
        )}
      </Main>
    </>
  )
}

