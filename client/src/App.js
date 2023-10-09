import { Route, Routes, Navigate } from 'react-router-dom';

import Landing from './pages/landing';
import Signup from './components/signup';
import Login from './components/login';
import Cart from './pages/cart';
import Allproducts from './pages/allProducts';
import Admin from './pages/admin';

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const user = localStorage.getItem("token")
  return (
    <div className="App">
      <Routes>
        {user && <Route path='/' exact element={<Landing />} />}
        <Route path='/landing' element={<Landing />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' exact element={<Navigate replace to="/login" />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/parts' element={<Allproducts />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;