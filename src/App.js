import 'bootstrap/dist/css/bootstrap.min.css'
import "@fontsource/lexend"

import Home from './page/Home'
import Signin from './page/Signin'
import Signup from './page/Signup'
import Toast from './component/Toast'
import { Provider } from 'react-redux'
import store from './container/redux/store'
import SuperAdminDashboard from './page/SuperAdminDashboard'
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <Provider store={store}>
      <Toast/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard/super-admin" element={<SuperAdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </Provider>    
  )
}

export default App