import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from 'react-redux';
import store, { persistor } from './store/store'; // Import your configured Redux store and persistor
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="801036309498-jes80mlbpd5pf55a5higu6ffo6cb7mnj.apps.googleusercontent.com">
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}> 
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
