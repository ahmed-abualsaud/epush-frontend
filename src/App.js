import 'bootstrap/dist/css/bootstrap.min.css'
import "@fontsource/lexend"

import Home from './page/Home'
import Signin from './page/Signin'
import Signup from './page/Signup'
import Modal from './layout/Shared/Modal'
import { Provider } from 'react-redux'
import store from './container/redux/store'
import ProtectedRoute from './layout/Shared/ProtectedRoute'
import SuperAdminDashboard from './page/SuperAdminDashboard'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminDashboard from './page/AdminDashboard'
import HomeContent from './component/Shared/HomeContent'
import ErrorBoundary from './setup/ErrorBoundary'

function App() {
  return (
    <>
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <Provider store={store}>
          <BrowserRouter>
          <Modal/>
          <HomeContent />

          <Routes>

              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />


              {/* Protected Routes */}
              <Route path="/" element={<ProtectedRoute />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/super-admin" element={<SuperAdminDashboard />} />
              </Route>

            </Routes>
          </BrowserRouter>
        </Provider> 
      </ErrorBoundary>
    </>   
  )
}

export default App