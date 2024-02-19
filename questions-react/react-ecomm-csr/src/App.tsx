import { useState } from "react";
import { Footer } from "./components/footer";
import { Grid } from "./components/grid/grid.component";
import { Header } from "./components/header";
import { Pagination } from "./components/pagination";
import { ProductCard } from "./components/product-card/product-card.component";
import { useProducts } from "./useProducts/basic-fetch";

const PAGE_SIZE = 12;

function getCurrentPage() {
  try {
    const params = new URLSearchParams(window.location.search);
    const page = Number(params.get("page"));
    if (page) return page;
  } catch {
    return 1;
  }
  return 1;
}

function App() {
  const [currentPage, setCurrentPage] = useState(getCurrentPage);
  const [productsResponse] = useProducts(
    (currentPage - 1) * PAGE_SIZE,
    PAGE_SIZE
  );
  return (
    <>
      <Header />
      <h1>Products</h1>
      <section className="status">
        <div>
          {productsResponse ? (
            <>
              Total: {productsResponse.total} | Limit: {productsResponse.limit}{" "}
              | Skip: {productsResponse.skip}
            </>
          ) : (
            <>Loading...</>
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil((productsResponse?.total || 0) / PAGE_SIZE)}
          onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
          pageSize={PAGE_SIZE}
        />
      </section>
      <main>
        <Grid>
          {productsResponse?.products?.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </Grid>
      </main>
      <Footer />
    </>
  );
}

export default App;
