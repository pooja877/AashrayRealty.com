import { createRoot } from 'react-dom/client'
import {persistor, store} from './redux/store.js';
import {Provider} from 'react-redux';
import App from './App.jsx'
import "./index.css"
import { PersistGate } from 'redux-persist/integration/react';
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
  </Provider>
);
