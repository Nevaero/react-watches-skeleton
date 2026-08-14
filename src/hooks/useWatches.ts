import { useEffect, useState, useCallback } from 'react';
import { fetchWatches } from '../api/watches';
import { Watch } from '../types';

export type UseWatches = {
  watches: Watch[];
  loading: boolean;
  error: string | null;
  reload: () => void;
};

/**
 * Hook qui charge la liste des montres depuis l'API au montage.
 *
 * État initial attendu (vérifié par useWatches.test.tsx) :
 *   watches = [], loading = true, error = null.
 *
 * Au montage : appelle `fetchWatches()`. En cas de succès → met `watches`
 * à jour et passe `loading` à false. En cas d'échec → met `error` au
 * `message` de l'exception et passe `loading` à false.
 *
 * `reload()` doit relancer le fetch en réinitialisant `loading` et `error`.
 *
 * Indices :
 *   - `useState` pour `watches`, `loading`, `error`
 *   - `useEffect` avec un tableau de dépendances vide pour le chargement initial
 *   - `useCallback` pour stabiliser la référence de `reload` (sinon useEffect boucle si tu mets reload en dépendance)
 *   - `fetchWatches().then(...).catch(...).finally(...)` ou async/await
 */
export function useWatches(): UseWatches {
  // TODO : voir Indices ci-dessus.
  throw new Error('TODO: implémenter useWatches');
}
