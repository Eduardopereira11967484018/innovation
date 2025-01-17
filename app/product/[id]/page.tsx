import { Suspense } from 'react'
import ProductDetails from './product-details'
import Header from '../../components/Header'

async function getProduct(id: string) {
  const res = await fetch(`https://apihomolog.innovationbrindes.com.br/api/site/v2/produto/${id}`, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch product')
  }
  return res.json()
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const productData = getProduct(params.id)

  return (
    <>
      <Header />
      <Suspense fallback={<div>Carregando produto...</div>}>
        <ProductDetails productPromise={productData} />
      </Suspense>
    </>
  )
}

