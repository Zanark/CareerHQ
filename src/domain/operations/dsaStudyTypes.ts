export type DsaDifficulty = 'Easy' | 'Medium' | 'Hard';
export type DsaProblemSet = 'foundation' | 'core-a' | 'core-b' | 'stress';

export interface DsaProblem {
  id: number;
  title: string;
  difficulty: DsaDifficulty;
  set: DsaProblemSet;
  url: string;
  page: number;
}

export interface DsaSectionNote {
  number: number;
  title: string;
  summary: string;
  goal: string;
  topics: string[];
  guidance: string;
}

export interface DsaStudySection extends DsaSectionNote {
  page: number;
  problems: readonly DsaProblem[];
}
