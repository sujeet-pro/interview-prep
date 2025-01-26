import { FC } from "react";
import { Product } from "../../types/product";
import styles from "./product-card.module.css";
import { useCart } from "../../modules/cart";
export type ProductCardProps = {
  product: Product;
};

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { updateQuantity, cartItems } = useCart();
  return (
    <div className={styles.product}>
      <h3 className={styles.productTitle}>{product.title}</h3>
      <img src={product.thumbnail} className={styles.productImg} />
      <p className={styles.productDescription}>{product.description}</p>
      <div className={styles.action}>
        {!cartItems[product.id] ? (
          <button onClick={() => updateQuantity(product.id, 1)}>
            Add to cart
          </button>
        ) : (
          <>
            <button onClick={() => updateQuantity(product.id, -1)}>-1</button>
            {cartItems[product.id]}
            <button onClick={() => updateQuantity(product.id, 1)}>+1</button>
          </>
        )}
      </div>
    </div>
  );
};
