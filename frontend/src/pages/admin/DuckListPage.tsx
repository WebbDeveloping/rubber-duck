import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteDuck } from '../../api/ducks';
import { ConfirmModal } from '../../components/admin/ConfirmModal';
import { DuckVisual } from '../../components/shared/DuckVisual';
import { useDucks } from '../../hooks/useDucks';
import { formatPrice, sizeLabel } from '../../lib/format';
import { DUCK_COLORS, type Duck, type DuckColor } from '../../types/duck';

const LOW_STOCK = 15;

export function DuckListPage() {
  const { ducks, status, error, reload } = useDucks();
  const [colorFilter, setColorFilter] = useState<DuckColor | null>(null);
  const [pending, setPending] = useState<Duck | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const visible = useMemo(() => {
    if (!colorFilter) return ducks;
    return ducks.filter((duck) => duck.color === colorFilter);
  }, [ducks, colorFilter]);

  function requestDelete(duck: Duck) {
    setPending(duck);
    setDeleteError(null);
  }

  function closeDelete() {
    if (deleting) return;
    setPending(null);
    setDeleteError(null);
  }

  async function confirmDelete() {
    if (!pending) return;
    setDeleting(true);
    setDeleteError(null);

    try {
      await deleteDuck(pending.id);
      setPending(null);
      await reload();
    } catch (err: unknown) {
      setDeleteError(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setDeleting(false);
    }
  }

  return (
    <section className="ops-page">
      <header className="ops-header">
        <div>
          <p className="ops-kicker">Warehouse</p>
          <h1 className="ops-title">Inventory</h1>
          <p className="ops-lede">Active ducks only — soft-deleted items stay hidden.</p>
        </div>
        <Link to="/admin/inventory/new" className="ops-btn">
          <span className="text-slide">
            <span data-label="Add duck">Add duck</span>
          </span>
        </Link>
      </header>

      {status === 'loading' && <p className="ops-status">Loading inventory…</p>}

      {status === 'error' && (
        <p className="ops-banner is-error">
          {error}{' '}
          <button type="button" className="ops-text-btn" onClick={() => void reload()}>
            Retry
          </button>
        </p>
      )}

      {status === 'ready' && ducks.length === 0 && (
        <div className="ops-empty">
          <p className="ops-kicker">Still stocking?</p>
          <p>No ducks yet.</p>
          <Link to="/admin/inventory/new" className="ops-btn ops-btn--dark">
            <span className="text-slide">
              <span data-label="Add the first one">Add the first one</span>
            </span>
          </Link>
        </div>
      )}

      {status === 'ready' && ducks.length > 0 && (
        <>
          <div className="ops-filter">
            <p className="ops-kicker">Color:</p>
            <div className="ops-chips" role="group" aria-label="Color">
              <button
                type="button"
                className={`ops-chip${!colorFilter ? ' is-active' : ''}`}
                onClick={() => setColorFilter(null)}
              >
                All
              </button>
              {DUCK_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`ops-chip${colorFilter === color ? ' is-active' : ''}`}
                  onClick={() => setColorFilter(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {visible.length === 0 ? (
            <p className="ops-status">No ducks in this color.</p>
          ) : (
            <div className="ops-table">
              <div className="ops-table-head" aria-hidden="true">
                <span>Id</span>
                <span>Color</span>
                <span>Size</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Actions</span>
              </div>
              {visible.map((duck) => {
                const low = duck.quantity <= LOW_STOCK;
                return (
                  <article key={duck.id} className="ops-row">
                    <p className="ops-row-meta" data-label="Id">
                      {duck.id}
                    </p>
                    <div className="ops-row-product">
                      <span className="ops-thumb">
                        <DuckVisual color={duck.color} size={duck.size} />
                      </span>
                      <span className="ops-row-copy">
                        <strong>{duck.color}</strong>
                      </span>
                    </div>
                    <p className="ops-row-meta" data-label="Size">
                      {sizeLabel(duck.size)}
                    </p>
                    <p className="ops-row-meta" data-label="Price">
                      {formatPrice(Number(duck.price))}
                    </p>
                    <p className={`ops-row-meta${low ? ' is-low' : ''}`} data-label="Quantity">
                      {duck.quantity}
                      {low && <span className="ops-low-tag">Low</span>}
                    </p>
                    <div className="ops-row-actions">
                      <Link
                        to={`/admin/inventory/${duck.id}/edit`}
                        className="ops-icon-btn"
                        aria-label={`Edit ${duck.color} ${sizeLabel(duck.size)} duck`}
                      >
                        <EditIcon />
                      </Link>
                      <button
                        type="button"
                        className="ops-icon-btn"
                        aria-label={`Delete ${duck.color} ${sizeLabel(duck.size)} duck`}
                        onClick={() => requestDelete(duck)}
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </>
      )}

      <ConfirmModal
        open={Boolean(pending)}
        kicker="Warehouse"
        title="Delete this duck?"
        description={
          pending ? (
            <>
              <p>
                {pending.color} · {sizeLabel(pending.size)} · #{pending.id}
              </p>
              <p>It will be hidden from inventory, not removed from the database.</p>
            </>
          ) : null
        }
        confirmLabel="Delete duck"
        cancelLabel="Keep duck"
        confirming={deleting}
        error={deleteError}
        onConfirm={() => void confirmDelete()}
        onCancel={closeDelete}
      >
        {pending && <DuckVisual color={pending.color} size={pending.size} />}
      </ConfirmModal>
    </section>
  );
}

function EditIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 20h4l10.5-10.5-4-4L4 16v4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 6.5 17.5 10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 7h14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M10 7V5h4v2M8 7l1 12h6l1-12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
