import { useState } from 'react'
import DiceRoller from './components/DiceRoller'
import CharacterSheet from './components/CharacterSheet'
import CombatHelper from './components/CombatHelper'
import RulesReference from './components/RulesReference'
import './App.css'

type Tab = 'dados' | 'ficha' | 'combate' | 'regras';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dados');

  const tabs = [
    { id: 'dados' as Tab, label: '🎲 Dados', icon: '🎲' },
    { id: 'ficha' as Tab, label: '📋 Ficha', icon: '📋' },
    { id: 'combate' as Tab, label: '⚔️ Combate', icon: '⚔️' },
    { id: 'regras' as Tab, label: '📖 Regras', icon: '📖' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <header style={{ 
        background: '#1a1a1a', 
        color: 'white', 
        padding: '1rem',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.8rem', color: 'white' }}>PULSO d6</h1>
        <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', opacity: 0.9 }}>Companheiro de RPG</p>
      </header>

      <nav style={{ 
        display: 'flex', 
        background: '#2d2d2d',
        overflowX: 'auto',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: '1 0 auto',
              padding: '0.75rem 1rem',
              background: activeTab === tab.id ? '#d32f2f' : 'transparent',
              color: 'white',
              border: 'none',
              borderBottom: activeTab === tab.id ? '3px solid #ff5252' : '3px solid transparent',
              cursor: 'pointer',
              fontSize: '0.9rem',
              whiteSpace: 'nowrap'
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main>
        {activeTab === 'dados' && <DiceRoller />}
        {activeTab === 'ficha' && <CharacterSheet />}
        {activeTab === 'combate' && <CombatHelper />}
        {activeTab === 'regras' && <RulesReference />}
      </main>

      <footer style={{ 
        textAlign: 'center', 
        padding: '1rem', 
        fontSize: '0.8rem', 
        color: '#666',
        marginTop: '2rem'
      }}>
        Pulso d6 v2.6 Beta 0.8 • Companheiro para auxiliar nas regras
      </footer>
    </div>
  )
}

export default App
