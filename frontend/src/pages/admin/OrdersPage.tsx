import { useEffect, useMemo, useState, type SubmitEvent } from 'react';
import { createOrder } from '../../api/orders';
import { DuckVisual } from '../../components/shared/DuckVisual';
import { OptionGroup } from '../../components/admin/OptionGroup';
import { useDucks } from '../../hooks/useDucks';
import { formatPrice, SIZE_PILL, sizeLabel } from '../../lib/format';
import { DUCK_COLORS, DUCK_SIZES, type DuckColor, type DuckSize } from '../../types/duck';
import {
  ORDER_COUNTRIES,
  SHIPPING_MODES,
  type OrderCountry,
  type OrderQuote,
  type ShippingMode,
} from '../../types/order';

export function OrdersPage() {
  const { ducks } = useDucks();
  const [color, setColor] = useState<DuckColor>('Yellow');
  const [size, setSize] = useState<DuckSize>('Medium');
  const [quantity, setQuantity] = useState('10');
  const [country, setCountry] = useState<OrderCountry>('USA');
  const [shippingMode, setShippingMode] = useState<ShippingMode>('Land');
  const [quoting, setQuoting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quote, setQuote] = useState<OrderQuote | null>(null);
  const [selectedDuckId, setSelectedDuckId] = useState<number | null>(null);

  const matches = useMemo(
    () => ducks.filter((duck) => duck.color === color && duck.size === size),
    [ducks, color, size],
  );

  const match =
    matches.find((duck) => duck.id === selectedDuckId) ?? matches[0] ?? null;

  const listingLabels = useMemo(
    () =>
      Object.fromEntries(
        matches.map((duck) => [
          String(duck.id),
          `${formatPrice(duck.price)} · ${duck.quantity} in stock`,
        ]),
      ),
    [matches],
  );

  useEffect(() => {
    setSelectedDuckId((current) =>
      matches.some((duck) => duck.id === current)
        ? current
        : (matches[0]?.id ?? null),
    );
  }, [matches]);

  useEffect(() => {
    setQuote(null);
    setError(null);
  }, [color, size, selectedDuckId]);

  async function onSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setQuoting(true);
    setError(null);

    try {
      const result = await createOrder({
        color,
        size,
        quantity: Number(quantity),
        destinationCountry: country,
        shippingMode,
        ...(match ? { duckId: match.id } : {}),
      });
      setQuote(result);
    } catch (err: unknown) {
      setQuote(null);
      setError(err instanceof Error ? err.message : 'Quote failed');
    } finally {
      setQuoting(false);
    }
  }

  return (
    <section className="ops-page">
      <header className="ops-header">
        <div>
          <p className="ops-kicker">Store</p>
          <h1 className="ops-title">Orders</h1>
          <p className="ops-lede">
            Quote packaging and total to pay. Orders are not saved.
          </p>
        </div>
      </header>

      <div className="ops-form-layout">
        <form className="ops-form" onSubmit={(e) => void onSubmit(e)}>
          <OptionGroup<DuckColor>
            legend="Color"
            options={DUCK_COLORS}
            value={color}
            onChange={setColor}
            swatch
          />

          <OptionGroup<DuckSize>
            legend="Size"
            options={DUCK_SIZES}
            value={size}
            onChange={setSize}
            labels={SIZE_PILL}
          />

          {matches.length > 1 && selectedDuckId !== null && (
            <OptionGroup<number>
              legend="Listing"
              options={matches.map((duck) => duck.id)}
              value={selectedDuckId}
              onChange={setSelectedDuckId}
              labels={listingLabels}
            />
          )}

          <label className="ops-field">
            <span className="ops-kicker">Quantity</span>
            <input
              className="ops-input"
              type="number"
              min="1"
              step="1"
              required
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <span className="ops-field-hint">
              {match
                ? `${match.quantity} in stock · ${formatPrice(Number(match.price))} each`
                : 'No matching duck in inventory'}
            </span>
          </label>

          <OptionGroup<OrderCountry>
            legend="Destination"
            options={ORDER_COUNTRIES}
            value={country}
            onChange={setCountry}
          />

          <OptionGroup<ShippingMode>
            legend="Shipping"
            options={SHIPPING_MODES}
            value={shippingMode}
            onChange={setShippingMode}
          />

          {error && <p className="ops-banner is-error">{error}</p>}

          <div className="ops-form-actions">
            <button type="submit" className="ops-btn ops-btn--dark" disabled={quoting}>
              <span className="text-slide">
                <span data-label={quoting ? 'Quoting…' : 'Get quote'}>
                  {quoting ? 'Quoting…' : 'Get quote'}
                </span>
              </span>
            </button>
          </div>
        </form>

        <aside className="ops-quote">
          <div className="ops-quote-preview" aria-hidden="true">
            <DuckVisual color={color} size={size} />
          </div>
          <p className="ops-preview-name">
            {color} rubber duck
          </p>
          <p className="ops-preview-meta">
            {sizeLabel(size)}
            {match ? ` · ${formatPrice(match.price)}` : ''} · {country} · {shippingMode}
          </p>

          {quote ? (
            <>
              <dl className="ops-quote-facts">
                <div>
                  <dt>Package</dt>
                  <dd>{quote.packageType}</dd>
                </div>
                <div>
                  <dt>Protection</dt>
                  <dd>{quote.protections.join(', ')}</dd>
                </div>
              </dl>
              <p className="ops-kicker">Details</p>
              <ul className="ops-quote-lines">
                {quote.details.map((line) => (
                  <li key={line.code}>
                    <span>{line.description}</span>
                    <strong className={line.amount < 0 ? 'is-discount' : undefined}>
                      {formatPrice(line.amount)}
                    </strong>
                  </li>
                ))}
              </ul>
              <p className="ops-quote-total">
                <span className="ops-kicker">Total to pay</span>
                <strong>{formatPrice(quote.totalToPay)}</strong>
              </p>
            </>
          ) : (
            <p className="ops-status">Submit a quote to see packaging and total.</p>
          )}
        </aside>
      </div>
    </section>
  );
}
