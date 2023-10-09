import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/esm/Button';

function Navbarz() {
    
    const username = localStorage.getItem("username")

    const handleLogout = () =>{
      localStorage.removeItem("token")
      localStorage.removeItem('username')
      window.location = "/";
    }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/landing">GlenSpares</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <a className="nav-link" href="/landing">Home <span className="sr-only"></span></a>
            </li>
            <li className="nav-item active">
                <a className="nav-link" href="/parts">parts <span className="sr-only"></span></a>
            </li>
            <li className="nav-item active">
                <a className="nav-link" href="/Admin">Admin <span className="sr-only"></span></a>
            </li>
            <li className="nav-item active">
                <a className="nav-link" href="/cart">Cart <span className="sr-only"></span></a>
            </li>
            </ul>
        </div>
        <Button variant='light' onClick={handleLogout}>Logout</Button>
    </nav>
  );
}

export default Navbarz;