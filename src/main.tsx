import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";

import { App } from './App.tsx'
import "./index.css"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App app="landing" />} />
        <Route path="/barcode" element={<App app="barcode" />} />
        <Route path="/sku" element={<App app="sku" />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
