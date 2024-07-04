import React from 'react';
import ReactDOM from 'react-dom/client';
import Signin from './pages/Signin.jsx';
import Layout from './pages/Layout.jsx';
import NotFound from './pages/NotFound.jsx';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyA-k8SsY_sc_lYTw038llpiBq4_fXZFsLM",
  authDomain: "glassy-strata-428411-d1.firebaseapp.com",
  projectId: "glassy-strata-428411-d1",
  storageBucket: "glassy-strata-428411-d1.appspot.com",
  messagingSenderId: "714537506906",
  appId: "1:714537506906:web:c88e5b8067f89e60bba063",
  measurementId: "G-5CK06MZP2N"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="signin" element={<Signin />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
