interface SystemPracticeBase {
  id: string;
  title: string;
  page: number;
  summary: string;
  gate: string;
  conceptGroupIds: string[];
}

export interface SystemPracticeModule extends SystemPracticeBase {
  kind: 'module';
  number: number;
  track: string;
  focus: string[];
  practice: string[];
}

export interface SystemPracticeCase extends SystemPracticeBase {
  kind: 'case';
  letter: string;
  flow: string[];
  scope: string[];
  deepDive: string[];
}

export type SystemPracticeUnit = SystemPracticeModule | SystemPracticeCase;
