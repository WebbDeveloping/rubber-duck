import { Outlet, useLocation } from 'react-router-dom';
import { StoreFooter } from './StoreFooter';
import { StoreNav } from './StoreNav';

export function StoreLayout() {
  const { pathname } = useLocation();
  const isHero = pathname === '/' || pathname === '/shop';

  return (
    <div className={`store-shell${isHero ? ' store-shell--hero' : ''}`}>
      <div className="store-page-content">
        <StoreNav />
        <Outlet />
      </div>
      <StoreFooter />
    </div>
  );
}
