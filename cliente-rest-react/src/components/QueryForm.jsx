import React, { useState } from 'react';

/**
 * Formulario de consulta (símbolo + periodo).
 * onQuery recibe el objeto { symbol, type, intradayInterval }
 */
export default function QueryForm({ onQuery }) {
  const [symbol, setSymbol] = useState('MSFT');
  const [type, setType] = useState('intraday');
  const [intradayInterval, setIntradayInterval] = useState('5min');

  function submit(e) {
    e.preventDefault();
    if (!symbol.trim()) return;
    onQuery({ symbol: symbol.trim().toUpperCase(), type, intradayInterval });
  }

  return (
    <form className="card" onSubmit={submit}>
      <h2>Consultar acción</h2>
      <div className="row">
        <label>
          Símbolo
          <input value={symbol} onChange={(e) => setSymbol(e.target.value)} />
        </label>

        <label>
          Periodo
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="intraday">Intra-day</option>
            <option value="daily">Diaria</option>
            <option value="weekly">Semanal</option>
            <option value="monthly">Mensual</option>
          </select>
        </label>

        {type === 'intraday' && (
          <label>
            Intervalo intra-day
            <select value={intradayInterval} onChange={(e) => setIntradayInterval(e.target.value)}>
              <option value="1min">1min</option>
              <option value="5min">5min</option>
              <option value="15min">15min</option>
              <option value="30min">30min</option>
              <option value="60min">60min</option>
            </select>
          </label>
        )}

        <div className="actions">
          <button type="submit">Consultar</button>
        </div>
      </div>
    </form>
  );
}