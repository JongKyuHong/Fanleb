import 'simplebar/src/simplebar.css';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from "react-redux";
import store from "./redux/store";
import App from './App';
import './index.css';

ReactDOM.render(  
  <Provider store={store}>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </Provider>, 
  document.getElementById('root')
);