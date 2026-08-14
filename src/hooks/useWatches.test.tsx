import { vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useWatches } from './useWatches';
import { Watch } from '../types';

vi.mock('../api/watches', () => ({
  fetchWatches: vi.fn(),
}));

import { fetchWatches } from '../api/watches';

const mockFetch = vi.mocked(fetchWatches);

const sample: Watch[] = [
  { id: 1, brand: 'Rolex', model: 'Submariner', priceEur: 12000, stock: 3 },
];

describe('useWatches', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it('initialise loading=true, watches=[], error=null', () => {
    mockFetch.mockReturnValue(new Promise(() => {})); // ne résout jamais
    const { result } = renderHook(() => useWatches());
    expect(result.current.watches).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('charge les montres au montage et passe loading=false', async () => {
    mockFetch.mockResolvedValue(sample);
    const { result } = renderHook(() => useWatches());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.watches).toEqual(sample);
    expect(result.current.error).toBeNull();
  });

  it('expose le message d\'erreur si fetch échoue', async () => {
    mockFetch.mockRejectedValue(new Error('boom'));
    const { result } = renderHook(() => useWatches());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe('boom');
    expect(result.current.watches).toEqual([]);
  });

  it('reload() relance le fetch', async () => {
    mockFetch.mockResolvedValue(sample);
    const { result } = renderHook(() => useWatches());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(mockFetch).toHaveBeenCalledTimes(1);

    mockFetch.mockClear();
    mockFetch.mockResolvedValue(sample);
    act(() => result.current.reload());

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
  });
});
