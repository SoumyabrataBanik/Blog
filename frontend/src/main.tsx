import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store, persistor } from "./redux-store/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <PersistGate persistor={persistor}>
            <Provider store={store}>
                <App />
                <Toaster />
            </Provider>
        </PersistGate>
    </React.StrictMode>
);
