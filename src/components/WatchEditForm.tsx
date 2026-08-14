import { FormEvent, useState } from 'react';
import { updateWatch } from '../api/watches';
import { Watch } from '../types';

export type WatchEditFormProps = {
  initial: Watch;
  onSaved: (watch: Watch) => void;
};

/**
 * Formulaire d'édition d'une montre.
 *
 * Le squelette pose la structure : 4 useState (priceEur, stock, submitting, error),
 * la dérivation `isDirty`, et le JSX complet (inputs contrôlés, bouton, message
 * d'erreur). Vous n'avez qu'à remplir le corps de `handleSubmit`.
 *
 * Comportement attendu (vérifié par WatchEditForm.test.tsx) :
 *
 *   - submit prevent default
 *   - mettre `submitting=true`, `error=null`
 *   - appeler `updateWatch(initial.id, { priceEur, stock })`
 *       - succès → `onSaved(updated)`
 *       - échec   → `setError(err.message)`
 *   - dans tous les cas, `submitting=false` à la fin (pensez à `try/catch/finally`)
 *
 * Indice : `updateWatch` (cf. `src/api/watches.ts`) renvoie une `Promise<Watch>`.
 * Utilisez `await` dans la fonction async. Le bouton est déjà branché sur le submit
 * du formulaire ; vous n'avez pas à gérer le clic vous-même.
 */
export function WatchEditForm({ initial, onSaved }: WatchEditFormProps): JSX.Element {
  const [priceEur, setPriceEur] = useState(initial.priceEur);
  const [stock, setStock] = useState(initial.stock);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isDirty = priceEur !== initial.priceEur || stock !== initial.stock;

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    // TODO : voir Indice ci-dessus :
    //   - submitting=true, error=null
    //   - appel updateWatch + onSaved en cas de succès, setError en cas d'échec
    //   - submitting=false à la fin (try/catch/finally)
    throw new Error('TODO: implémenter handleSubmit');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Prix (€)
        <input
          type="number"
          aria-label="Prix"
          value={priceEur}
          onChange={(e) => setPriceEur(Number(e.target.value))}
        />
      </label>
      <label>
        Stock
        <input
          type="number"
          aria-label="Stock"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
        />
      </label>
      <button type="submit" disabled={!isDirty || submitting}>
        {submitting ? 'Enregistrement…' : 'Enregistrer'}
      </button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
}
