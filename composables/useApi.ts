import type { UseFetchOptions } from "#app"

export function useAPI<T>(
    endpoint: string | (() => string),
    options?: UseFetchOptions<T>,
) {
    const config = useRuntimeConfig();
    const backendApiUrl = config.public.backendApiUrl;

    // Gabungkan backendApiUrl dengan endpoint
    const url = typeof endpoint === 'function' ? endpoint() : `${backendApiUrl}${endpoint}`;

    return useFetch(url, {
        ...options,
    })
}
