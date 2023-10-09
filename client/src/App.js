import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Landing from './pages/landing';
import Cart from './pages/cart';
import Admin from './pages/admin';
import Navbar from './components/navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/landing' element={<Landing />} />
          <Route path='/checkout' element={<Cart />} />
          <Route path='/admininventory' element={<Admininventory />} />
        </Routes>
        {/* <Routes>
        {user && <Route path='/' exact element={<Landing />} />}
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' exact element={<Navigate replace to="/login" />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/question' element={<Questions/>}/>
      </Routes> */}
    </div>
  );
}

export default App;