import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assest/css/App.css";
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { SnackbarProvider } from 'notistack';

const cacheRtl = createCache({
  key: "muirtl" ,
  stylisPlugins: [prefixer, rtlPlugin],
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CacheProvider value={cacheRtl}>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SnackbarProvider anchorOrigin={{vertical: 'bottom',horizontal: 'left',}}>
            <App />
          </SnackbarProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </CacheProvider>
);
