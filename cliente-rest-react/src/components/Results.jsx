import React from 'react';

/**
 * Muestra la serie temporal si existe, o el JSON crudo.
 * No transforma datos: muestra campos típicos de AlphaVantage.
 */
function findTimeSeries(obj) {
  if (!obj || typeof obj !== 'object') return null;
  for (const k of Object.keys(obj)) {
    if (/time series/i.test(k)) return obj[k];
  }
  if (obj.timeSeries) return obj.timeSeries;
  for (const k of Object.keys(obj)) {
    const v = obj[k];
    if (v && typeof v === 'object') {
      const keys = Object.keys(v);
      if (keys.length > 0 && /\d{4}-\d{2}-\d{2}/.test(keys[0])) return v;
    }
  }
  return null;
}

export default function Results({ data }) {
  if (!data) return null;
  const series = findTimeSeries(data);

  if (!series) {
    return (
      <div className="card">
        <h3>Respuesta</h3>
        <pre className="json">{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  }

  const rows = Object.keys(series)
    .map((ts) => ({ ts, ...series[ts] }))
    .sort((a, b) => (a.ts < b.ts ? 1 : -1))
    .slice(0, 50);

  return (
    <div className="card">
      <h3>Histórico (últimas {rows.length} filas)</h3>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Cierre</th>
              <th>Apertura</th>
              <th>Máx</th>
              <th>Mín</th>
              <th>Volumen</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.ts}>
                <td className="mono">{r.ts}</td>
                <td>{r['4. close'] ?? r.close ?? '-'}</td>
                <td>{r['1. open'] ?? r.open ?? '-'}</td>
                <td>{r['2. high'] ?? r.high ?? '-'}</td>
                <td>{r['3. low'] ?? r.low ?? '-'}</td>
                <td>{r['5. volume'] ?? r.volume ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}