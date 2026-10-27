/**
 * Black Tecno Shop – Application State Context
 * Handles cart, wishlist, recently viewed, modals, filters, and feedback notifications.
 */

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { CartItem, ModalType, PolicyTab, Product } from '../types.ts';
import { PRODUCTS } from '../data/products.ts';
import { STORE_CONFIG } from '../config/storeConfig.ts';

interface ShopContextType {
  // Products & Filtering
  products: Product[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  minPrice: number;
  setMinPrice: (price: number) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  inStockOnly: boolean;
  setInStockOnly: (val: boolean) => void;
  filteredProducts: Product[];
  resetFilters: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, size?: string, color?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartShippingFee: number;
  cartTotal: number;

  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
  wishlistProducts: Product[];

  // Recently Viewed
  recentlyViewed: Product[];
  addRecentlyViewed: (product: Product) => void;

  // Modals & Navigation
  activeModal: ModalType;
  selectedProduct: Product | null;
  selectedVariant: { size?: string; color?: string; quantity: number };
  setSelectedVariant: React.Dispatch<React.SetStateAction<{ size?: string; color?: string; quantity: number }>>;
  activePolicyTab: PolicyTab;
  setActivePolicyTab: (tab: PolicyTab) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;

  // Actions
  openProductDetail: (product: Product) => void;
  openOrderPanel: (product: Product, size?: string, color?: string, quantity?: number) => void;
  openCart: () => void;
  openWishlist: () => void;
  openAbout: () => void;
  openContact: () => void;
  openPolicy: (tab?: PolicyTab) => void;
  openOwnerGuide: () => void;
  closeModal: () => void;

  // Toast Notification
  toast: string | null;
  showToast: (msg: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'black_tecno_cart_v1';
const WISHLIST_STORAGE_KEY = 'black_tecno_wishlist_v1';
const RECENT_STORAGE_KEY = 'black_tecno_recent_v1';

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(30000);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Recently viewed IDs
  const [recentIds, setRecentIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(RECENT_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & Panels
  const [activeModal, setActiveModal] = useState<ModalType>('none');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<{ size?: string; color?: string; quantity: number }>({
    size: undefined,
    color: undefined,
    quantity: 1,
  });
  const [activePolicyTab, setActivePolicyTab] = useState<PolicyTab>('shipping');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toast
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 2800);
    return () => clearTimeout(timer);
  }, [toast]);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to persist cart to localStorage', e);
    }
  }, [cart]);

  // Persist wishlist
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Failed to persist wishlist to localStorage', e);
    }
  }, [wishlist]);

  // Persist recently viewed
  useEffect(() => {
    try {
      localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(recentIds));
    } catch (e) {
      console.warn('Failed to persist recently viewed to localStorage', e);
    }
  }, [recentIds]);

  // Add to recently viewed
  const addRecentlyViewed = (product: Product) => {
    setRecentIds((prev) => {
      const filtered = prev.filter((id) => id !== product.id);
      return [product.id, ...filtered].slice(0, 8);
    });
  };

  const recentlyViewed = useMemo(() => {
    return recentIds
      .map((id) => PRODUCTS.find((p) => p.id === id))
      .filter((p): p is Product => Boolean(p));
  }, [recentIds]);

  // Cart operations
  const addToCart = (product: Product, quantity = 1, size?: string, color?: string) => {
    const finalSize = size || (product.availableSizes ? product.availableSizes[0] : undefined);
    const finalColor = color || (product.availableColors ? product.availableColors[0] : undefined);
    const cartItemId = `${product.id}_${finalSize || 'def'}_${finalColor || 'def'}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            cartItemId,
            product,
            quantity,
            selectedSize: finalSize,
            selectedColor: finalColor,
          },
        ];
      }
    });

    showToast(`Added "${product.name.slice(0, 24)}..." to cart`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showToast('Item removed from cart');
  };

  const updateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.product.sellingPrice * item.quantity, 0);
  }, [cart]);

  const cartShippingFee = useMemo(() => {
    if (cart.length === 0) return 0;
    return cartSubtotal >= STORE_CONFIG.freeShippingThreshold ? 0 : STORE_CONFIG.standardShippingFee;
  }, [cartSubtotal, cart.length]);

  const cartTotal = useMemo(() => {
    return cartSubtotal + cartShippingFee;
  }, [cartSubtotal, cartShippingFee]);

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const wishlistCount = wishlist.length;

  const wishlistProducts = useMemo(() => {
    return wishlist
      .map((id) => PRODUCTS.find((p) => p.id === id))
      .filter((p): p is Product => Boolean(p));
  }, [wishlist]);

  // Filtering
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category match
      if (selectedCategory !== 'all') {
        const matchesCategory =
          item.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory.toLowerCase().replace(/\s+/g, '-') ||
          item.category.toLowerCase() === selectedCategory.toLowerCase();
        if (!matchesCategory) return false;
      }

      // In stock filter
      if (inStockOnly && !item.inStock) {
        return false;
      }

      // Min and Max price
      if (item.sellingPrice < minPrice || item.sellingPrice > maxPrice) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches =
          item.name.toLowerCase().includes(q) ||
          item.id.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') {
        return a.sellingPrice - b.sellingPrice;
      }
      if (sortBy === 'price-high') {
        return b.sellingPrice - a.sellingPrice;
      }
      if (sortBy === 'newest') {
        return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      }
      if (sortBy === 'discount') {
        return (b.discountPercent || 0) - (a.discountPercent || 0);
      }
      // default: recommended (featured first, then bestseller)
      const scoreA = (a.isFeatured ? 2 : 0) + (a.isBestseller ? 1 : 0);
      const scoreB = (b.isFeatured ? 2 : 0) + (b.isBestseller ? 1 : 0);
      return scoreB - scoreA;
    });
  }, [selectedCategory, inStockOnly, minPrice, maxPrice, searchQuery, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('recommended');
    setMinPrice(0);
    setMaxPrice(30000);
    setInStockOnly(false);
  };

  // Modal actions
  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setSelectedVariant({
      size: product.availableSizes ? product.availableSizes[0] : undefined,
      color: product.availableColors ? product.availableColors[0] : undefined,
      quantity: 1,
    });
    addRecentlyViewed(product);
    setActiveModal('product-detail');
  };

  const openOrderPanel = (product: Product, size?: string, color?: string, quantity = 1) => {
    setSelectedProduct(product);
    setSelectedVariant({
      size: size || (product.availableSizes ? product.availableSizes[0] : undefined),
      color: color || (product.availableColors ? product.availableColors[0] : undefined),
      quantity,
    });
    addRecentlyViewed(product);
    setActiveModal('order-panel');
  };

  const openCart = () => setActiveModal('cart');
  const openWishlist = () => setActiveModal('wishlist');
  const openAbout = () => setActiveModal('about');
  const openContact = () => setActiveModal('contact');
  const openPolicy = (tab: PolicyTab = 'shipping') => {
    setActivePolicyTab(tab);
    setActiveModal('policy');
  };
  const openOwnerGuide = () => setActiveModal('owner-guide');
  const closeModal = () => {
    setActiveModal('none');
    setIsMobileMenuOpen(false);
  };

  return (
    <ShopContext.Provider
      value={{
        products: PRODUCTS,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        inStockOnly,
        setInStockOnly,
        filteredProducts,
        resetFilters,

        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartShippingFee,
        cartTotal,

        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount,
        wishlistProducts,

        recentlyViewed,
        addRecentlyViewed,

        activeModal,
        selectedProduct,
        selectedVariant,
        setSelectedVariant,
        activePolicyTab,
        setActivePolicyTab,
        isMobileMenuOpen,
        setIsMobileMenuOpen,

        openProductDetail,
        openOrderPanel,
        openCart,
        openWishlist,
        openAbout,
        openContact,
        openPolicy,
        openOwnerGuide,
        closeModal,

        toast,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
