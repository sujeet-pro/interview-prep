import { FC } from 'react'
import { Product } from '../../types/product'
import styles from './product-card.module.css'
import { useCart } from '../../modules/cart'
import clsx from 'clsx'
export type ProductCardProps = {
  product: Product
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { updateQuantity, cartItems } = useCart()
  return (
    <div className={clsx([styles.product, 'grid gap-2 '])}>
      <h3 className={clsx([styles.productTitle, 'm-0 py-1 text-lg'])}>{product.title}</h3>
      <img
        src={product.thumbnail}
        alt={product.title}
        className={clsx([styles.productImg, 'w-full object-cover aspect-square'])}
      />
      <p className={clsx([styles.productDescription, 'm-0'])}>{product.description}</p>
      <div className={styles.action}>
        {!cartItems[product.id] ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => updateQuantity(product.id, 1)}
          >
            Add to cart
          </button>
        ) : (
          <>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => updateQuantity(product.id, -1)}
            >
              -1
            </button>
            <span className="mx-2">{cartItems[product.id]}</span>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => updateQuantity(product.id, 1)}
            >
              +1
            </button>
          </>
        )}
      </div>
    </div>
  )
}
