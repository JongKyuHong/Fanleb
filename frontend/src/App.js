import Router from './routes';
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
import './App.css';

export default function App() {
  return (
    <ThemeConfig>
      <Router />
      <GlobalStyles />
    </ThemeConfig>
  );
}
