import { useState } from 'react';
import { rollDice, calculatePool, isCriticalFailure, getDifficultyLabel } from '../utils/dice';
import type { DiceRollResult } from '../utils/dice';

interface DiceRollerProps {
  defaultAttribute?: number;
  defaultSkill?: number;
}

export default function DiceRoller({ defaultAttribute = 2, defaultSkill = 0 }: DiceRollerProps) {
  const [attribute, setAttribute] = useState(defaultAttribute);
  const [skill, setSkill] = useState(defaultSkill);
  const [modifiers, setModifiers] = useState(0);
  const [difficulty, setDifficulty] = useState(0);
  const [criticalsEnabled, setCriticalsEnabled] = useState(true);
  const [result, setResult] = useState<DiceRollResult | null>(null);
  const [rolling, setRolling] = useState(false);

  const pool = calculatePool(attribute, skill, modifiers);

  const handleRoll = () => {
    setRolling(true);
    setTimeout(() => {
      const rollResult = rollDice(pool, criticalsEnabled);
      setResult(rollResult);
      setRolling(false);
    }, 300);
  };

  const getResultText = () => {
    if (!result) return null;
    if (isCriticalFailure(result)) {
      return <span style={{ color: '#ff4444', fontWeight: 'bold' }}>FALHA CRÍTICA!</span>;
    }
    if (difficulty > 0) {
      if (result.successes >= difficulty) {
        const excess = result.successes - difficulty;
        return (
          <span style={{ color: '#44ff44', fontWeight: 'bold' }}>
            SUCESSO! {excess > 0 && `(+${excess} excedente${excess > 1 ? 's' : ''})`}
          </span>
        );
      } else {
        const needed = difficulty - result.successes;
        return (
          <span style={{ color: '#ffaa44', fontWeight: 'bold' }}>
            FALHA - Faltam {needed} sucesso{needed > 1 ? 's' : ''}
          </span>
        );
      }
    }
    return <span style={{ color: '#44aaff', fontWeight: 'bold' }}>{result.successes} sucesso{result.successes !== 1 ? 's' : ''}</span>;
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Rolador de Dados</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Atributo (1-5)</label>
          <input
            type="number"
            min="1"
            max="5"
            value={attribute}
            onChange={(e) => setAttribute(parseInt(e.target.value) || 1)}
            style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Perícia (0-5)</label>
          <input
            type="number"
            min="0"
            max="5"
            value={skill}
            onChange={(e) => setSkill(parseInt(e.target.value) || 0)}
            style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Modificadores (+/-)</label>
          <input
            type="number"
            value={modifiers}
            onChange={(e) => setModifiers(parseInt(e.target.value) || 0)}
            style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Dificuldade</label>
          <input
            type="number"
            min="0"
            value={difficulty}
            onChange={(e) => setDifficulty(parseInt(e.target.value) || 0)}
            style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
          />
        </div>
      </div>

      <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={criticalsEnabled}
            onChange={(e) => setCriticalsEnabled(e.target.checked)}
          />
          <span>6 = 2 sucessos (Críticos)</span>
        </label>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem', padding: '0.75rem', background: '#f0f0f0', borderRadius: '8px' }}>
        <strong>Pilha: {pool} dado{pool !== 1 ? 's' : ''}</strong>
        {difficulty > 0 && <div style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>Dificuldade: {difficulty} - {getDifficultyLabel(difficulty)}</div>}
      </div>

      <button
        onClick={handleRoll}
        disabled={rolling}
        style={{
          width: '100%',
          padding: '0.75rem',
          fontSize: '1.1rem',
          background: rolling ? '#ccc' : '#d32f2f',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: rolling ? 'not-allowed' : 'pointer',
          fontWeight: 'bold'
        }}
      >
        {rolling ? 'Rolando...' : 'ROLAR'}
      </button>

      {result && (
        <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f9f9f9', borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '0.75rem' }}>
            {result.dice.map((d, i) => (
              <div
                key={i}
                style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: d === 6 ? '#44ff44' : d >= 4 ? '#ffff44' : d === 1 ? '#ff4444' : '#ddd',
                  border: '2px solid #333',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  fontSize: '1.2rem'
                }}
              >
                {d}
              </div>
            ))}
          </div>
          <div style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>
            {getResultText()}
          </div>
          <div style={{ fontSize: '0.9rem', color: '#666' }}>
            {result.successes} sucessos totais • {result.ones} 1s{result.criticals > 0 && ` • ${result.criticals} 6s críticos`}
          </div>
        </div>
      )}
    </div>
  );
}
