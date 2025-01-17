import { globalStyles } from '../app/context/vstitches.config'
import { CartProvider } from '../app/context/CartContext'

export const metadata = {
  title: 'Innovation Brindes',
  description: 'Teste técnico para vaga de Front-End',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  globalStyles()
  return (
    <html lang="pt-BR">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}

