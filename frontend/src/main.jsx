import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
/* 削除したので何もない */
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)