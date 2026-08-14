import { useEffect, useState } from 'react';
import { getWatch } from '../api/watches';
import { Watch } from '../types';

export type UseWatch = {
  watch: Watch | null;
  loading: boolean;
  error: string | null;
};

/**
 * Hook qui charge UNE montre par id depuis l'API au montage.
 *
 * État initial attendu (vérifié par useWatch.test.tsx) :
 *   watch = null, loading = true, error = null.
 *
 * Quand `id` change, le hook relance le chargement.
 *
 * Au montage : appelle `getWatch(id)`. Succès → met `watch` et passe `loading=false`.
 * Échec → met `error` au message de l'exception, `watch` reste null, `loading=false`.
 *
 * Indices :
 *   - 3 `useState` pour `watch`, `loading`, `error`
 *   - `useEffect` avec `[id]` en dépendance pour relancer quand l'id change
 *   - **réinitialisez** `watch` / `loading` / `error` au début de chaque chargement
 *   - protégez-vous contre une race condition si l'id change pendant un fetch en cours :
 *     un drapeau local posé au démarrage, vérifié avant chaque écriture d'état,
 *     et basculé dans la fonction de nettoyage retournée par le `useEffect`.
 */
export function useWatch(id: number): UseWatch {
  // TODO : voir Indices ci-dessus.
  throw new Error('TODO: implémenter useWatch');
}
