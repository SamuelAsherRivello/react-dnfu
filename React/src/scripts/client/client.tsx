import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
import './../../styles/App.css'
import { GlobalProvider } from './data/GlobalContext.tsx'


const websiteName = 'DigitalNomadsForUkraine.com';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalProvider websiteName={websiteName}>
     <App />
    </GlobalProvider>,

  </React.StrictMode>,
)
