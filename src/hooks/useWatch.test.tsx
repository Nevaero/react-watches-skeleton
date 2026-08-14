import { vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useWatch } from './useWatch';
import { Watch } from '../types';

vi.mock('../api/watches', () => ({
  getWatch: vi.fn(),
}));

import { getWatch } from '../api/watches';

const mockGet = vi.mocked(getWatch);

const rolex: Watch = { id: 1, brand: 'Rolex', model: 'Submariner', priceEur: 12000, stock: 3 };

describe('useWatch', () => {
  beforeEach(() => {
    mockGet.mockReset();
  });

  it('initialise watch=null, loading=true, error=null', () => {
    mockGet.mockReturnValue(new Promise(() => {})); // never resolves
    const { result } = renderHook(() => useWatch(1));
    expect(result.current.watch).toBeNull();
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('charge la montre et passe loading=false', async () => {
    mockGet.mockResolvedValue(rolex);
    const { result } = renderHook(() => useWatch(1));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.watch).toEqual(rolex);
    expect(result.current.error).toBeNull();
  });

  it('expose le message d\'erreur si fetch échoue', async () => {
    mockGet.mockRejectedValue(new Error('not found'));
    const { result } = renderHook(() => useWatch(99));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe('not found');
    expect(result.current.watch).toBeNull();
  });

  it('relance le fetch quand `id` change', async () => {
    mockGet.mockResolvedValue(rolex);
    const { result, rerender } = renderHook(({ id }) => useWatch(id), {
      initialProps: { id: 1 },
    });
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(mockGet).toHaveBeenCalledWith(1);

    mockGet.mockClear();
    const omega: Watch = { id: 2, brand: 'Omega', model: 'Speedmaster', priceEur: 6500, stock: 5 };
    mockGet.mockResolvedValue(omega);
    rerender({ id: 2 });
    await waitFor(() => expect(result.current.watch).toEqual(omega));
    expect(mockGet).toHaveBeenCalledWith(2);
  });
});
