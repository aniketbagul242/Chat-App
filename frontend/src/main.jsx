import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import StoreContextProvider from './context/StoreContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import SocketContextProvider from './context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
   <BrowserRouter>

      <StoreContextProvider>
         <SocketContextProvider>
            <App/>
         </SocketContextProvider>
      </StoreContextProvider>
   </BrowserRouter>
)