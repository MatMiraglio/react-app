 import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router";
import Users from './components/Users.tsx';
import CreateUser from './components/CreateUser.tsx';


const router = createBrowserRouter([
  {
    path: '/users-table',
    element: <Users />
  },
  {
    path: '/create-user',
    element: <CreateUser />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
