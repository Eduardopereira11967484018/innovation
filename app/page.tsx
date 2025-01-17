import Header from './components/Header'
import ProductList from './components/ProductList'

export default function Home() {
  return (
    <>
      <Header />
      <ProductList product={{ codigo_produto: 1, nome: 'Sample Product', valor_home: '100', imagem_produto: 'sample.jpg' }} />
    </>
  )
}

