import { useState } from 'react';
import { rollDice } from '../utils/dice';

export default function CombatHelper() {
  const [modo, setModo] = useState<'ataque' | 'dano'>('ataque');
  
  // Ataque
  const [ataquePool, setAtaquePool] = useState(5);
  const [defesaAlvo, setDefesaAlvo] = useState(2);
  const [defesaAtiva, setDefesaAtiva] = useState(false);
  const [defesaPool, setDefesaPool] = useState(3);
  const [ataqueResult, setAtaqueResult] = useState<any>(null);
  const [defesaResult, setDefesaResult] = useState<any>(null);
  
  // Dano
  const [danoArma, setDanoArma] = useState(3);
  const [excedentes, setExcedentes] = useState(0);
  const [reducaoArmadura, setReducaoArmadura] = useState(1);
  const [vitalidadeAlvo, setVitalidadeAlvo] = useState(10);
  const [danoResult, setDanoResult] = useState<any>(null);

  const rolarAtaque = () => {
    const resAtaque = rollDice(ataquePool);
    setAtaqueResult(resAtaque);
    
    if (defesaAtiva) {
      const resDefesa = rollDice(defesaPool);
      setDefesaResult(resDefesa);
    }
  };

  const calcularDano = () => {
    const danoBruto = danoArma + excedentes;
    const danoFinal = Math.max(0, danoBruto - reducaoArmadura);
    
    let estado = '';
    let vitFinal = vitalidadeAlvo - danoFinal;
    if (vitFinal < 0) vitFinal = 0;
    
    if (vitalidadeAlvo > 0 && danoFinal >= vitalidadeAlvo) {
      estado = vitFinal === 0 ? 'Caído' : 'Morrendo (se já caído)';
    } else if (vitFinal <= 2 && vitFinal > 0) {
      estado = 'Grave (-2 dados)';
    } else if (vitFinal <= vitalidadeAlvo / 2) {
      estado = 'Ferido (-1 dado)';
    } else if (vitFinal > 0) {
      estado = 'Ileso';
    } else {
      estado = 'Caído/Morrendo';
    }
    
    setDanoResult({ danoBruto, danoFinal, vitFinal, estado });
  };

  const verificarAcerto = () => {
    if (!ataqueResult) return null;
    if (defesaAtiva && defesaResult) {
      if (defesaResult.successes >= ataqueResult.successes) {
        return <span style={{ color: '#44ff44' }}>DEFESA BEM-SUCEDIDA - Erra</span>;
      } else {
        const exc = ataqueResult.successes - defesaResult.successes;
        setExcedentes(exc);
        return <span style={{ color: '#ff4444' }}>ACERTOU! Excedentes: {exc}</span>;
      }
    } else {
      if (ataqueResult.successes >= defesaAlvo) {
        const exc = ataqueResult.successes - defesaAlvo;
        setExcedentes(exc);
        return <span style={{ color: '#ff4444' }}>ACERTOU! Excedentes: {exc}</span>;
      } else {
        return <span style={{ color: '#44ff44' }}>ERROU</span>;
      }
    }
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '600px', margin: '0 auto', paddingBottom: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Auxiliar de Combate</h2>
      
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <button onClick={() => setModo('ataque')} style={{ flex: 1, padding: '0.5rem', background: modo === 'ataque' ? '#d32f2f' : '#ccc', color: 'white', border: 'none' }}>Ataque/Defesa</button>
        <button onClick={() => setModo('dano')} style={{ flex: 1, padding: '0.5rem', background: modo === 'dano' ? '#d32f2f' : '#ccc', color: 'white', border: 'none' }}>Cálculo de Dano</button>
      </div>

      {modo === 'ataque' && (
        <section style={{ padding: '1rem', background: '#f9f9f9', borderRadius: '8px' }}>
          <h3 style={{ marginTop: 0 }}>Ataque</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div>
              <label>Pilha do Atacante</label><br/>
              <input type="number" value={ataquePool} onChange={(e) => setAtaquePool(parseInt(e.target.value) || 1)} style={{ width: '80px', padding: '0.4rem' }} />
            </div>
            <div>
              <label>Defesa Alvo (passiva)</label><br/>
              <input type="number" value={defesaAlvo} onChange={(e) => setDefesaAlvo(parseInt(e.target.value) || 0)} disabled={defesaAtiva} style={{ width: '80px', padding: '0.4rem' }} />
            </div>
          </div>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <input type="checkbox" checked={defesaAtiva} onChange={(e) => setDefesaAtiva(e.target.checked)} />
            <span>Defesa Ativa</span>
          </label>
          
          {defesaAtiva && (
            <div style={{ marginBottom: '0.75rem' }}>
              <label>Pilha do Defensor</label><br/>
              <input type="number" value={defesaPool} onChange={(e) => setDefesaPool(parseInt(e.target.value) || 1)} style={{ width: '80px', padding: '0.4rem' }} />
            </div>
          )}
          
          <button onClick={rolarAtaque} style={{ padding: '0.6rem 1.2rem', background: '#d32f2f', color: 'white', border: 'none', borderRadius: '4px' }}>Rolar Ataque</button>
          
          {ataqueResult && (
            <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'white', borderRadius: '4px' }}>
              <strong>Ataque:</strong> {ataqueResult.dice.join(', ')} → {ataqueResult.successes} sucessos
              {defesaResult && <div><strong>Defesa:</strong> {defesaResult.dice.join(', ')} → {defesaResult.successes} sucessos</div>}
              <div style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>{verificarAcerto()}</div>
            </div>
          )}
        </section>
      )}

      {modo === 'dano' && (
        <section style={{ padding: '1rem', background: '#f9f9f9', borderRadius: '8px' }}>
          <h3 style={{ marginTop: 0 }}>Cálculo de Dano</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div>
              <label>Dano da Arma</label><br/>
              <input type="number" value={danoArma} onChange={(e) => setDanoArma(parseInt(e.target.value) || 0)} style={{ width: '80px', padding: '0.4rem' }} />
            </div>
            <div>
              <label>Sucessos Excedentes</label><br/>
              <input type="number" value={excedentes} onChange={(e) => setExcedentes(parseInt(e.target.value) || 0)} style={{ width: '80px', padding: '0.4rem' }} />
            </div>
            <div>
              <label>Redução (Armadura)</label><br/>
              <input type="number" value={reducaoArmadura} onChange={(e) => setReducaoArmadura(parseInt(e.target.value) || 0)} style={{ width: '80px', padding: '0.4rem' }} />
            </div>
            <div>
              <label>Vitalidade Atual</label><br/>
              <input type="number" value={vitalidadeAlvo} onChange={(e) => setVitalidadeAlvo(parseInt(e.target.value) || 0)} style={{ width: '80px', padding: '0.4rem' }} />
            </div>
          </div>
          
          <button onClick={calcularDano} style={{ padding: '0.6rem 1.2rem', background: '#d32f2f', color: 'white', border: 'none', borderRadius: '4px' }}>Calcular</button>
          
          {danoResult && (
            <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'white', borderRadius: '4px', lineHeight: '1.6' }}>
              <div>Dano Bruto = {danoArma} + {excedentes} = <strong>{danoResult.danoBruto}</strong></div>
              <div>Dano Final = {danoResult.danoBruto} - {reducaoArmadura} (mín 0) = <strong>{danoResult.danoFinal}</strong></div>
              <div>Vitalidade: {vitalidadeAlvo} → <strong>{danoResult.vitFinal}</strong></div>
              <div style={{ marginTop: '0.5rem', fontWeight: 'bold', color: danoResult.estado.includes('Grave') || danoResult.estado.includes('Morrendo') ? '#ff4444' : danoResult.estado.includes('Ferido') ? '#ffaa44' : '#44ff44' }}>
                Estado: {danoResult.estado}
              </div>
            </div>
          )}
        </section>
      )}

      <section style={{ marginTop: '1rem', padding: '0.75rem', background: '#e3f2fd', borderRadius: '8px', fontSize: '0.85rem' }}>
        <strong>Lembre-se:</strong> Reduções de dano não acumulam (só maior). Morte instantânea: se Vit&gt;0 e dano ≥ Vit+Vit atual; se Vit=0 e dano ≥ Vit máx.
      </section>
    </div>
  );
}
