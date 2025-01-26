import { useEffect, useState } from 'react'
import { ProductsResponse } from '../../types/product'

async function getProducts(skip: number, limit: number) {
  const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
  const data: ProductsResponse = await res.json()
  return data
}

export function useProducts(skip: number, limit: number) {
  const [products, setProducts] = useState<ProductsResponse | null>(null)

  useEffect(() => {
    getProducts(skip, limit).then(productsResponse => {
      setProducts(productsResponse)
    })
  }, [limit, skip])

  return [products]
}
