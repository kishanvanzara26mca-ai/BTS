/**
 * Black Tecno Shop – Central Store Configuration
 * All official brand details, contact channels, and WhatsApp order message builders.
 */

export interface StoreConfig {
  brandName: string;
  tagline: string;
  whatsappNumber: string;
  whatsappDisplayNumber: string;
  whatsappLink: string;
  instagramProfile: string;
  instagramUsername: string;
  businessEmail: string;
  emailLink: string;
  currencySymbol: string;
  operatingHours: string;
  supportAvailability: string;
  freeShippingThreshold: number;
  standardShippingFee: number;
}

export const STORE_CONFIG: StoreConfig = {
  brandName: 'Black Tecno Shop',
  tagline: 'Shop Smart. Order Easy.',
  whatsappNumber: '+919712363773',
  whatsappDisplayNumber: '+91 97123 63773',
  whatsappLink: 'https://wa.me/919712363773',
  instagramProfile: 'https://www.instagram.com/blacktecnoshop?srtk=MW5hdW53ZjhpeW41dg==',
  instagramUsername: '@blacktecnoshop',
  businessEmail: 'vanzarakisu17@gmail.com',
  emailLink: 'mailto:vanzarakisu17@gmail.com',
  currencySymbol: '₹',
  operatingHours: 'Monday – Sunday: 9:00 AM – 10:00 PM IST',
  supportAvailability: 'Instant replies during business hours via WhatsApp',
  freeShippingThreshold: 999,
  standardShippingFee: 49,
};

export interface ProductOrderOptions {
  productName: string;
  productId: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  imageUrl?: string;
  productUrl?: string;
}

/**
 * Builds the exact dynamically formatted WhatsApp order message as specified in Section 7.
 */
export function buildProductWhatsAppMessage(options: ProductOrderOptions): string {
  const currentUrl = options.productUrl || (typeof window !== 'undefined' ? window.location.href : '');
  const directImageUrl = options.imageUrl 
    ? (options.imageUrl.startsWith('http') ? options.imageUrl : (typeof window !== 'undefined' ? `${window.location.origin}${options.imageUrl}` : options.imageUrl))
    : 'Available in catalog';

  return `Hello Black Tecno Shop! I want to order this product.

Product: ${options.productName}
Product ID: ${options.productId}
Price: ₹${options.price.toLocaleString('en-IN')}
Quantity: ${options.quantity}
Size: ${options.size && options.size.trim() ? options.size : 'N/A'}
Color: ${options.color && options.color.trim() ? options.color : 'N/A'}

Product Image: ${directImageUrl}
Product Page: ${currentUrl}

Please confirm availability, delivery charges, delivery time, and payment options.

Thank you!`;
}

/**
 * Generates the WhatsApp URL with properly URL-encoded text parameter.
 */
export function getWhatsAppOrderUrl(options: ProductOrderOptions): string {
  const message = buildProductWhatsAppMessage(options);
  const cleanNumber = STORE_CONFIG.whatsappNumber.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

export interface CartOrderSummaryItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
}

/**
 * Builds a multi-item cart WhatsApp order message.
 */
export function buildCartWhatsAppMessage(items: CartOrderSummaryItem[], totalAmount: number): string {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const itemsText = items.map((item, index) => {
    const variantInfo = [
      item.size ? `Size: ${item.size}` : '',
      item.color ? `Color: ${item.color}` : '',
    ].filter(Boolean).join(', ');

    return `${index + 1}. ${item.name} (SKU: ${item.id})
   • Quantity: ${item.quantity}
   • Price: ₹${item.price.toLocaleString('en-IN')} each (Subtotal: ₹${(item.price * item.quantity).toLocaleString('en-IN')})
   ${variantInfo ? `• Variant: ${variantInfo}` : ''}`;
  }).join('\n\n');

  return `Hello Black Tecno Shop! I want to order multiple items from my cart.

ORDER SUMMARY:
${itemsText}

----------------------------
Total Items: ${items.reduce((acc, i) => acc + i.quantity, 0)}
Total Order Value: ₹${totalAmount.toLocaleString('en-IN')}
Catalog Link: ${currentUrl}
----------------------------

Please confirm stock availability, delivery charges for my pincode, delivery timeline, and payment options (UPI/Cash on Delivery/Bank Transfer).

Thank you!`;
}

/**
 * Generates WhatsApp URL for the multi-item cart order.
 */
export function getWhatsAppCartOrderUrl(items: CartOrderSummaryItem[], totalAmount: number): string {
  const message = buildCartWhatsAppMessage(items, totalAmount);
  const cleanNumber = STORE_CONFIG.whatsappNumber.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates WhatsApp URL for general store inquiries.
 */
export function getWhatsAppInquiryUrl(topic: string = 'General Inquiry'): string {
  const message = `Hello Black Tecno Shop! I have a question regarding: ${topic}. Could you please assist me?`;
  const cleanNumber = STORE_CONFIG.whatsappNumber.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
