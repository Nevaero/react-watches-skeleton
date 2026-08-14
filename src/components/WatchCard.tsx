import { Watch } from '../types';
import { formatPriceEur } from '../utils/price';

export type WatchCardProps = {
  watch: Watch;
  onAddToCart: (watch: Watch) => void;
};

/**
 * Composant carte d'une montre.
 *
 * Le squelette pose la structure du JSX. Tu n'as qu'à remplir les emplacements
 * marqués `TODO` dans le `return` ci-dessous, en utilisant les props et le
 * helper `formatPriceEur` (déjà importé).
 *
 * Comportement attendu (vérifié par WatchCard.test.tsx) :
 *
 *   - le `<h3>` contient `watch.brand` ("Rolex", …)
 *   - le `<p>` contient `watch.model` ("Submariner", …)
 *   - l'élément `data-testid="price"` contient `formatPriceEur(watch.priceEur)`
 *   - le `<button>` :
 *       - si la montre est en stock  → texte "Ajouter au panier",
 *                                       au clic appelle `onAddToCart(watch)`
 *       - si elle est en rupture     → texte "Rupture", `disabled`
 *
 * Indice : l'accessor utilisé par les tests est `getByRole('button', { name: /…/i })`,
 * donc le label visible du bouton doit littéralement contenir "Ajouter au panier"
 * ou "Rupture" (insensible à la casse).
 */
export function WatchCard({ watch, onAddToCart }: WatchCardProps): JSX.Element {
  const outOfStock = watch.stock === 0;

  return (
    <article>
      <h3>{/* TODO : marque de la montre */}</h3>
      <p>{/* TODO : modèle de la montre */}</p>
      <span data-testid="price">{/* TODO : prix formaté avec formatPriceEur */}</span>
      <button
        onClick={() => {
          /* TODO : appeler onAddToCart(watch) (uniquement quand le bouton est actif,
             ce qui est déjà géré par l'attribut `disabled` ci-dessous) */
        }}
        disabled={/* TODO : true quand la montre est en rupture */ false}
      >
        {/* TODO : "Rupture" si outOfStock, sinon "Ajouter au panier" */}
      </button>
    </article>
  );
}
