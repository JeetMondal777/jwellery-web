import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'
import toast from 'react-hot-toast'

const API = import.meta.env.VITE_API_URL

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],

      fetchCart: async () => {
        try {
          const token = localStorage.getItem('token')
          const res = await axios.get(`${API}/api/users/cart`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          set({ cartItems: res.data })
        } catch (err) {
          console.error('Failed to load cart', err)
          toast.error('Could not load cart')
        }
      },

      addToCart: async (item) => {
        try {
          const token = localStorage.getItem('token')
          await axios.post(
            `${API}/api/users/cart`,
            {
              title: item.title,
              imgLink: item.imgLink ?? item.imglink,
              price: item.price,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          )
          toast.success(`${item.title} added to cart!`)
        } catch (err) {
          console.error('Add to cart failed', err)
          toast.error('Could not add item to cart')
        } finally {
          get().fetchCart()
        }
      },

      removeFromCart: async (id) => {
        try {
          const token = localStorage.getItem('token')
          await axios.delete(`${API}/api/users/cart/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          toast.success('Item removed from cart')
        } catch (err) {
          console.error('Remove failed', err)
          toast.error('Could not remove item from cart')
        } finally {
          get().fetchCart()
        }
      },

      /**
       * Place an order (with delivery details) and remove 
       * the item from the cart in one go.
       *
       * @param {Object} product        the full product object
       * @param {Object} deliveryDetails  { name, number, location, landmark, state, pincode }
       */
      orderItem: async (product, deliveryDetails) => {
        const token = localStorage.getItem('token')
        const headers = { headers: { Authorization: `Bearer ${token}` } }

        // build the exact payload your modal was sending
        const payload = {
          title:      product.title,
          imgLink:    product.imgLink ?? product.imglink,
          price:      product.price,
          deliveryDetails,
        }

        try {
          // 1) place the order
          await axios.post(`${API}/api/users/order`, payload, headers)

          // 2) remove it from cart
          await axios.delete(
            `${API}/api/users/cart/${product._id}`,
            headers
          )

          toast.success(`Order placed for "${product.title}"!`)
        } catch (err) {
          console.error('Order failed:', err.response ?? err)
          const serverMsg = err.response?.data?.message
          toast.error(serverMsg || 'Something went wrong. Please try again.')
        } finally {
          // 3) refresh cart
          get().fetchCart()
        }
      },
    }),
    {
      name: 'cart-storage',
      getStorage: () => localStorage,
    }
  )
)

export default useCartStore
