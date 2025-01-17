import Header from './components/Header'
import ProductList from './components/ProductList'

export default function Home() {
  return (
    <>
      <Header />
      <ProductList product={{
              codigo_produto: 0,
              nome: '',
              valor_home: '',
              imagem_produto: ''
          }} />
    </>
  )
}

