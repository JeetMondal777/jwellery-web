// store/wishlistStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlist: [],
      setWishlist: (items) => set({ wishlist: items }),
      addToWishlist: (item) =>
        set((state) => ({
          wishlist: [...state.wishlist, item],
        })),
      removeFromWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item._id !== id),
        })),
      isWishlisted: (id) => {
        return get().wishlist.some((item) => item._id === id);
      },
    }),
    {
      name: 'wishlist-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useWishlistStore;
