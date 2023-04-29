import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './pages/App'
import ErrorPage from './pages/ErrorPage'
import ResetMessage from './pages/ResetMessage'
import ResetPassword from './pages/ResetPassword'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/home',
    element: <App />,
  },
  {
    path: '/reset-password/:token',
    element: <ResetPassword />,
  },
  {
    path: '/reset-message',
    element: <ResetMessage/>
  }
])

export default router
