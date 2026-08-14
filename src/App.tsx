import { WatchCard } from './components/WatchCard';
import { useCart } from './hooks/useCart';
import { useWatches } from './hooks/useWatches';
import { formatPriceEur } from './utils/price';

export function App(): JSX.Element {
  const cart = useCart();
  const { watches, loading, error, reload } = useWatches();

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
      <h1>Montres de luxe</h1>

      {loading && <p>Chargement…</p>}

      {error && (
        <p style={{ color: 'crimson' }}>
          Erreur : {error}{' '}
          <button onClick={reload}>Réessayer</button>
        </p>
      )}

      {!loading && !error && (
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 16,
          }}
        >
          {watches.map((w) => (
            <WatchCard key={w.id} watch={w} onAddToCart={cart.addItem} />
          ))}
        </section>
      )}

      <aside style={{ marginTop: 32 }}>
        <h2>
          Panier ({cart.totalItems}), {formatPriceEur(cart.totalPrice)}
        </h2>
        <button onClick={cart.clear} disabled={cart.totalItems === 0}>
          Vider
        </button>
      </aside>
    </main>
  );
}
