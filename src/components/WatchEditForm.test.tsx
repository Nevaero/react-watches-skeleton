import { vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { WatchEditForm } from './WatchEditForm';
import { Watch } from '../types';

vi.mock('../api/watches', () => ({
  updateWatch: vi.fn(),
}));

import { updateWatch } from '../api/watches';

const mockUpdate = vi.mocked(updateWatch);

const rolex: Watch = { id: 1, brand: 'Rolex', model: 'Submariner', priceEur: 12000, stock: 3 };

describe('WatchEditForm', () => {
  beforeEach(() => {
    mockUpdate.mockReset();
  });

  it('rend deux inputs nombres pré-remplis avec priceEur et stock', () => {
    render(<WatchEditForm initial={rolex} onSaved={() => {}} />);
    expect(screen.getByLabelText('Prix')).toHaveValue(12000);
    expect(screen.getByLabelText('Stock')).toHaveValue(3);
  });

  it('désactive le bouton "Enregistrer" tant que rien n\'est modifié', () => {
    render(<WatchEditForm initial={rolex} onSaved={() => {}} />);
    const button = screen.getByRole('button', { name: /enregistrer/i });
    expect(button).toBeDisabled();
  });

  it('active le bouton dès qu\'un champ change', () => {
    render(<WatchEditForm initial={rolex} onSaved={() => {}} />);
    fireEvent.change(screen.getByLabelText('Prix'), { target: { value: '13500' } });
    expect(screen.getByRole('button', { name: /enregistrer/i })).not.toBeDisabled();
  });

  it('appelle updateWatch et onSaved au submit', async () => {
    const updated: Watch = { ...rolex, priceEur: 13500 };
    mockUpdate.mockResolvedValue(updated);
    const onSaved = vi.fn();

    render(<WatchEditForm initial={rolex} onSaved={onSaved} />);
    fireEvent.change(screen.getByLabelText('Prix'), { target: { value: '13500' } });
    fireEvent.click(screen.getByRole('button', { name: /enregistrer/i }));

    await waitFor(() => expect(onSaved).toHaveBeenCalledWith(updated));
    expect(mockUpdate).toHaveBeenCalledWith(rolex.id, { priceEur: 13500, stock: 3 });
  });

  it('passe en état "Enregistrement…" pendant la soumission et désactive le bouton', async () => {
    let resolve!: (w: Watch) => void;
    mockUpdate.mockReturnValue(new Promise<Watch>((res) => { resolve = res; }));

    render(<WatchEditForm initial={rolex} onSaved={() => {}} />);
    fireEvent.change(screen.getByLabelText('Prix'), { target: { value: '13500' } });
    fireEvent.click(screen.getByRole('button', { name: /enregistrer/i }));

    expect(await screen.findByRole('button', { name: /enregistrement/i })).toBeDisabled();

    resolve({ ...rolex, priceEur: 13500 });
    await waitFor(() => expect(screen.getByRole('button', { name: /enregistrer/i })).not.toBeDisabled());
  });

  it('affiche le message d\'erreur en cas d\'échec', async () => {
    mockUpdate.mockRejectedValue(new Error('priceEur must be >= 0'));

    render(<WatchEditForm initial={rolex} onSaved={() => {}} />);
    fireEvent.change(screen.getByLabelText('Prix'), { target: { value: '-1' } });
    fireEvent.click(screen.getByRole('button', { name: /enregistrer/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent('priceEur must be >= 0');
  });

  it('n\'appelle pas onSaved en cas d\'erreur', async () => {
    mockUpdate.mockRejectedValue(new Error('boom'));
    const onSaved = vi.fn();

    render(<WatchEditForm initial={rolex} onSaved={onSaved} />);
    fireEvent.change(screen.getByLabelText('Stock'), { target: { value: '0' } });
    fireEvent.click(screen.getByRole('button', { name: /enregistrer/i }));

    await screen.findByRole('alert');
    expect(onSaved).not.toHaveBeenCalled();
  });
});
