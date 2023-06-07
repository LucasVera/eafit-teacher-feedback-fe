import {
  Routes,
  Route,
} from 'react-router-dom'
import Layout from './containers/Layout'
import ActiveClass from './pages/ActiveClass'
import NotFound from './pages/errors/NotFound'
import Login from './pages/Login'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/active-class' element={<Layout><ActiveClass /></Layout>} />

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
