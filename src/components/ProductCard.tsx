import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, MessageCircle, Star } from 'lucide-react';
import { Product } from '../types.ts';
import { useShop } from '../context/ShopContext.tsx';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isInWishlist, toggleWishlist, addToCart, openProductDetail, openOrderPanel } = useShop();
  const [imageError, setImageError] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const primaryImage = product.images && product.images.length > 0 ? product.images[0] : '';

  return (
    <div className="group flex flex-col bg-white border border-slate-200/90 rounded-2xl overflow-hidden hover:shadow-md hover:border-pink-200 transition-all duration-200 h-full">
      
      {/* 1. Image Area with consistent aspect ratio (Meesho 4:3 or square responsive) */}
      <div 
        onClick={() => openProductDetail(product)}
        className="relative aspect-[4/3] bg-slate-50 overflow-hidden cursor-pointer"
      >
        {!imageError && primaryImage ? (
          <img
            src={primaryImage}
            alt={product.name}
            onError={() => setImageError(true)}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400 p-4 text-center">
            <span className="text-[10px] font-bold uppercase text-[#9F2089] tracking-wider mb-1">
              {product.category}
            </span>
            <span className="text-xs font-medium text-slate-500 line-clamp-2">
              {product.name}
            </span>
          </div>
        )}

        {/* Genuine Discount Tag */}
        {product.discountPercent && product.discountPercent > 0 && (
          <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded-md bg-pink-50 border border-pink-200/80 text-[#9F2089] text-[10px] font-extrabold tracking-tight shadow-2xs">
            {product.discountPercent}% off
          </span>
        )}

        {/* Wishlist Button - Clean floating circle like Meesho */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
            isFavorited
              ? 'bg-white text-pink-600 shadow-md ring-1 ring-pink-200'
              : 'bg-white/90 text-slate-400 hover:text-pink-600 hover:bg-white shadow-2xs'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-pink-600' : ''}`} />
        </button>

        {/* Quick View Pill on Desktop Hover */}
        <div className="hidden sm:flex absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center pointer-events-none">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openProductDetail(product);
            }}
            className="pointer-events-auto px-3 py-1.5 bg-white/95 text-slate-800 text-xs font-bold rounded-lg shadow-md flex items-center gap-1.5 hover:bg-white hover:text-[#9F2089] transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* 2. Content Area */}
      <div className="p-3 sm:p-3.5 flex flex-col flex-1 justify-between gap-2.5 bg-white">
        
        <div>
          {/* Category & Availability */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
            <span className="truncate max-w-[65%]">{product.category}</span>
            <span className={`text-[10px] font-semibold ${product.inStock ? 'text-emerald-700' : 'text-slate-400'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* Product Name (strictly limited to two lines) */}
          <h3
            onClick={() => openProductDetail(product)}
            className="text-xs sm:text-sm font-medium text-slate-800 group-hover:text-[#9F2089] transition-colors line-clamp-2 cursor-pointer leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>
        </div>

        {/* Price, Discount & Genuine Ratings (Meesho signature layout) */}
        <div className="space-y-1.5">
          {/* Price line */}
          <div className="flex items-baseline flex-wrap gap-1.5">
            <span className="text-sm sm:text-base font-extrabold text-slate-900 tabular-nums">
              ₹{product.sellingPrice.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && product.originalPrice > product.sellingPrice && (
              <span className="text-xs text-slate-400 line-through tabular-nums">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            {product.discountPercent && (
              <span className="text-[11px] font-bold text-emerald-600">
                {product.discountPercent}% off
              </span>
            )}
          </div>

          {/* Rating & Review Count (Verified data only) */}
          <div className="flex items-center gap-2">
            {product.rating && (
              <div className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-emerald-700 text-white text-[10px] font-extrabold">
                <span>{product.rating}</span>
                <Star className="w-2.5 h-2.5 fill-white" />
              </div>
            )}
            {product.reviewsCount && (
              <span className="text-[11px] text-slate-500">
                ({product.reviewsCount})
              </span>
            )}
            <span className="text-[10px] font-medium text-slate-500 ml-auto bg-slate-100 px-1.5 py-0.5 rounded">
              All-India
            </span>
          </div>
        </div>

        {/* Action Buttons Grid */}
        <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-1.5 sm:gap-2">
          
          {/* Add to Cart button */}
          <button
            onClick={() => addToCart(product, 1)}
            disabled={!product.inStock}
            className="w-full py-2 px-2 text-slate-700 bg-slate-100 hover:bg-pink-50 hover:text-[#9F2089] disabled:opacity-50 text-[11px] font-semibold rounded-lg transition-colors flex items-center justify-center gap-1 border border-slate-200/60"
            title="Add to shopping cart"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#9F2089]" />
            <span className="hidden xs:inline">Add</span>
            <span>Cart</span>
          </button>

          {/* Buy Now (Triggers WhatsApp Order Modal) */}
          <button
            onClick={() => openOrderPanel(product)}
            disabled={!product.inStock}
            className="w-full py-2 px-2 bg-[#25D366] hover:bg-[#20ba59] disabled:opacity-50 text-white text-[11px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1 shadow-2xs"
            title="Order directly on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span>Buy Now</span>
          </button>

        </div>

      </div>

    </div>
  );
};
