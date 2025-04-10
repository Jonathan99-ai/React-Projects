import { products as initialProducts } from './mocks/products.json'
import { Products } from "./components/Products.jsx"
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { Cart } from './components/Cart.jsx'
import { IS_DEVELOPMENT } from './config.js'
import { useFilters } from './hooks/useFilters.js'
import { CartProvider } from './context/cart.jsx'

function App() {
  const { filters, filterProducts } = useFilters()

  const filteredProducts = filterProducts(initialProducts)

  return (
    <CartProvider>
      <Header />
      <Cart />
      <Products products={filteredProducts} />
      {IS_DEVELOPMENT && <Footer filters={filters} />}
    </CartProvider>
  )
}

export default App