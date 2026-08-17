import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { DuckFormPage } from './pages/DuckFormPage';
import { DuckListPage } from './pages/DuckListPage';

export default function App() {
  return (
    <div className="app">
      <header className="masthead">
        <Link to="/ducks" className="brand">
          Rubber Duck Store
        </Link>
        <nav>
          <Link to="/ducks">Inventory</Link>
          <Link to="/ducks/new">Add duck</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/ducks" replace />} />
          <Route path="/ducks" element={<DuckListPage />} />
          <Route path="/ducks/new" element={<DuckFormPage />} />
          <Route path="/ducks/:id/edit" element={<DuckFormPage />} />
        </Routes>
      </main>
    </div>
  );
}
