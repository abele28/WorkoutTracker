// ============================================================
// MAIN.JSX — Entry Point
//
// This is the very first file React runs. Its only job is to
// find the <div id="root"> in index.html and mount the App
// component inside it. You will almost never edit this file.
// ============================================================

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
