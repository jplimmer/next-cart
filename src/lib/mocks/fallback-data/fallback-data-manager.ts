export interface FallbackResult<T> {
  usedFallback: boolean;
  data: T[];
}

export async function fallbackDataManager<T>({
  result,
  useCleanDataset = true,
  fallbackIfLessThanNrItems = 14,
}: {
  result: T[];
  useCleanDataset?: boolean;
  fallbackIfLessThanNrItems?: number;
}): Promise<FallbackResult<T>> {
  const useFallback = result.length <= fallbackIfLessThanNrItems;

  const data = useFallback
    ? await getDataset<T>({ useClean: useCleanDataset })
    : result;

  return {
    usedFallback: useFallback,
    data,
  };
}

// Dynamically lazy-load either clean or dirty dataset at runtime,
// optimizing performance and memory usage by loading only what's needed.
export async function getDataset<T>({
  useClean,
}: {
  useClean: boolean;
}): Promise<T[]> {
  if (useClean) {
    const mod = await import('../mock-data');
    return mod.mockData as T[];
  } else {
    const mod = await import('../experimental-data');
    return mod.experimentalData as T[];
  }
}
