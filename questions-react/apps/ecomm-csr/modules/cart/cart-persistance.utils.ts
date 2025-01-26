import { CartItems } from "./cart.hook"

const LS_KEY = 'ls_cart_items'

export function getCartItems(): CartItems {
    try {
        const cartItemsStr = localStorage.getItem(LS_KEY)
        if (cartItemsStr) return JSON.parse(cartItemsStr) as CartItems
    } catch (err) {
        console.error(err)
    }
    return {} as CartItems
}

export function saveCartItems(cartItems: CartItems) {
    try {
        localStorage.setItem(LS_KEY, JSON.stringify(cartItems))
    } catch (err) {
        return getCartItems()
    }
}