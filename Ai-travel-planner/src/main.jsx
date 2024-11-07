import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Header from './components/ui/custom/Header'
import CreateTrip from './create-trip'
const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/create-trip',
    element:<CreateTrip></CreateTrip>
  }

])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header></Header>
    <RouterProvider  router={router}></RouterProvider>
  </StrictMode>,
)
