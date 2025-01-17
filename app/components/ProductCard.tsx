'use client'

import { styled } from '../context/vstitches.config'
import Image from 'next/image'
import Link from 'next/link'
import { Package } from 'lucide-react'
import { useCart } from '../context/CartContext'

const Card = styled('div', {
  backgroundColor: 'white',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
})

const ExclusiveTag = styled('div', {
  position: 'absolute',
  top: '1rem',
  left: '1rem',
  backgroundColor: '$secondary',
  color: 'white',
  padding: '0.25rem 0.75rem',
  borderRadius: '4px',
  fontSize: '0.875rem',
  fontWeight: 'bold',
})

const ProductImage = styled('div', {
  position: 'relative',
  width: '100%',
  paddingTop: '100%',
  backgroundColor: '#f8f8f8',
})

const ProductInfo = styled('div', {
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
})

const ProductCode = styled('div', {
  textAlign: 'center',
  color: '$muted',
  fontSize: '0.875rem',
})

const ProductName = styled('h3', {
  fontSize: '1rem',
  textAlign: 'center',
  margin: '0.5rem 0',
})

const PackageInfo = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  color: '$muted',
  fontSize: '0.875rem',
  marginTop: 'auto',
})

const ColorOptions = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.25rem',
  justifyContent: 'center',
  margin: '0.5rem 0',
})

const ColorSwatch = styled('div', {
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  border: '1px solid $border',
  cursor: 'pointer',

  '&:hover': {
    transform: 'scale(1.1)',
  },
})

type ProductCardProps = {
  product: {
    codigo_produto: number
    nome: string
    valor_home: string
    imagem_produto: string
  }
}

const AVAILABLE_COLORS = [
  '#FF0000', '#0000FF', '#008000', '#FFFF00', '#800080',
  '#FFA500', '#000000', '#808080', '#FF69B4', '#00FFFF'
]

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart()

  const addToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.codigo_produto,
        name: product.nome,
        price: parseFloat(product.valor_home),
        quantity: 1,
      },
    })
  }

  return (
    <Card>
      <ExclusiveTag>EXCLUSIVO!</ExclusiveTag>
      <Link href={`/product/${product.codigo_produto}`}>
        <ProductImage>
          <Image
            src={product.imagem_produto || '/placeholder.svg'}
            alt={product.nome}
            fill
            style={{ objectFit: 'contain', padding: '1rem' }}
          />
        </ProductImage>
      </Link>
      <ProductInfo>
        <ProductCode>- {product.codigo_produto} -</ProductCode>
        <ProductName>{product.nome}</ProductName>
        <ColorOptions>
          {AVAILABLE_COLORS.map((color) => (
            <ColorSwatch
              key={color}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </ColorOptions>
        <button onClick={addToCart}>Add to Cart</button>
        <PackageInfo>
          <Package size={16} />
          Com embalagem especial
        </PackageInfo>
      </ProductInfo>
    </Card>
  )
}

