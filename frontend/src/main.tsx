
import App from './App.tsx';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root');

  if (rootElement) {
    const reactRoot = createRoot(rootElement);
    reactRoot.render(<App />);
  } else {
    console.error("Element with id 'root' not found in the DOM.");
  }
});
