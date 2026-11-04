import React, { useState } from 'react';
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
      return <span style={{ color: '#e63946', fontWeight: '700', fontSize: '1.4rem' }}>FALHA CRÍTICA</span>;
    }
    if (difficulty > 0) {
      if (result.successes >= difficulty) {
        const excess = result.successes - difficulty;
        return (
          <span style={{ color: '#2fbf71', fontWeight: '700', fontSize: '1.4rem' }}>
            SUCESSO {excess > 0 && `+${excess}`}
          </span>
        );
      } else {
        const needed = difficulty - result.successes;
        return (
          <span style={{ color: '#f4a261', fontWeight: '700', fontSize: '1.2rem' }}>
            FALHA • Faltam {needed}
          </span>
        );
      }
    }
    return <span style={{ color: '#457b9d', fontWeight: '700', fontSize: '1.4rem' }}>{result.successes} {result.successes === 1 ? 'SUCESSO' : 'SUCESSOS'}</span>;
  };

  const cardStyle = {
    background: 'var(--bg-card)',
    borderRadius: '12px',
    border: '1px solid var(--border-color)',
    margin: '0.75rem',
    overflow: 'hidden'
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.625rem',
    fontSize: '1rem',
    background: 'var(--bg-elevated)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    outline: 'none',
    textAlign: 'center' as const,
    fontWeight: '600'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.7rem',
    marginBottom: '0.375rem',
    color: 'var(--text-tertiary)',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    fontWeight: '600'
  };

  return (
    <div style={{ paddingBottom: '1rem' }}>
      <div style={cardStyle}>
        <div style={{ padding: '0.875rem 1rem', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Configuração</h2>
        </div>
        <div style={{ padding: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.875rem' }}>
            <div>
              <label style={labelStyle}>Atributo</label>
              <input
                type="number"
                min="1"
                max="5"
                value={attribute}
                onChange={(e) => setAttribute(parseInt(e.target.value) || 1)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Perícia</label>
              <input
                type="number"
                min="0"
                max="5"
                value={skill}
                onChange={(e) => setSkill(parseInt(e.target.value) || 0)}
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.875rem' }}>
            <div>
              <label style={labelStyle}>Modificadores</label>
              <input
                type="number"
                value={modifiers}
                onChange={(e) => setModifiers(parseInt(e.target.value) || 0)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Dificuldade</label>
              <input
                type="number"
                min="0"
                value={difficulty}
                onChange={(e) => setDifficulty(parseInt(e.target.value) || 0)}
                style={inputStyle}
              />
            </div>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            <input
              type="checkbox"
              checked={criticalsEnabled}
              onChange={(e) => setCriticalsEnabled(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)' }}
            />
            <span>6 conta como 2 sucessos</span>
          </label>
        </div>
      </div>

      <div style={cardStyle}>
        <div style={{ padding: '1rem', textAlign: 'center', background: 'linear-gradient(135deg, var(--bg-card) 0%, rgba(230, 57, 70, 0.1) 100%)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '0.375rem', letterSpacing: '1px' }}>PILHA</div>
          <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--accent-primary)', lineHeight: 1 }}>{pool}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>d6</div>
          {difficulty > 0 && (
            <div style={{ marginTop: '0.75rem', padding: '0.5rem', background: 'var(--bg-elevated)', borderRadius: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Alvo: {difficulty} sucesso{difficulty !== 1 ? 's' : ''} • {getDifficultyLabel(difficulty)}
            </div>
          )}
        </div>
        <div style={{ padding: '0.875rem' }}>
          <button
            onClick={handleRoll}
            disabled={rolling}
            style={{
              width: '100%',
              padding: '0.875rem',
              fontSize: '0.95rem',
              background: rolling 
                ? 'var(--bg-elevated)' 
                : 'linear-gradient(90deg, var(--accent-primary) 0%, #c1121f 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: rolling ? 'not-allowed' : 'pointer',
              fontWeight: '700',
              letterSpacing: '1.2px',
              boxShadow: rolling ? 'none' : '0 4px 12px rgba(230, 57, 70, 0.4)'
            }}
          >
            {rolling ? 'ROLANDO...' : 'ROLAR'}
          </button>
        </div>
      </div>

      {result && (
        <div style={cardStyle}>
          <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', textAlign: 'center' }}>
            {getResultText()}
          </div>
          <div style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '0.875rem' }}>
              {result.dice.map((d, i) => (
                <div
                  key={i}
                  style={{
                    width: '44px',
                    height: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: d === 6 
                      ? 'linear-gradient(135deg, #2fbf71 0%, #1b9e55 100%)' 
                      : d >= 4 
                      ? 'linear-gradient(135deg, #f4e06a 0%, #f4a261 100%)' 
                      : d === 1 
                      ? 'linear-gradient(135deg, #e63946 0%, #c1121f 100%)' 
                      : 'var(--bg-elevated)',
                    color: '#000000',
                    border: '2px solid',
                    borderColor: d === 6 ? '#2fbf71' : d >= 4 ? '#f4a261' : d === 1 ? '#e63946' : 'var(--border-light)',
                    borderRadius: '8px',
                    fontWeight: '800',
                    fontSize: '1.4rem',
                    boxShadow: d === 6 ? '0 0 12px rgba(47, 191, 113, 0.6)' : d === 1 ? '0 0 12px rgba(230, 57, 70, 0.6)' : 'none'
                  }}
                >
                  {d}
                </div>
              ))}
            </div>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '0.5rem',
              fontSize: '0.75rem'
            }}>
              <div style={{ textAlign: 'center', padding: '0.5rem', background: 'var(--bg-elevated)', borderRadius: '6px' }}>
                <div style={{ color: 'var(--text-tertiary)' }}>Sucessos</div>
                <div style={{ color: 'var(--text-primary)', fontWeight: '700', fontSize: '1rem' }}>{result.successes}</div>
              </div>
              <div style={{ textAlign: 'center', padding: '0.5rem', background: 'var(--bg-elevated)', borderRadius: '6px' }}>
                <div style={{ color: 'var(--text-tertiary)' }}>Uns</div>
                <div style={{ color: '#e63946', fontWeight: '700', fontSize: '1rem' }}>{result.ones}</div>
              </div>
              <div style={{ textAlign: 'center', padding: '0.5rem', background: 'var(--bg-elevated)', borderRadius: '6px' }}>
                <div style={{ color: 'var(--text-tertiary)' }}>Críticos</div>
                <div style={{ color: '#2fbf71', fontWeight: '700', fontSize: '1rem' }}>{result.criticals}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
