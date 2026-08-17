import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';

type Health = { ok: boolean };

export function DuckListPage() {
  const [health, setHealth] = useState<'checking' | 'ok' | 'down'>('checking');

  useEffect(() => {
    let cancelled = false;

    api<Health>('/health')
      .then((data) => {
        if (!cancelled) setHealth(data.ok ? 'ok' : 'down');
      })
      .catch(() => {
        if (!cancelled) setHealth('down');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section>
      <h1>Inventory</h1>
      <p>Duck CRUD lands here next. API health: {health}.</p>
      <p>
        <Link to="/ducks/new">Add a duck</Link>
      </p>
    </section>
  );
}
