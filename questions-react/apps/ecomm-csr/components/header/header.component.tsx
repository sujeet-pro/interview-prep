import { useMemo } from 'react'
import { useCart } from '../../modules/cart'
import styles from './header.module.css'

export function Header() {
  const { cartItems } = useCart()
  const itemsCount = useMemo(() => {
    return Object.values(cartItems).reduce((a, b) => a + b, 0)
  }, [cartItems])
  return <header className={styles.header}>React Fetch API: Cart Count ({itemsCount}) </header>
}
