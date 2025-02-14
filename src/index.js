import React from "react";
import AppAuth from "./AppAuth";
import AuthProvider from "./auth/AuthProvider";

import { createRoot } from 'react-dom/client';

import './index.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <AuthProvider>
    <AppAuth />
  </AuthProvider>,
);
