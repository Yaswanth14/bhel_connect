import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Contact from './pages/Contact';
import PageNotFound from './pages/PageNotFound';
import Signup from './pages/auth/Signup';
import Signin from './pages/auth/Signin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Products from './user/Products';
import MyProducts from './user/MyProducts'
import PrivateRoute from './components/Routes/Private';

function App() {

  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/products' element={<PrivateRoute />}>
        <Route path='' element={<Products />} />
        <Route path='myOrders' element={<MyProducts />} />
      </Route>
      <Route path='/signup' element={<Signup />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
    </>
  )
}

export default App
