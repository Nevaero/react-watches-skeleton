import { useState } from 'react';
import { Watch, CartItem } from '../types';

export type UseCart = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (watch: Watch) => void;
  removeItem: (watchId: number) => void;
  clear: () => void;
};

/**
 * Hook de gestion d'un panier, fourni clé en main, le candidat n'a pas
 * à le toucher dans la version courante de l'exo.
 */
export function useCart(): UseCart {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (watch: Watch) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.watch.id === watch.id);
      if (existing) {
        return prev.map((i) =>
          i.watch.id === watch.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { watch, quantity: 1 }];
    });
  };

  const removeItem = (watchId: number) => {
    setItems((prev) => prev.filter((i) => i.watch.id !== watchId));
  };

  const clear = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.watch.priceEur * i.quantity, 0);

  return { items, totalItems, totalPrice, addItem, removeItem, clear };
}
