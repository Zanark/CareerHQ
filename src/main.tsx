import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import './themes.css';
import './theme-toggle.css';
import './overview.css';
import './tutorial/tutorial.css';
import './roadmaps/roadmaps.css';
import './source-panels.css';
import './palette-transition.css';
import './typography.css';
import './accents.css';

createRoot(document.getElementById('root')!).render(<App />);
