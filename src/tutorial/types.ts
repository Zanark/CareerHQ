import type { AppState } from '../domain/types';
import type { Theme } from '../useTheme';

export interface TutorialSignals {
  evidenceOpen: boolean;
  opportunityOpen: boolean;
  focusRunning: boolean;
  exportCount: number;
  importCount: number;
  searchQuery: string;
  theme: Theme;
}

export interface TutorialProps {
  state: AppState;
  route: string;
  signals: TutorialSignals;
  onNavigate: (route: string) => void;
  onCommand: (command: 'open-evidence' | 'open-opportunity' | 'close-dialogs') => void;
  onExit: () => void;
  onRestart: () => void;
}
