import { useEffect, useState } from 'react'
import { ProductsResponse } from '../../types/product'

async function getProducts(skip: number, limit: number, signal?: AbortSignal) {
  const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`, { signal })
  const data: ProductsResponse = await res.json()
  return data
}

export function useProducts(skip: number, limit: number) {
  const [products, setProducts] = useState<ProductsResponse | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    getProducts(skip, limit, controller.signal).then(productsResponse => {
      setProducts(productsResponse)
    })
    return () => {
      controller.abort()
    }
  }, [limit, skip])

  return [products]
}
