import { renderHook, waitFor, act } from '@testing-library/react';
import { usePingApi } from '../usePingApi';

describe('usePingApi', () => {
	it('fetches ping result on mount and can refresh', async () => {
		const mockFetch = vi.fn()
			.mockResolvedValueOnce({ json: async () => ({ result: 'pong' }) })
			.mockResolvedValueOnce({ json: async () => ({ result: 'pong-2' }) });

		// @ts-expect-error override global fetch for test
		global.fetch = mockFetch;

		const { result } = renderHook(() => usePingApi());

		// initial state
		expect(result.current.loading).toBe(true);
		expect(result.current.result).toBe('Loading...');

		// after first fetch resolves
		await waitFor(() => {
			expect(result.current.loading).toBe(false);
			expect(result.current.result).toBe('pong');
		});

		// refresh
		await act(async () => {
			result.current.refresh();
		});

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
			expect(result.current.result).toBe('pong-2');
		});

		expect(mockFetch).toHaveBeenCalledTimes(2);
		expect(mockFetch).toHaveBeenNthCalledWith(1, '/api/ping');
		expect(mockFetch).toHaveBeenNthCalledWith(2, '/api/ping');
	});

	it('handles fetch error', async () => {
		const error = new Error('network');
		const mockFetch = vi.fn().mockRejectedValueOnce(error);
		// @ts-expect-error override global fetch for test
		global.fetch = mockFetch;

		const { result } = renderHook(() => usePingApi());

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
			expect(result.current.result).toContain('Error: network');
		});
	});
});


