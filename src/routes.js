import { createBrowserRouter } from 'react-router-dom'
import App from './Pages/HomePage/App'
import ErrorPage from './Pages/ErrorPage/ErrorPage'
import ResetMessage from './Pages/ResetPasswordPage/ResetMessage'
import ResetPassword from './Pages/ResetPasswordPage/ResetPassword'

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
