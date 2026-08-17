import { Link, useParams } from 'react-router-dom';

export function DuckFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);

  return (
    <section>
      <h1>{isEdit ? `Edit duck ${id}` : 'Add duck'}</h1>
      <p>Form fields come with the warehouse UI.</p>
      <p>
        <Link to="/ducks">Back to inventory</Link>
      </p>
    </section>
  );
}
