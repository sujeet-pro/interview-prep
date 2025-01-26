import { useCallback, useEffect, useMemo, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { getCartItems, saveCartItems } from './cart-persistance.utils'
import { getUpdatedCart, isSameCartItems } from './cart.utils'
import { cartContext, CartItems } from './cart.hook'

export function CartProvider({ children }: PropsWithChildren<unknown>) {
  const [cartItems, setCartItemsIternal] = useState<CartItems>(getCartItems)
  const [broadCastChannel, setBroadCastChannel] =
    useState<BroadcastChannel | null>(null)

  const setCartItems = useCallback((newCartItems: CartItems) => {
    setCartItemsIternal(prev => {
      if (isSameCartItems(prev, newCartItems)) return prev
      return newCartItems
    })
  }, [])

  const updateQuantity = useCallback(
    (productId: string | number, quantity: number) => {
      const newCartItems = getUpdatedCart(cartItems, productId, quantity)
      console.log(`newCartItems`, newCartItems)
      setCartItems(newCartItems)
    },
    [cartItems, setCartItems],
  )

  useEffect(() => {
    saveCartItems(cartItems)
    if (broadCastChannel && cartItems) {
      console.log(`BroadCasted`)
      broadCastChannel.postMessage(cartItems)
    }
  }, [cartItems, broadCastChannel])

  useEffect(() => {
    try {
      const channel = new BroadcastChannel('cartItems_channel')
      channel.onmessage = e => {
        console.log(`BroadCast event`, e)
        setCartItems(e.data)
      }
      setBroadCastChannel(channel)
      return () => {
        channel.close()
      }
    } catch (err) {
      console.error(err)
    }
  }, [])

  const value = useMemo(
    () => ({ cartItems, setCartItems, updateQuantity }),
    [cartItems, updateQuantity, setCartItems],
  )

  return <cartContext.Provider value={value}>{children}</cartContext.Provider>
}
