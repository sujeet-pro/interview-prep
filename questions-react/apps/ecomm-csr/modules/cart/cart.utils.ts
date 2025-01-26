import { CartItems } from './cart.hook'

export function getUpdatedCart(
  cartItems: CartItems,
  productIdToUpdate: string | number,
  quantityToUpdate: number,
): CartItems {
  const productIdToUpdateStr = String(productIdToUpdate)
  if (Object.hasOwn(cartItems, productIdToUpdateStr)) {
    const entries = []
    for (const [productId, quantity] of Object.entries(cartItems)) {
      let finalQuantity = quantity
      if (productId === productIdToUpdateStr) {
        finalQuantity += quantityToUpdate
      }
      if (finalQuantity > 0) {
        entries.push([productId, finalQuantity])
      }
    }
    return Object.fromEntries(entries)
  } else if (quantityToUpdate > 0) {
    return {
      ...cartItems,
      [productIdToUpdateStr]: quantityToUpdate,
    }
  }
  return cartItems
}

export function isSameCartItems(
  cartItem1: CartItems,
  cartItem2: CartItems,
): boolean {
  const keys1 = Object.keys(cartItem1)
  const keys2 = Object.keys(cartItem2)
  if (keys1.length !== keys2.length) return false
  return keys1.every(key => cartItem1[key] === cartItem2[key])
}
