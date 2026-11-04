export interface DiceRollResult {
  dice: number[];
  successes: number;
  rawSuccesses: number;
  criticals: number;
  ones: number;
  totalDice: number;
  formula: string;
}

export function rollDice(count: number, criticalsEnabled = true): DiceRollResult {
  // Minimum 1 die
  const totalDice = Math.max(1, count);
  const dice: number[] = [];
  
  for (let i = 0; i < totalDice; i++) {
    dice.push(Math.floor(Math.random() * 6) + 1);
  }
  
  let successes = 0;
  let criticals = 0;
  let ones = 0;
  
  for (const d of dice) {
    if (d === 1) ones++;
    if (d >= 4) {
      if (d === 6 && criticalsEnabled) {
        successes += 2;
        criticals++;
      } else {
        successes += 1;
      }
    }
  }
  
  return {
    dice,
    successes,
    rawSuccesses: successes,
    criticals,
    ones,
    totalDice,
    formula: `${totalDice}d6`
  };
}

export function calculatePool(attribute: number, skill: number, modifiers = 0): number {
  const pool = attribute + skill + modifiers;
  return pool; // minimum 1 enforced in rollDice
}

export function isCriticalFailure(roll: DiceRollResult): boolean {
  return roll.ones >= 2 && roll.successes === 0;
}

export const difficultyTable = {
  routine: 1,
  media: 2,
  dificil: 3,
  muitoDificil: 4,
  heroico: 5,
  sobreHumano: 6
};

export function getDifficultyLabel(diff: number): string {
  if (diff <= 1) return 'Rotina';
  if (diff === 2) return 'Média';
  if (diff === 3) return 'Difícil';
  if (diff === 4) return 'Muito Difícil';
  if (diff === 5) return 'Heroico';
  return 'Sobre-humano';
}
