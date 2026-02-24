import React, { useState, useEffect } from 'react';
import QueryForm from './components/QueryForm';
import Results from './components/Results';

/*
  App principal: mantiene usuario, query y realiza fetch al gateway.
  Mantuvimos la lógica de fetch aquí para que el scaffolding sea simple.
*/

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

export default function App() {
  const [query, setQuery] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;
    const controller = new AbortController();

    async function fetchData() {
      setLoading(true);
      setError(null);
      setData(null);
      try {
        const params = new URLSearchParams();
        params.set('symbol', query.symbol);
        params.set('type', query.type);
        if (query.type === 'intraday') params.set('intradayInterval', query.intradayInterval);

        const url = `${API_BASE}/stocks?${params.toString()}`;
        const resp = await fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json'
          },
          signal: controller.signal
        });

        if (!resp.ok) {
          const text = await resp.text();
          throw new Error(`Server responded ${resp.status}: ${text}`);
        }
        const json = await resp.json();
        setData(json);
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message || String(err));
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    return () => controller.abort();
  }, [query]);

  return (
    <div className="container">
      <header>
        <h1>Consulta de Mercado de Acciones</h1>
        <p className="muted">Cliente React asíncrono • Comunicaciones JSON sobre HTTP</p>
      </header>

      <main>
        <QueryForm onQuery={(q) => setQuery(q)} />

        {loading && (
          <div className="card">
            <p>Cargando datos…</p>
          </div>
        )}

        {error && (
          <div className="card error">
            <strong>Error:</strong> {error}
          </div>
        )}

        <Results data={data} />
      </main>
    </div>
  );
}