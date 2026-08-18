import { Link } from 'react-router-dom';
import { formatPrice, sizeLabel } from '../../lib/format';
import type { Duck } from '../../types/duck';
import { DuckVisual } from '../shared/DuckVisual';

type ProductCardProps = {
  duck: Duck;
  variant?: 'default' | 'related';
  imageClassName?: string;
  tabIndex?: number;
};

export function ProductCard({
  duck,
  variant = 'default',
  imageClassName = '',
  tabIndex,
}: ProductCardProps) {
  const related = variant === 'related';

  return (
    <Link
      to={`/shop/${duck.id}`}
      className={related ? 'pp-related-card' : 'home-best-card'}
      tabIndex={tabIndex}
    >
      <div
        className={`${related ? 'pp-related-image' : 'home-best-image'}${imageClassName ? ` ${imageClassName}` : ''}`}
      >
        <DuckVisual color={duck.color} size={duck.size} />
      </div>
      <div className={related ? 'pp-related-info' : 'home-best-info'}>
        <div className={related ? undefined : 'home-best-copy'}>
          <h3 className={related ? undefined : 'home-best-title'}>
            {duck.color} rubber duck
          </h3>
          <p className={related ? undefined : 'home-best-variant'}>{sizeLabel(duck.size)}</p>
        </div>
        <p className={related ? 'pp-related-price' : 'home-best-price'}>
          {formatPrice(Number(duck.price))}
        </p>
      </div>
    </Link>
  );
}
