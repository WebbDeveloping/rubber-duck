import { useEffect, useState } from 'react';
import { listDucks } from '../api/ducks';
import type { Duck } from '../types/duck';

type Status = 'loading' | 'ready' | 'error';

export function useDucks() {
  const [ducks, setDucks] = useState<Duck[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const [error, setError] = useState<string | null>(null);

  async function reload() {
    setStatus('loading');
    setError(null);
    try {
      const data = await listDucks();
      setDucks(data);
      setStatus('ready');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load inventory');
      setStatus('error');
    }
  }

  useEffect(() => {
    void reload();
  }, []);

  return { ducks, status, error, reload };
}
