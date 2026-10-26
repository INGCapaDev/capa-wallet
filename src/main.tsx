import {createRoot} from 'react-dom/client';
import App from '@/App';
import { MissingApplicationRootError } from '@/errors';
import './index.css';

const root = document.getElementById('root');
if (!root) throw new MissingApplicationRootError();

createRoot(root).render(<App />);
