import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import './themes.css';
import './theme-toggle.css';
import './overview.css';
import './tutorial/tutorial.css';

createRoot(document.getElementById('root')!).render(<App />);
