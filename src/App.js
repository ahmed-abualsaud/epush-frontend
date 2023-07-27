import 'bootstrap/dist/css/bootstrap.min.css'
import "@fontsource/lexend"

import Home from './page/Home'
import Signin from './page/Signin'
import Signup from './page/Signup'
import Modal from './layout/Modal'
import { Provider } from 'react-redux'
import store from './container/redux/store'
import ProtectedRoute from './layout/ProtectedRoute'
import SuperAdminDashboard from './page/SuperAdminDashboard'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminDashboard from './page/AdminDashboard'

function App() {
  return (
    <>
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
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/super-admin" element={<SuperAdminDashboard />} />
            </Route>

          </Routes>
        </BrowserRouter>
      </Provider> 
    </>   
  )
}

export default App