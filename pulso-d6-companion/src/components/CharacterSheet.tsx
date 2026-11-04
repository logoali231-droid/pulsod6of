import { useState } from 'react';

interface Character {
  nome: string;
  conceito: string;
  jogador: string;
  cenario: string;
  riqueza: number;
  atributos: {
    corpo: number;
    agilidade: number;
    mente: number;
    presenca: number;
  };
  pericias: Record<string, number>;
  vantagens: string[];
  desvantagens: string[];
  especializacoes: string[];
  vitalidadeAtual: number;
  fadiga: number;
  estresse: number;
  equipamentos: Array<{nome: string, dano?: string, reducao?: string, espacos: number}>;
}

const periciasList = [
  { nome: 'Luta', atributo: 'corpo' },
  { nome: 'Vigor', atributo: 'corpo' },
  { nome: 'Atirar', atributo: 'agilidade' },
  { nome: 'Acrobacia', atributo: 'agilidade' },
  { nome: 'Furtividade', atributo: 'agilidade' },
  { nome: 'Conduzir', atributo: 'agilidade' },
  { nome: 'Percepção', atributo: 'mente' },
  { nome: 'Saber', atributo: 'mente' },
  { nome: 'Tecnologia', atributo: 'mente' },
  { nome: 'Medicina', atributo: 'mente' },
  { nome: 'Sobrevivência', atributo: 'mente' },
  { nome: 'Persuasão', atributo: 'presenca' },
  { nome: 'Enganação', atributo: 'presenca' },
  { nome: 'Intimidação', atributo: 'presenca' },
  { nome: 'Empatia', atributo: 'presenca' },
];

export default function CharacterSheet() {
  const [character, setCharacter] = useState<Character>({
    nome: '',
    conceito: '',
    jogador: '',
    cenario: '',
    riqueza: 2,
    atributos: { corpo: 2, agilidade: 2, mente: 2, presenca: 2 },
    pericias: {},
    vantagens: [],
    desvantagens: [],
    especializacoes: [],
    vitalidadeAtual: 0,
    fadiga: 0,
    estresse: 0,
    equipamentos: []
  });

  const vitalidadeMax = 5 + (character.atributos.corpo * 2);
  if (character.vitalidadeAtual === 0 && vitalidadeMax > 0 && character.nome) {
    setCharacter(prev => ({ ...prev, vitalidadeAtual: vitalidadeMax }));
  }

  const iniciativa = character.atributos.agilidade + character.atributos.mente;
  const defesa = character.atributos.agilidade;
  const vontade = character.atributos.presenca + character.atributos.mente;
  const espacos = character.atributos.corpo + 3;

  const getEstado = () => {
    const vit = character.vitalidadeAtual;
    const max = vitalidadeMax;
    if (vit <= 0) return 'Caído/Morrendo';
    if (vit <= 2) return 'Grave';
    if (vit <= max / 2) return 'Ferido';
    return 'Ileso';
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '800px', margin: '0 auto', paddingBottom: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Ficha de Personagem</h2>
      
      <section style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f9f9f9', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Identidade</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <input placeholder="Nome" value={character.nome} onChange={(e) => setCharacter({...character, nome: e.target.value})} style={{ padding: '0.5rem' }} />
          <input placeholder="Conceito" value={character.conceito} onChange={(e) => setCharacter({...character, conceito: e.target.value})} style={{ padding: '0.5rem' }} />
          <input placeholder="Jogador" value={character.jogador} onChange={(e) => setCharacter({...character, jogador: e.target.value})} style={{ padding: '0.5rem' }} />
          <input placeholder="Cenário/Pacote" value={character.cenario} onChange={(e) => setCharacter({...character, cenario: e.target.value})} style={{ padding: '0.5rem' }} />
        </div>
        <div style={{ marginTop: '0.75rem' }}>
          <label>Riqueza: </label>
          <select value={character.riqueza} onChange={(e) => setCharacter({...character, riqueza: parseInt(e.target.value)})}>
            {[0,1,2,3,4].map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </section>

      <section style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f9f9f9', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Atributos (8 pontos)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
          {(['corpo', 'agilidade', 'mente', 'presenca'] as const).map(attr => (
            <div key={attr} style={{ textAlign: 'center' }}>
              <label style={{ display: 'block', textTransform: 'capitalize', marginBottom: '0.25rem' }}>{attr}</label>
              <input
                type="number"
                min="1"
                max="5"
                value={character.atributos[attr]}
                onChange={(e) => setCharacter({
                  ...character,
                  atributos: {...character.atributos, [attr]: parseInt(e.target.value) || 1}
                })}
                style={{ width: '60px', padding: '0.5rem', textAlign: 'center' }}
              />
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f9f9f9', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Valores Derivados</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem', fontSize: '0.9rem' }}>
          <div style={{ textAlign: 'center' }}><strong>Vitalidade</strong><br/>{character.vitalidadeAtual}/{vitalidadeMax}</div>
          <div style={{ textAlign: 'center' }}><strong>Iniciativa</strong><br/>{iniciativa}</div>
          <div style={{ textAlign: 'center' }}><strong>Defesa</strong><br/>{defesa}</div>
          <div style={{ textAlign: 'center' }}><strong>Vontade</strong><br/>{vontade}</div>
          <div style={{ textAlign: 'center' }}><strong>Espaços</strong><br/>{espacos}</div>
        </div>
        <div style={{ marginTop: '0.75rem', textAlign: 'center' }}>
          <strong>Estado:</strong> {getEstado()}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.75rem' }}>
          <div>
            <label>Vitalidade Atual: </label>
            <input type="number" min="0" max={vitalidadeMax} value={character.vitalidadeAtual} onChange={(e) => setCharacter({...character, vitalidadeAtual: parseInt(e.target.value) || 0})} style={{ width: '60px', padding: '0.3rem' }} />
          </div>
          <div>
            <label>Fadiga: </label>
            <input type="number" min="0" max="3" value={character.fadiga} onChange={(e) => setCharacter({...character, fadiga: parseInt(e.target.value) || 0})} style={{ width: '60px', padding: '0.3rem' }} />
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f9f9f9', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Perícias (10 pontos)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          {periciasList.map(pericia => (
            <div key={pericia.nome} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.9rem' }}>{pericia.nome} ({pericia.atributo.substring(0,3).toUpperCase()})</span>
              <input
                type="number"
                min="0"
                max="5"
                value={character.pericias[pericia.nome] || 0}
                onChange={(e) => setCharacter({
                  ...character,
                  pericias: {...character.pericias, [pericia.nome]: parseInt(e.target.value) || 0}
                })}
                style={{ width: '50px', padding: '0.3rem', textAlign: 'center' }}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
