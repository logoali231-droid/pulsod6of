export default function RulesReference() {
  return (
    <div style={{ padding: '1rem', maxWidth: '700px', margin: '0 auto', paddingBottom: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Referência Rápida</h2>
      
      <section style={{ marginBottom: '1rem', padding: '0.75rem', background: '#f9f9f9', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Dificuldade</h3>
        <table style={{ width: '100%', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#e0e0e0' }}>
              <th style={{ padding: '0.4rem' }}>Dificuldade</th>
              <th style={{ padding: '0.4rem' }}>Sucessos</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ padding: '0.3rem' }}>Rotina</td><td style={{ padding: '0.3rem', textAlign: 'center' }}>1</td></tr>
            <tr style={{ background: '#f0f0f0' }}><td style={{ padding: '0.3rem' }}>Média</td><td style={{ padding: '0.3rem', textAlign: 'center' }}>2</td></tr>
            <tr><td style={{ padding: '0.3rem' }}>Difícil</td><td style={{ padding: '0.3rem', textAlign: 'center' }}>3</td></tr>
            <tr style={{ background: '#f0f0f0' }}><td style={{ padding: '0.3rem' }}>Muito Difícil</td><td style={{ padding: '0.3rem', textAlign: 'center' }}>4</td></tr>
            <tr><td style={{ padding: '0.3rem' }}>Heroico</td><td style={{ padding: '0.3rem', textAlign: 'center' }}>5</td></tr>
            <tr style={{ background: '#f0f0f0' }}><td style={{ padding: '0.3rem' }}>Sobre-humano</td><td style={{ padding: '0.3rem', textAlign: 'center' }}>6+</td></tr>
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: '1rem', padding: '0.75rem', background: '#f9f9f9', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Resolução</h3>
        <ul style={{ fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
          <li>Pilha = Atributo + Perícia + Modificadores</li>
          <li>Mínimo 1 dado • Máximo 12</li>
          <li>4,5,6 = 1 sucesso • <strong>6 = 2 sucessos</strong> (se crítico ativo)</li>
          <li>Falha crítica: falha + pelo menos 2 dados com 1</li>
          <li>Oposição: maior sucessos vence; empate = defensor</li>
        </ul>
      </section>

      <section style={{ marginBottom: '1rem', padding: '0.75rem', background: '#f9f9f9', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Estados (Vitalidade)</h3>
        <table style={{ width: '100%', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ background: '#e0e0e0' }}>
              <th style={{ padding: '0.4rem' }}>Estado</th>
              <th style={{ padding: '0.4rem' }}>Condição</th>
              <th style={{ padding: '0.4rem' }}>Efeito</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ padding: '0.3rem' }}>Ileso</td><td style={{ padding: '0.3rem' }}>Vit &gt; metade</td><td style={{ padding: '0.3rem' }}>Sem penalidade</td></tr>
            <tr style={{ background: '#f0f0f0' }}><td style={{ padding: '0.3rem' }}>Ferido</td><td style={{ padding: '0.3rem' }}>2 &lt; Vit ≤ metade</td><td style={{ padding: '0.3rem' }}>-1 dado em tudo</td></tr>
            <tr><td style={{ padding: '0.3rem' }}>Grave</td><td style={{ padding: '0.3rem' }}>0 &lt; Vit ≤ 2</td><td style={{ padding: '0.3rem' }}>-2 dados, sem correr</td></tr>
            <tr style={{ background: '#f0f0f0' }}><td style={{ padding: '0.3rem' }}>Caído</td><td style={{ padding: '0.3rem' }}>Vit = 0</td><td style={{ padding: '0.3rem' }}>Incapacitado</td></tr>
            <tr><td style={{ padding: '0.3rem' }}>Morrendo</td><td style={{ padding: '0.3rem' }}>Vit=0 + dano novo</td><td style={{ padding: '0.3rem' }}>Vigor (3)/turno</td></tr>
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: '1rem', padding: '0.75rem', background: '#f9f9f9', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Armas e Zonas</h3>
        <div style={{ fontSize: '0.85rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          <div><strong>Corpo a Corpo:</strong> Espadas, Socos (ideal)</div>
          <div><strong>Perto:</strong> Pistolas, Arremessos</div>
          <div style={{ gridColumn: '1 / -1' }}><strong>Longe:</strong> Rifles, Arcos longos</div>
        </div>
        <div style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
          Fora da zona ideal: +1 zona = -1 dado, +2 zonas = -2 dados
        </div>
      </section>

      <section style={{ padding: '0.75rem', background: '#f9f9f9', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Custo de Atributos</h3>
        <div style={{ fontSize: '0.85rem' }}>
          2→3: 1 pt | 3→4: +2 pts (3 total) | 4→5: +3 pts (6 total)
        </div>
      </section>
    </div>
  );
}
