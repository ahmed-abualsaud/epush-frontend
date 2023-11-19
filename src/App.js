import 'bootstrap/dist/css/bootstrap.min.css'
import "@fontsource/lexend"
import "@fortawesome/fontawesome-free/css/all.min.css"
import './assets/style/component/default-styles.css'

import Home from './page/Home'
import Signin from './page/Signin'
import Signup from './page/Signup'
import Modal from './layout/Shared/Modal'
import { Provider } from 'react-redux'
import store from './container/redux/store'
import ProtectedRoute from './layout/Shared/ProtectedRoute'
import SuperAdminDashboard from './page/dashboard/SuperAdminDashboard'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminDashboard from './page/dashboard/AdminDashboard'
import ErrorBoundary from './setup/ErrorBoundary'
import ClientDashboard from './page/dashboard/ClientDashboard'

function App() {
  return (
    <>
      {/* <ErrorBoundary fallback={<p>Something went wrong</p>}> */}
        <Provider store={store}>
          <BrowserRouter>
          <Modal/>

          <Routes>

              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />


              {/* Protected Routes */}
              <Route path="/" element={<ProtectedRoute />}>
                <Route path="/client" element={<ClientDashboard/>} />
                <Route path="/admin" element={<AdminDashboard/>} />
                <Route path="/super-admin" element={<SuperAdminDashboard/>} />
              </Route>

            </Routes>
          </BrowserRouter>
        </Provider> 
      {/* </ErrorBoundary> */}
    </>   
  )
}

export default App