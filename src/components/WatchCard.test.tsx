import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { WatchCard } from './WatchCard';
import { Watch } from '../types';

const inStock: Watch = { id: 1, brand: 'Rolex', model: 'Submariner', priceEur: 12000, stock: 3 };
const soldOut: Watch = { id: 2, brand: 'Patek Philippe', model: 'Nautilus', priceEur: 45000, stock: 0 };

describe('WatchCard', () => {
  it('affiche la marque dans un <h3>', () => {
    render(<WatchCard watch={inStock} onAddToCart={() => {}} />);
    expect(screen.getByRole('heading', { level: 3, name: /rolex/i })).toBeInTheDocument();
  });

  it('affiche le modèle', () => {
    render(<WatchCard watch={inStock} onAddToCart={() => {}} />);
    expect(screen.getByText('Submariner')).toBeInTheDocument();
  });

  it('affiche le prix formaté dans data-testid="price"', () => {
    render(<WatchCard watch={inStock} onAddToCart={() => {}} />);
    expect(screen.getByTestId('price')).toHaveTextContent('12 000 €');
  });

  it('appelle onAddToCart(watch) au clic sur le bouton quand le stock est > 0', () => {
    const onAddToCart = vi.fn();
    render(<WatchCard watch={inStock} onAddToCart={onAddToCart} />);
    fireEvent.click(screen.getByRole('button', { name: /ajouter au panier/i }));
    expect(onAddToCart).toHaveBeenCalledTimes(1);
    expect(onAddToCart).toHaveBeenCalledWith(inStock);
  });

  it('désactive le bouton et affiche "Rupture" quand stock = 0', () => {
    const onAddToCart = vi.fn();
    render(<WatchCard watch={soldOut} onAddToCart={onAddToCart} />);
    const button = screen.getByRole('button', { name: /rupture/i });
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(onAddToCart).not.toHaveBeenCalled();
  });
});
