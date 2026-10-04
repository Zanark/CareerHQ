import type { AppState } from '../domain/types';
import type { Theme } from '../useTheme';

export type TutorialCommand = 'open-evidence' | 'open-opportunity' | 'open-roadmap' | 'close-dialogs';

export interface TutorialSignals {
  evidenceOpen: boolean;
  opportunityOpen: boolean;
  fullRoadmapOpen: boolean;
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
  onCommand: (command: TutorialCommand) => void;
  onExit: () => void;
  onRestart: () => void;
}
