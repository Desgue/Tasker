import "./index.css"
import App from './App.jsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { Authenticator, View, useAuthenticator } from '@aws-amplify/ui-react';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Authenticator.Provider>
      <View>
          <App />
      </View>
    </Authenticator.Provider>
  </React.StrictMode>,
)
