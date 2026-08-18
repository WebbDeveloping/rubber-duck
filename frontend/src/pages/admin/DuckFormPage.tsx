import { useEffect, useState, type SubmitEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createDuck, getDuck, updateDuck } from '../../api/ducks';
import { DuckVisual } from '../../components/shared/DuckVisual';
import { OptionGroup } from '../../components/admin/OptionGroup';
import { formatPrice, SIZE_PILL, sizeLabel } from '../../lib/format';
import {
  DUCK_COLORS,
  DUCK_SIZES,
  type DuckColor,
  type DuckSize,
} from '../../types/duck';

export function DuckFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const duckId = Number(id);

  const [color, setColor] = useState<DuckColor>('Yellow');
  const [size, setSize] = useState<DuckSize>('Medium');
  const [price, setPrice] = useState('9.99');
  const [quantity, setQuantity] = useState('10');
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isEdit) return;
    if (!Number.isFinite(duckId)) {
      setError('Invalid duck id');
      setLoading(false);
      return;
    }

    let cancelled = false;

    getDuck(duckId)
      .then((duck) => {
        if (cancelled) return;
        setColor(duck.color);
        setSize(duck.size);
        setPrice(String(duck.price));
        setQuantity(String(duck.quantity));
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Could not load duck');
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [duckId, isEdit]);

  async function onSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const priceNum = Number(price);
    const quantityNum = Number(quantity);
    if (!Number.isFinite(priceNum) || !Number.isFinite(quantityNum)) {
      setError('Enter a valid price and quantity.');
      return;
    }

    setSaving(true);
    try {
      if (isEdit) {
        await updateDuck(duckId, { price: priceNum, quantity: quantityNum });
      } else {
        await createDuck({
          color,
          size,
          price: priceNum,
          quantity: quantityNum,
        });
      }
      navigate('/admin/inventory');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Save failed');
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="ops-status">Loading duck…</p>;
  }

  const saveLabel = saving ? 'Saving…' : isEdit ? 'Save changes' : 'Add duck';

  return (
    <section className="ops-page">
      <header className="ops-header">
        <div>
          <p className="ops-kicker">{isEdit ? `Duck #${id}` : 'Warehouse'}</p>
          <h1 className="ops-title">{isEdit ? 'Edit duck' : 'Add duck'}</h1>
          <p className="ops-lede">
            {isEdit
              ? 'Color and size stay fixed. Update quantity or price only.'
              : 'Matching color + size + price merges into existing stock.'}
          </p>
        </div>
      </header>

      <div className="ops-form-layout">
        <aside className="ops-preview" aria-hidden="true">
          <div className="ops-preview-stage">
            <DuckVisual color={color} size={size} />
          </div>
          <p className="ops-preview-name">{color} rubber duck</p>
          <p className="ops-preview-meta">
            {sizeLabel(size)}
            {price && ` · ${formatPrice(Number(price) || 0)}`}
          </p>
        </aside>

        <form className="ops-form" onSubmit={(e) => void onSubmit(e)}>
          <OptionGroup<DuckColor>
            legend="Color"
            options={DUCK_COLORS}
            value={color}
            onChange={setColor}
            disabled={isEdit}
            swatch
          />

          <OptionGroup<DuckSize>
            legend="Size"
            options={DUCK_SIZES}
            value={size}
            onChange={setSize}
            disabled={isEdit}
            labels={SIZE_PILL}
          />

          <label className="ops-field">
            <span className="ops-kicker">Price</span>
            <input
              className="ops-input"
              type="number"
              min="0.01"
              step="0.01"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>

          <label className="ops-field">
            <span className="ops-kicker">Quantity</span>
            <input
              className="ops-input"
              type="number"
              min="0"
              step="1"
              required
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </label>

          {error && <p className="ops-banner is-error">{error}</p>}

          <div className="ops-form-actions">
            <button
              type="submit"
              className="ops-btn ops-btn--dark"
              disabled={saving}
            >
              <span className="text-slide">
                <span data-label={saveLabel}>{saveLabel}</span>
              </span>
            </button>
            <Link to="/admin/inventory" className="home-story-link">
              <span>Cancel</span>
              <ArrowIcon />
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 12h12M13 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
