# react-watches : Exercice React + TypeScript

E-commerce de montres de luxe (frontend). Compléter le code pour faire passer **toute** la suite de tests Vitest.

API consommée : voir [`./API.md`](./API.md). Le frontend marche avec n'importe lequel des trois backends (`spring-watches`, `nest-watches`, `django-watches`).

## Prérequis

- Node 18+
- npm 9+

## Installation et tests

```bash
npm install
npm test
```

Pour lancer l'app dans le navigateur (avec un backend qui tourne sur `localhost:8080`) :

```bash
npm run dev
```

Pour pointer un autre backend (NestJS sur `:3000`, Django sur `:8000`) :

```bash
VITE_API_URL=http://localhost:3000/api npm run dev
```

## À compléter

Six `TODO` regroupés par feature :

**Feature 1 : Liste et affichage** (~35 min)

1. **`src/utils/price.ts`** : `formatPriceEur` et `calculateCartTotal`. ~10 min.
2. **`src/hooks/useWatches.ts`** : hook qui charge les montres depuis l'API et expose `loading` / `error` / `reload`. ~15 min.
3. **`src/components/WatchCard.tsx`** : composant qui affiche une montre. ~10 min.

**Feature 2 : Édition d'une montre (PATCH)** (~25 min)

4. **`src/api/watches.ts`** : fonctions `getWatch(id)` (GET) et `updateWatch(id, partial)` (PATCH). ~5 min.
5. **`src/hooks/useWatch.ts`** : hook qui charge UNE montre par id. ~10 min.
6. **`src/components/WatchEditForm.tsx`** : formulaire d'édition (vous remplissez `handleSubmit`, le reste est posé). ~10 min.

Les détails et indices sont dans le commentaire de chaque fichier.

## Règles

- **Ne pas modifier** les fichiers `*.test.ts(x)` ni `vitest.setup.ts`.
- Le hook `useCart` et le module `src/api/watches.ts` (client HTTP `fetch`) sont déjà fournis intégralement.
- Pour tester `useWatches`, le module `../api/watches` est mocké via `vi.mock`. Vous n'avez pas besoin de toucher à `fetch` directement.
- Inutile de styliser : les tests vérifient le comportement et le markup minimum.

## Tuteur IA (optionnel)

Vous pouvez connecter l'agent tuteur **`tutor-mcp`** sur votre IDE (Claude Code, Cursor, …). Il
expose des outils calibrés pour cet exo : `list_todos`, `explain_test`, `run_tests`,
`get_hint(level=1|2|3)`, `review_my_code`, `get_api_contract`. Toutes les interactions
sont logées dans `.tutor/session.log.jsonl` et lues par le recruteur en post-mortem.

Configuration `mcp.json` (Claude Code, Cursor, ou équivalent) :

```jsonc
{
  "mcpServers": {
    "tutor": {
      "command": "npx",
      "args": ["-y", "@skeleton-watches/tutor-mcp"],
      "env": { "TUTOR_PROJECT_ROOT": "." }
    }
  }
}
```

Rien à installer : `npx` récupère le serveur au premier lancement. Le tuteur ne
lit que ce dépôt, et journalise ses réponses dans `.tutor/session.log.jsonl`.

Chargez ensuite le prompt `tutor` exposé par le serveur (capability *prompts* MCP) dans
votre conversation pour calibrer la posture de l'agent.

## Livraison

Vous n'avez pas les droits d'écriture sur ce dépôt : vous travaillez sur votre
propre copie, puis vous proposez votre travail par merge request.

1. **Forkez** ce dépôt depuis GitHub (bouton *Fork*, en haut à droite).
2. Clonez **votre fork**, et non ce dépôt-ci :
   ```bash
   git clone https://github.com/<votre-compte>/<nom-du-depot>.git
   ```
3. Créez une branche `solution/<nom>_<prenom>_<YYYY-MM-DD>`
   (par exemple `solution/martin_jean_2026-08-14`).
4. Commitez votre travail dessus, puis poussez la branche sur votre fork :
   ```bash
   git push origin solution/<nom>_<prenom>_<YYYY-MM-DD>
   ```
5. Ouvrez une **merge request** de cette branche vers `main` de ce dépôt.
   GitHub vous le propose automatiquement juste après le push.

Si l'entretien couvre plusieurs stacks, refaites la même chose dans chaque
dépôt qui vous a été indiqué : **un fork et une merge request par dépôt**.

> Ce dépôt étant public, votre fork le sera également.
