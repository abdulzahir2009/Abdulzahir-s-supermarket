import type { Product } from "../data/products";

export type CartItem = { product: Product; qty: number };

export function getCartSummary(items: CartItem[]) {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const delivery = subtotal >= 50000 ? 0 : 2000;
  const discount = items.reduce((sum, item) => {
    const saved = item.product.originalPrice ? (item.product.originalPrice - item.product.price) * item.qty : 0;
    return sum + saved;
  }, 0);
  const total = subtotal + delivery;

  return { subtotal, delivery, discount, total };
}
