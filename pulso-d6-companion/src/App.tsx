import { useState } from 'react'
import DiceRoller from './components/DiceRoller'
import CharacterSheet from './components/CharacterSheet'
import CombatHelper from './components/CombatHelper'
import RulesReference from './components/RulesReference'
import './App.css'

type Tab = 'characters' | 'dice' | 'combat' | 'reference';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('characters');

  const tabs = [
    { id: 'characters' as Tab, label: 'Personagem', icon: '👤' },
    { id: 'dice' as Tab, label: 'Dados', icon: '🎲' },
    { id: 'combat' as Tab, label: 'Combate', icon: '⚔️' },
    { id: 'reference' as Tab, label: 'Regras', icon: '📖' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', flexDirection: 'column', maxWidth: '100%' }}>
      <header style={{ 
        background: 'linear-gradient(180deg, #15151a 0%, #0a0a0f 100%)', 
        padding: '0.75rem 1rem',
        borderBottom: '1px solid #2a2a35',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <div style={{ 
            width: '8px', 
            height: '8px', 
            background: '#e63946', 
            borderRadius: '50%',
            boxShadow: '0 0 8px #e63946'
          }}></div>
          <h1 style={{ 
            margin: 0, 
            fontSize: '1.25rem', 
            color: '#ffffff',
            fontWeight: '700',
            letterSpacing: '1.5px',
            textTransform: 'uppercase'
          }}>Pulso d6</h1>
          <div style={{ 
            width: '8px', 
            height: '8px', 
            background: '#e63946', 
            borderRadius: '50%',
            boxShadow: '0 0 8px #e63946'
          }}></div>
        </div>
      </header>

      <main style={{ flex: 1, overflowX: 'hidden', overflowY: 'auto', paddingBottom: '70px' }}>
        {activeTab === 'characters' && <CharacterSheet />}
        {activeTab === 'dice' && <DiceRoller />}
        {activeTab === 'combat' && <CombatHelper />}
        {activeTab === 'reference' && <RulesReference />}
      </main>

      <nav style={{ 
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        background: 'linear-gradient(180deg, #15151a 0%, #0a0a0f 100%)',
        borderTop: '1px solid #2a2a35',
        padding: '0.375rem 0 calc(0.375rem + env(safe-area-inset-bottom, 0)) 0',
        zIndex: 100
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: 'transparent',
              border: 'none',
              color: activeTab === tab.id ? '#e63946' : '#6b6b7b',
              padding: '0.375rem 0.25rem',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              transition: 'all 0.2s ease',
              fontSize: '0.7rem',
              fontWeight: activeTab === tab.id ? '600' : '500'
            }}
          >
            <span style={{ fontSize: '1.375rem', lineHeight: 1 }}>{tab.icon}</span>
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.3px' }}>{tab.label}</span>
            {activeTab === tab.id && (
              <div style={{
                position: 'absolute',
                top: 0,
                width: '40px',
                height: '2px',
                background: '#e63946',
                boxShadow: '0 0 8px #e63946'
              }}></div>
            )}
          </button>
        ))}
      </nav>
    </div>
  )
}

export default App
