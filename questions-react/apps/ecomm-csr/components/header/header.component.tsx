import { useMemo } from 'react'
import { useCart } from '../../modules/cart'
import { CiShoppingCart } from 'react-icons/ci'

export function Header() {
  const { cartItems } = useCart()
  const itemsCount = useMemo(() => {
    return Object.values(cartItems).reduce((a, b) => a + b, 0)
  }, [cartItems])
  return (
    <header className="flex justify-between items-center p-4 bg-gray-200">
      <span>Ecomm</span>
      <span className="flex items-center gap-2">
        <CiShoppingCart /> ({itemsCount})
      </span>
    </header>
  )
}
