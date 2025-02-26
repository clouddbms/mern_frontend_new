import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/style.css';
import { Provider } from 'react-redux';
import { Toaster, toast } from 'sonner'
import store from './store/index.js';
import { AuthProvider } from './providers/authProvider.js';
import UserProvider from './providers/UserProvider.js';
import {GoogleOAuthProvider} from '@react-oauth/google'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <GoogleOAuthProvider clientId='1063743694247-t00n5c4akg71fj4h2qpp3mdsgum0eem6.apps.googleusercontent.com'>
  <Toaster  position="bottom-center" expand={true} richColors/>
    <Provider store={store}>
    <AuthProvider>
    <UserProvider>
    <App />
    </UserProvider> 
    </AuthProvider>
    </Provider>
  </GoogleOAuthProvider>
);


