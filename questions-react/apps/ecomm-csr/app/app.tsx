import { useState } from 'react'
import { Grid } from '../components/grid/grid.component'
import { Header } from '../components/header'
import { Pagination } from '../components/pagination'
import { ProductCard } from '../components/product-card/product-card.component'
import { useProducts } from '../useProducts/basic-fetch'
import { CartProvider } from '../modules/cart'
import './app.css'
const PAGE_SIZE = 12

function getCurrentPage() {
  try {
    const params = new URLSearchParams(window.location.search)
    const page = Number(params.get('page'))
    if (page) return page
  } catch {
    return 1
  }
  return 1
}

export function App() {
  const [currentPage, setCurrentPage] = useState(getCurrentPage)
  const [productsResponse] = useProducts((currentPage - 1) * PAGE_SIZE, PAGE_SIZE)
  return (
    <CartProvider>
      <Header />
      <section className="my-2 p-2 flex justify-between items-center">
        <h2 className="text-xl">Products {productsResponse ? `(${productsResponse?.total})` : null}</h2>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil((productsResponse?.total || 0) / PAGE_SIZE)}
          onPageChange={pageNumber => setCurrentPage(pageNumber)}
          pageSize={PAGE_SIZE}
        />
      </section>
      <main>
        <Grid>{productsResponse?.products?.map(product => <ProductCard product={product} key={product.id} />)}</Grid>
      </main>
    </CartProvider>
  )
}
