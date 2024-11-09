import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Header from './components/ui/custom/Header'
import CreateTrip from './create-trip'
import { Toaster } from './components/ui/sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ViewTrip from './view-trip/[tripId]/index.jsx'
const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/create-trip',
    element:<CreateTrip></CreateTrip>
  },
  {
    path:'/view-trip/:tripId',
    element:<ViewTrip></ViewTrip>
  }

])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Header></Header>
    <Toaster></Toaster>
    <RouterProvider  router={router}></RouterProvider>
      </GoogleOAuthProvider>;
  </StrictMode>,
)
