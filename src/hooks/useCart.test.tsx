import { renderHook, act } from '@testing-library/react';
import { useCart } from './useCart';
import { Watch } from '../types';

const rolex: Watch = { id: 1, brand: 'Rolex', model: 'Submariner', priceEur: 12000, stock: 3 };
const omega: Watch = { id: 2, brand: 'Omega', model: 'Speedmaster', priceEur: 6500, stock: 5 };

describe('useCart', () => {
  it('initialise un panier vide', () => {
    const { result } = renderHook(() => useCart());
    expect(result.current.items).toEqual([]);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it('ajoute une nouvelle montre avec quantity 1', () => {
    const { result } = renderHook(() => useCart());
    act(() => result.current.addItem(rolex));
    expect(result.current.items).toEqual([{ watch: rolex, quantity: 1 }]);
    expect(result.current.totalItems).toBe(1);
    expect(result.current.totalPrice).toBe(12000);
  });

  it('incrémente la quantité quand la même montre est ajoutée plusieurs fois', () => {
    const { result } = renderHook(() => useCart());
    act(() => result.current.addItem(rolex));
    act(() => result.current.addItem(rolex));
    act(() => result.current.addItem(rolex));
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(3);
    expect(result.current.totalItems).toBe(3);
    expect(result.current.totalPrice).toBe(36000);
  });

  it('cumule plusieurs montres distinctes', () => {
    const { result } = renderHook(() => useCart());
    act(() => result.current.addItem(rolex));
    act(() => result.current.addItem(omega));
    expect(result.current.items).toHaveLength(2);
    expect(result.current.totalItems).toBe(2);
    expect(result.current.totalPrice).toBe(12000 + 6500);
  });

  it('retire une ligne avec removeItem (peu importe la quantité)', () => {
    const { result } = renderHook(() => useCart());
    act(() => result.current.addItem(rolex));
    act(() => result.current.addItem(rolex));
    act(() => result.current.addItem(omega));
    act(() => result.current.removeItem(rolex.id));
    expect(result.current.items).toEqual([{ watch: omega, quantity: 1 }]);
    expect(result.current.totalItems).toBe(1);
  });

  it('vide le panier avec clear', () => {
    const { result } = renderHook(() => useCart());
    act(() => result.current.addItem(rolex));
    act(() => result.current.addItem(omega));
    act(() => result.current.clear());
    expect(result.current.items).toEqual([]);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });
});
