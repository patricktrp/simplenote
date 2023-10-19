import { Auth0Provider } from '@auth0/auth0-react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import './index.css'
import Callback from './routes/callback'
import Note from './routes/note'
import Root from './routes/root'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { SettingProvider } from './context/SettingContext'
import ErrorPage from './error-page'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "notes/:noteId",
        element: <Note />,
        errorElement: <ErrorPage />
      }
    ]
  },
  {
    path: "/callback",
    element: <Callback />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/callback`,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE
      }}
    >
      <SettingProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </SettingProvider>
    </Auth0Provider>
  </React.StrictMode>,
)
