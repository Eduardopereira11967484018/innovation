'use client'

import { useState, useEffect } from 'react'
import { styled } from '../../context/vstitches.config'
import { useCart } from '../../context/CartContext'
import Image from 'next/image'
import { Package, Truck, Calendar } from 'lucide-react'

const Main = styled('main', {
  maxWidth: '1200px',
  margin: '2rem auto',
  padding: '0 1rem',
})

const ProductContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  backgroundColor: 'white',
  borderRadius: '8px',
  padding: '1rem',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',

  '@md': {
    flexDirection: 'row',
    padding: '2rem',
  },
})

const ImageContainer = styled('div', {
  position: 'relative',
  width: '100%',
  height: '300px',

  '@md': {
    width: '50%',
    height: 'auto',
  },
})

const ThumbnailContainer = styled('div', {
  display: 'flex',
  gap: '0.5rem',
  marginTop: '1rem',
})

const Thumbnail = styled('div', {
  width: '60px',
  height: '60px',
  position: 'relative',
  cursor: 'pointer',
  border: '2px solid transparent',

  '&:hover': {
    border: '2px solid $primary',
  },
})

const ProductInfo = styled('div', {
  flex: 1,
})

const ProductName = styled('h1', {
  fontSize: '1.5rem',
  marginBottom: '0.5rem',

  '@md': {
    fontSize: '2rem',
  },
})

const ProductCode = styled('div', {
  color: '$muted',
  fontSize: '0.875rem',
  marginBottom: '1rem',
})

const ProductPrice = styled('p', {
  fontSize: '1.25rem',
  fontWeight: 'bold',
  color: '$primary',
  marginBottom: '1rem',

  '@md': {
    fontSize: '1.5rem',
  },
})

const AddToCartButton = styled('button', {
  backgroundColor: '$primary',
  color: 'white',
  border: 'none',
  padding: '0.75rem 1.5rem',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1rem',
  transition: 'background-color 0.2s',
  width: '100%',

  '&:hover': {
    backgroundColor: '$secondary',
  },

  '@md': {
    width: 'auto',
  },
})

const ProductDetails = styled('div', {
  marginTop: '2rem',
})

const DetailItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginBottom: '0.5rem',
})

const CustomizationOptions = styled('div', {
  marginTop: '2rem',
})

const CustomizationTitle = styled('h3', {
  fontSize: '1.2rem',
  marginBottom: '1rem',
})

const CustomizationList = styled('ul', {
  listStyle: 'none',
  padding: 0,
})

const CustomizationItem = styled('li', {
  marginBottom: '0.5rem',
})

interface ProductDetailsProps {
  productPromise: Promise<{ 
    codigo_produto: string; 
    nome: string; 
    valor_home: string; 
    imagem_produto: string; 
    imagens_produto: { id: string; url: string }[]; 
    dimensoes: string; 
    quantidade_minima: number; 
    prazo_minimo_entrega: number; 
    personalizacoes: { codigo_impressao: string; descricao_impressao: string }[] 
  }>
}

export default function ProductDetailsComponent({ productPromise }: ProductDetailsProps) {
  const [product, setProduct] = useState<{
    codigo_produto: string;
    nome: string;
    valor_home: string;
    imagem_produto: string;
    imagens_produto: { id: string; url: string }[];
    dimensoes: string;
    quantidade_minima: number;
    prazo_minimo_entrega: number;
    personalizacoes: { codigo_impressao: string; descricao_impressao: string }[];
  } | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const { dispatch } = useCart()

  useEffect(() => {
    productPromise.then((data) => {
      setProduct(data)
      setSelectedImage(data.imagem_produto)
    })
  }, [productPromise])

  const addToCart = () => {
    if (product) {
      dispatch({
        type: 'ADD_ITEM',
        payload: {
          id: parseInt(product.codigo_produto, 10),
          name: product.nome,
          price: parseFloat(product.valor_home),
          quantity: 1,
        },
      })
    }
  }

  if (!product) {
    return (
      <Main>
        <div>Carregando produto...</div>
      </Main>
    )
  }

  return (
    <Main>
      <ProductContainer>
        <ImageContainer>
          <Image
            src={selectedImage || product.imagem_produto}
            alt={product.nome}
            fill
            style={{ objectFit: 'contain' }}
          />
          <ThumbnailContainer>
            {product.imagens_produto?.map((img: { id: string; url: string }) => (
              <Thumbnail key={img.id} onClick={() => setSelectedImage(img.url)}>
                <Image 
                  src={img.url || "/placeholder.svg"} 
                  alt={product.nome} 
                  fill 
                  style={{ objectFit: 'cover' }} 
                />
              </Thumbnail>
            ))}
          </ThumbnailContainer>
        </ImageContainer>
        <ProductInfo>
          <ProductName>{product.nome}</ProductName>
          <ProductCode>Código: {product.codigo_produto}</ProductCode>
          <ProductPrice>
            {product.valor_home === "0.00" 
              ? "Preço sob consulta" 
              : `R$ ${parseFloat(product.valor_home).toFixed(2)}`
            }
          </ProductPrice>
          <AddToCartButton onClick={addToCart}>Adicionar ao Carrinho</AddToCartButton>
          <ProductDetails>
            <DetailItem>
              <Package size={16} />
              Dimensões: {product.dimensoes}
            </DetailItem>
            <DetailItem>
              <Truck size={16} />
              Quantidade mínima: {product.quantidade_minima}
            </DetailItem>
            <DetailItem>
              <Calendar size={16} />
              Prazo mínimo de entrega: {product.prazo_minimo_entrega} dias úteis
            </DetailItem>
          </ProductDetails>
          <CustomizationOptions>
            <CustomizationTitle>Opções de Personalização:</CustomizationTitle>
            <CustomizationList>
              {product.personalizacoes?.map((personalizacao: { codigo_impressao: string; descricao_impressao: string }) => (
                <CustomizationItem key={personalizacao.codigo_impressao}>
                  {personalizacao.descricao_impressao}
                </CustomizationItem>
              ))}
            </CustomizationList>
          </CustomizationOptions>
        </ProductInfo>
      </ProductContainer>
    </Main>
  )
}

