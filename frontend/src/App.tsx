import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { AdminLayout } from './components/admin/AdminLayout';
import { StoreLayout } from './components/store/StoreLayout';
import { DashboardPage } from './pages/admin/DashboardPage';
import { DuckFormPage } from './pages/admin/DuckFormPage';
import { DuckListPage } from './pages/admin/DuckListPage';
import { OrdersPage } from './pages/admin/OrdersPage';
import { AboutPage } from './pages/store/AboutPage';
import { ContactPage } from './pages/store/ContactPage';
import { HomePage } from './pages/store/HomePage';
import { ProductPage } from './pages/store/ProductPage';
import { ShopPage } from './pages/store/ShopPage';

export default function App() {
  return (
    <Routes>
      <Route element={<StoreLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:id" element={<ProductPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="inventory" element={<DuckListPage />} />
        <Route path="inventory/new" element={<DuckFormPage />} />
        <Route path="inventory/:id/edit" element={<DuckFormPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="ducks/new" element={<Navigate to="/admin/inventory/new" replace />} />
        <Route path="ducks/:id/edit" element={<LegacyDuckEditRedirect />} />
      </Route>

      <Route path="/ducks/*" element={<Navigate to="/admin/inventory" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function LegacyDuckEditRedirect() {
  const { id } = useParams();
  return <Navigate to={`/admin/inventory/${id}/edit`} replace />;
}
