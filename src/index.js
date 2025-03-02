import React from "react";
import AppAuth from "./AppAuth";
import AuthProvider from "./auth/AuthProvider";
import { CssBaseline } from "@mui/material";

import { createRoot } from 'react-dom/client';

import './index.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <AuthProvider>
    <CssBaseline />
    <AppAuth />
  </AuthProvider>,
);
